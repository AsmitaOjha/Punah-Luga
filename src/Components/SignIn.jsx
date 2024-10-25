// SignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, getUserData } from '../firebase/auth.js'; // Import the signIn and getUserData functions
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
      const user = await signIn(email, password); // Call the signIn function

      // Get user data from the database
      const userData = await getUserData(user.uid);
      
      // Navigate based on user type
      if (userData.userType === 'donor') {
        navigate('/donor');
      } else if (userData.userType === 'collector') {
        navigate('/collector');
      } else if (userData.userType === 'admin') {
        navigate('/admin');
      } else {
        setError("Unknown user type");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="signin-password"
          type="password" 
          placeholder="Password" 
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
