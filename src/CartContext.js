import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartHistory, setCartHistory] = useState([]);
  const [user, setUser] = useState(auth.currentUser);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Load cart and cart history from Firestore if logged in
  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            setCart(cartSnap.data().items || []);
            setCartHistory(cartSnap.data().history || []);
            console.log('Cart loaded from Firestore:', cartSnap.data().items);
          } else {
            setCart([]);
            setCartHistory([]);
            console.log('No cart found in Firestore for user:', user.uid);
          }
        } catch (error) {
          console.error('Failed to fetch cart from Firestore:', error);
          setCart([]);
          setCartHistory([]);
        }
        setHasLoaded(true);
      };
      fetchCart();
    } else {
      setCart([]);
      setCartHistory([]);
      setHasLoaded(false);
    }
  }, [user]);

  // Save cart and history to Firestore if logged in and after initial load
  useEffect(() => {
    if (user && hasLoaded) {
      const saveCart = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          await setDoc(cartRef, { items: cart, history: cartHistory });
          console.log('Cart saved to Firestore:', cart);
        } catch (error) {
          console.error('Failed to save cart to Firestore:', error);
        }
      };
      saveCart();
    }
  }, [cart, cartHistory, user, hasLoaded]);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity } : i));
  };

  // Call this to save current cart to history (e.g., on checkout or manual save)
  const saveCartToHistory = () => {
    setCartHistory((prev) => [
      { date: new Date().toISOString(), items: cart },
      ...prev,
    ]);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartHistory, saveCartToHistory, user }}>
      {children}
    </CartContext.Provider>
  );
} 