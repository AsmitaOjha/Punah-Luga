import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // For Authentication
import { ref, get } from 'firebase/database'; // For Realtime Database
import { auth, database } from '../firebase/firebaseConfig'; // Import auth and database from firebaseConfig
import '../Styles/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with email and password using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch userType from Firebase Realtime Database using the user's UID
      const userRef = ref(database, `users/${user.uid}`); // Reference to the user in Realtime Database
      const snapshot = await get(userRef); // Get data from the database

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userType = userData.userType; // Retrieve the userType

        // Navigate based on userType
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
      setError(error.message); // Handle errors from Firebase Authentication
    } finally {
      setLoading(false); // Hide loading spinner after completion
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
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignIn;
