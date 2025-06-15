import React, { useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

function Login() {
  const [user, setUser] = useState(auth.currentUser);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        // Password validation
        if (password.length < 6) {
          setError('Password should be at least 6 characters long');
          setLoading(false);
          return;
        }
        
        // Email validation
        if (!email.includes('@') || !email.includes('.')) {
          setError('Please enter a valid email address');
          setLoading(false);
          return;
        }

        console.log('Creating account with:', { email });
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Account created successfully:', userCredential.user);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error('Auth error:', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please sign in instead.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please use a stronger password.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          console.error('Unexpected error:', err);
          setError(`An error occurred: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to logout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      {user ? (
        <div className="login-card">
          <img src="https://www.pakpedia.pk/files/Image/J.-Junaid-Jamshed.png" alt="Junaid Jamshed Logo" className="login-app-logo" />
          <h2>Welcome, {user.displayName || user.email}</h2>
          {user.photoURL && <img src={user.photoURL} alt="User" className="login-user-img" />}
          <div className="login-user-email">{user.email}</div>
          <button 
            className="login-btn logout-btn" 
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      ) : (
        <div className="login-card">
          <img src="https://www.pakpedia.pk/files/Image/J.-Junaid-Jamshed.png" alt="Junaid Jamshed Logo" className="login-app-logo" />
          <h2>{isSignup ? 'Create an account' : 'Sign in to your account'}</h2>
          <form className="login-form" onSubmit={handleEmailAuth}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={isSignup ? 6 : undefined}
            />
            {error && <div className="login-error">{error}</div>}
            <button 
              className="login-btn email-btn" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
            </button>
          </form>
          <div className="login-or">or</div>
          <button 
            className="login-btn google" 
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src="https://brandlogos.net/wp-content/uploads/2025/05/google_icon_2025-logo_brandlogos.net_qm5ka-300x307.png" alt="Google" className="login-icon" />
            {loading ? 'Please wait...' : 'Sign in with Google'}
          </button>
          <div className="login-toggle">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <span className="login-link" onClick={() => setIsSignup(false)}>Sign In</span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <span className="login-link" onClick={() => setIsSignup(true)}>Sign Up</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login; 