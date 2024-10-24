// Admin.js
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Admin = () => {
  const [userCounts, setUserCounts] = useState({ donors: 0, collectors: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        setIsAdmin(token.claims.userType === 'admin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const countUserTypes = async () => {
    const db = getDatabase();
    const usersRef = ref(db, 'users/');

    try {
      const snapshot = await get(usersRef);
      const usersData = snapshot.val();
      let donorCount = 0;
      let collectorCount = 0;

      if (usersData) {
        const userArray = Object.values(usersData);
        userArray.forEach(user => {
          if (user.userType === 'donor') {
            donorCount++;
          } else if (user.userType === 'collector') {
            collectorCount++;
          }
        });
        setUserCounts({ donors: donorCount, collectors: collectorCount });
        setUsers(userArray);
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

  if (!isAdmin) {
    return <div>You do not have access to this page.</div>;
  }

  return (
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
  );
};

export default Admin;
