import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo-small.jpg';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate here
import Modal from 'react-bootstrap/Modal';
import { getAuth, signOut } from 'firebase/auth';
import { ref, get, child } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import '../Styles/Navbar1.css';

function Navbar1() {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loadingUserType, setLoadingUserType] = useState(true);

  const navigate = useNavigate();  // Initialize navigate

  // Fetch the user type from Firebase database
  useEffect(() => {
    if (currentUser) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${currentUser.uid}/userType`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserType(snapshot.val());
          } else {
            console.error('No user type data found.');
          }
          setLoadingUserType(false);
        })
        .catch((error) => {
          console.error('Error fetching user type:', error);
          setLoadingUserType(false);
        });
    }
  }, [currentUser]);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');  // Redirect to the home page after logging out
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-transparent">
      <div className="container-fluid">
        {/* Left Side: Logo and Home */}
        <div className="d-flex align-items-center" style={{ marginLeft: '15px' }}>
          <Link className="navbar-brand me-3" to="/">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Punah-Luga
          </Link>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </div>

        {/* Right Side: My Profile */}
        <div className="ms-auto" style={{ marginRight: '15px' }}>
          <div
            className="nav-link position-relative"
            style={{ cursor: 'pointer' }}
            onClick={toggleProfileMenu}
          >
            My Profile
            {/* Profile Popup */}
            <Modal
              show={showProfileMenu}
              onHide={toggleProfileMenu}
              className="profile-menu-popup"
            >
              <Modal.Body>
                {loadingUserType ? (
                  <p>Loading...</p>
                ) : (
                  <ul className="list-unstyled">
                    {userType === 'donor' && (
                      <li>
                        <Link className="dropdown-item" to="/donor">
                          Donor Dashboard
                        </Link>
                      </li>
                    )}
                    {userType === 'collector' && (
                      <li>
                        <Link className="dropdown-item" to="/collector">
                          Collector Dashboard
                        </Link>
                      </li>
                    )}
                    {userType === 'admin' && (
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <a className="dropdown-item" href="#" onClick={handleSignOut}>
                        Logout
                      </a>
                    </li>
                  </ul>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar1;
