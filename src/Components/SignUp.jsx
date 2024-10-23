import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';
import { Link } from 'react-router-dom';
import '../Styles/SignUp.css'; 


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('donor');

  const handleSignUp = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getDatabase();
      await set(ref(db, 'users/' + user.uid), {
        email: email,
        userType: userType,
      });

      alert("Sign up successful! You can now sign in.");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="container-signup">
      <h2 >Sign Up</h2>
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
      <select className="signup-select" value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="donor">Donor</option>
        <option value="collector">Collector</option>
      </select>
      <button onClick={handleSignUp} className="signup-complete-button">Sign Up</button>

      <p className="signup-paragraph">Already have an account? <Link to="/signin" className="signin-link">Sign In</Link></p>
    </div>
    </div>
  );
};

export default SignUp;
