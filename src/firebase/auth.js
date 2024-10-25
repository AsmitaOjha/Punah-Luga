// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database"; // Import 'get' for user data retrieval

// Function to sign up a new user
export const signUp = async (email, password, userType) => {
  const auth = getAuth();
  const db = getDatabase();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data in the Realtime Database
    await set(ref(db, 'users/' + user.uid), {
      email: email,
      userType: userType,
      active: true,
    });

    return user; // Return the user object for further use
  } catch (error) {
    throw new Error(error.message); // Rethrow the error with a message
  }
}

// Function to sign in an existing user
export const signIn = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object for further use
  } catch (error) {
    throw new Error(error.message); // Rethrow the error with a message
  }
};

// Function to retrieve user data from the database
export const getUserData = async (userId) => {
  const db = getDatabase();
  const userRef = ref(db, 'users/' + userId);
  const snapshot = await get(userRef);
  
  if (snapshot.exists()) {
    return snapshot.val(); // Return user data
  } else {
    throw new Error("No user data found"); // Rethrow if user data doesn't exist
  }
};
