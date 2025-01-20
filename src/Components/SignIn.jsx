import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Added sendPasswordResetEmail
import { ref, get } from 'firebase/database';
import { auth, database } from '../firebase/firebaseConfig';
import '../Styles/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false); // State for reset email notification
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userType = userData.userType;

        if (userType === 'donor') {
          navigate('/donor');
        } else if (userType === 'collector') {
          navigate('/collector');
        } else if (userType === 'admin') {
          navigate('/admin');
        } else {
          setError('Unknown user type');
        }
      } else {
        setError('User data not found');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Email not found');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format');
      } else {
        setError('Password or email is incorrect');
      }
      
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email to reset the password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true); // Notify user that the email was sent
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-signin">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          className="signin-email"
          type="email"
          placeholder="Email"
          name="your_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="signin-password"
          type="password"
          placeholder="Password"
          name="your_password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="signin-complete-button" type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <button
        className="forgot-password-button"
        onClick={handleForgotPassword}
        disabled={loading}
      >
        Forgot Password?
      </button>
      {resetEmailSent && <p className="success-message">Password reset email sent. Please check your inbox.</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignIn;
