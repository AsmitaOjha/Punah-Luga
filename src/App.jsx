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
function App() {
  return (
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
      </Routes>

       {/* Footer always visible */}
    </>
  );
}

export default App;
