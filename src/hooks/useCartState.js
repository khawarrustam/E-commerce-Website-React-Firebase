import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Helper function to get cart from localStorage
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export function useCartState() {
  const [cart, setCart] = useState(getCartFromStorage());
  const [cartHistory, setCartHistory] = useState([]);
  const [user, setUser] = useState(null);

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
            const data = cartSnap.data();
            setCart(data.items || []);
            setCartHistory(data.history || []);
            saveCartToStorage(data.items || []);
          } else {
            setCart([]);
            setCartHistory([]);
            saveCartToStorage([]);
          }
        } catch (error) {
          console.error('Error fetching cart from Firestore:', error);
        }
      };
      fetchCart();
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('Cart updated:', cart);
    saveCartToStorage(cart);
  }, [cart]);

  // Save cart and history to Firestore if logged in
  useEffect(() => {
    if (user) {
      const saveCart = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          await setDoc(cartRef, { items: cart, history: cartHistory });
        } catch (error) {
          console.error('Error saving cart to Firestore:', error);
        }
      };
      saveCart();
    }
  }, [cart, cartHistory, user]);

  const addToCart = (item) => {
    console.log('Adding to cart:', item);
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        const newCart = prev.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        console.log('Updated cart (existing item):', newCart);
        return newCart;
      }
      const newCart = [...prev, { ...item, quantity: 1 }];
      console.log('Updated cart (new item):', newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    console.log('Removing from cart:', id);
    setCart((prev) => {
      const newCart = prev.filter((i) => i.id !== id);
      console.log('Updated cart after removal:', newCart);
      return newCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    console.log('Updating quantity:', id, quantity);
    setCart((prev) => {
      const newCart = prev.map((i) => 
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      );
      console.log('Updated cart after quantity change:', newCart);
      return newCart;
    });
  };

  const saveCartToHistory = () => {
    console.log('Saving cart to history');
    setCartHistory((prev) => [
      { date: new Date().toISOString(), items: cart },
      ...prev,
    ]);
    setCart([]);
    saveCartToStorage([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartHistory,
    saveCartToHistory,
    user
  };
} 