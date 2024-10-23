import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from 'firebase/database';
import '../Styles/SignIn.css'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.userType === 'donor') {
          window.location.href = '/donor';
        } else {
          window.location.href = '/collector';
        }
      } else {
        console.error("No user data found");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="container-signin">
      <h2>Sign In</h2>
      <input 
        className="signin-email"
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
      className="signin-password"
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button  className="signin-complete-button" onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
