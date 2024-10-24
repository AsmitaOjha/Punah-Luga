import {useState} from "react";
import {useEffect, userEffect, userState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Always present
import Footer from './Components/Footer'; // Always present
import Home from './Components/Home'; // Main home component
import Choose_who_you_are from './Components/Choose_who_you_are';
import Why_Donate_Clothes from './Components/Why_Donate_Clothes';
import How_it_works from './Components/How_it_works';
import About_us from './Components/About_us';
import Contact from './Components/Contact'; 
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Admin from './Components/Admin';
import AdminRoute from './Components/AdminRoute';
import Donor from "./Components/donor";
import Collector from "./Components/collector";

import {getAuth, onAuthStateChanged} from 'firebase/auth';
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
 

      return(
        <>
    
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/choose_who_you_are" element={<Choose_who_you_are />} />
        <Route path="/why_donate_clothes" element={<Why_Donate_Clothes />} />
        <Route path="/how_it_works" element={<How_it_works />} />
        <Route path="/about_us" element={<About_us />} /> {/* About Us page */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/collector" element={<Collector />} />
        
      </Routes>

       {/* Footer always visible */}
    </>
  );
}

export default App;
