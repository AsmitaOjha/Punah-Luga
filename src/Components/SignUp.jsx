// SignUp.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {signUp} from '../firebase/auth.js';
import '../Styles/SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('donor');
  const [error, setError] = useState(''); // To hold any error messages

  const handleSignUp = async () => {
    // Validate email and password
    if (!email || !password) {
      alert("Email and password cannot be empty.");
      return;
    }

    try {
      // Call the signUp function from auth.js
      await signUp(email, password, userType);
      alert("Sign up successful! You can now sign in.");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up: " + error.message);
      setError(error.message); // Update error state
    }
  };

  return (
    <div className="container-signup">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <div className="signup">
        <input 
          className="signup-email"
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          className="signup-password"
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <select 
          className="signup-select"
          value={userType} 
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="donor">Donor</option>
          <option value="collector">Collector</option>
          <option value="admin">Admin (Restricted)</option> 
        </select>
        <button onClick={handleSignUp} className="signup-complete-button">Sign Up</button>
        <p className='signup-paragraph'>Already have an account? <Link to="/signin" className='signin-link'>Sign In</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
