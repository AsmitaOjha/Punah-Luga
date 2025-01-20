import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo-small.jpg';
import '../Styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { ref, get, child } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';  // Adjusted import path for firebaseConfig
import Modal from 'react-bootstrap/Modal';

function Navbar({ scrollToHomePage, scrollToWhyDonateSection, scrollToHowItWorksSection, scrollToAboutus,scrollToWho }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userType, setUserType] = useState(null); // State to store user type (null initially)
  const [loadingUserType, setLoadingUserType] = useState(true); // To track if user type is being fetched

  // Fetch the user type from Firebase database
  useEffect(() => {
    if (currentUser) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${currentUser.uid}/userType`)) // Adjusted path to 'userType'
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserType(snapshot.val()); // Set the user type (either 'donor' or 'collector')
          } else {
            console.error('No user type data found.');
          }
          setLoadingUserType(false); // Stop loading once data is fetched
        })
        .catch((error) => {
          console.error('Error fetching user type:', error);
          setLoadingUserType(false); // Stop loading on error as well
        });
    }
  }, [currentUser]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="/">
          <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
          Punah-Luga
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav justify-content-center w-100">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/" onClick={scrollToHomePage}>Home</Link>
            </li>
            


            <li className="nav-item mx-3">
              <a className="nav-link" href="#" onClick={scrollToWhyDonateSection}>Why Donate Clothes</a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#" onClick={scrollToAboutus}>About us</a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#" onClick={scrollToHowItWorksSection}>How it works</a>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            {/* Sign Up / Profile Redirect based on user type */}
            <li className="nav-item mx-3">
              {!currentUser ? (
                <Link className="nav-link" to="/signup">Sign Up</Link>
              ) : (
                <div className="nav-link position-relative" style={{ cursor: 'pointer' }} onClick={toggleProfileMenu}>
                  My Profile
                  {/* Profile Popup */}
                  <Modal show={showProfileMenu} onHide={toggleProfileMenu} className="profile-menu-popup">
                    <Modal.Body>
                      {loadingUserType ? (
                        <p>Loading...</p> // Display a loading state while fetching user type
                      ) : (
                        <ul className="list-unstyled">
                          {userType === 'donor' && (
                            <li>
                              <Link className="dropdown-item" to="/donor">Donor Dashboard</Link>
                            </li>
                          )}
                          {userType === 'collector' && (
                            <li>
                              <Link className="dropdown-item" to="/collector">Collector Dashboard</Link>
                            </li>
                          )}
                          {userType === 'admin' && (
                            <li>
                              <Link className="dropdown-item" to="/admin">Admin Dashboard</Link>
                            </li>
                          )}
                          <li>
                            <a className="dropdown-item" href="#" onClick={handleSignOut}>Logout</a>
                          </li>
                        </ul>
                      )}
                    </Modal.Body>
                  </Modal>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
