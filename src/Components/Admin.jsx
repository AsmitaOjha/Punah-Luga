import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database'; // Correct import for ref and get
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar1 from './Navbar1';
import Footer from './Footer';
import '../Styles/Admin.css'; 

const Admin = () => {
  const [userCounts, setUserCounts] = useState({ donors: 0, collectors: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Realtime Database to check userType
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);  // Reference to the current user's data
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log('User Data:', userData);  // Debugging log

            if (userData.userType === 'admin') {
              setIsAdmin(true);  // Set isAdmin to true if userType is admin
            } else {
              setIsAdmin(false);  // Set isAdmin to false otherwise
              setError('You do not have access to this page.');
            }
          } else {
            setError('User data not found.');
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          setError('An error occurred while checking user type.');
        }
      } else {
        setIsAdmin(false);  // If no user is logged in, deny access
        setError('Please log in to access this page.');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const countUserTypes = async () => {
    const db = getDatabase();
    const usersRef = ref(db, 'users/');  // Reference to the users data in the database
    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        let donorCount = 0;
        let collectorCount = 0;

        Object.values(usersData).forEach(user => {
          console.log('User:', user); // Debugging log
          if (user.userType === 'donor') {
            donorCount++;
          } else if (user.userType === 'collector') {
            collectorCount++;
          }
        });

        setUserCounts({ donors: donorCount, collectors: collectorCount });
        setUsers(Object.values(usersData));
      } else {
        console.log('No users found');
      }
    } catch (error) {
      console.error("Error counting user types:", error.message);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      countUserTypes();
    }
  }, [isAdmin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;  // Display error messages
  }

  if (!isAdmin) {
    return <div>You do not have access to this page.</div>;
  }

  return (
    <>
    <Navbar1/>
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <div>
        <h3>User Counts:</h3>
        <p>Active Donors: {userCounts.donors}</p>
        <p>Active Collectors: {userCounts.collectors}</p>
      </div>
      <div>
        <h3>User List:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.email} - {user.userType}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Admin;
