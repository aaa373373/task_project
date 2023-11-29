import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase.config";

export const createAccount = async (data) => {
  try {
    const registeredAccount = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // add to users document
    await setDoc(doc(db, "users", registeredAccount.user.uid), {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      dateCreated: new Date(),
    });

    return { user: registeredAccount.user };
  } catch (error) {
    console.log("An error occured creating user account ", error);
    return {
      status: "failed",
      message: "An error occured creating user account.",
    };
  }
};

export const signinUser = async ({ email, password }) => {
  try {
    const loggedinUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return loggedinUser.user;
  } catch (error) {
    console.log("An error occured logging in user ", error);
    return {
      status: "failed",
      message: error.message || "An error occured logging in user.",
    };
  }
};

export const signoutUser = async () => {
  try {
    const loggedoutUser = await signOut(auth);
    return loggedoutUser;
  } catch (error) {
    console.log("An error occured logging out user ", error);
    return {
      status: "failed",
      message: "An error occured logging out user.",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // ...
      return {
        status: "success",
        isLoggedOut: false,
        user,
      };
    } else {
      // No user is signed in.
      return {
        status: "success",
        isLoggedOut: true,
        message: "You are not logged in.",
      };
    }
  } catch (error) {
    console.log("An error occured getting current user ", error);
    return {
      status: "failed",
      message: "An error occured getting current user.",
    };
  }
};

// Create a task reference
// export const taskRef = (user_id) => {
//   const taskRef = doc(db, "tasks", user_id);
//   return taskRef;
// };

// Add task to db
export const writeTaskToDb = async (user_id, data) => {
  // const taskRef = doc(db, "tasks", user_id);
  // await setDoc(taskRef, data);

  const docRef = await addDoc(collection(db, "tasks"), data);
};

// Update task in db
export const updateTaskInDb = async (doc_id, data) => {
  const washingtonRef = doc(db, "tasks", doc_id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, data);
};

// Add task to db
export const writeNoteToDb = async (user_id, data) => {
  await addDoc(collection(db, "notes"), data);
};

// Get user events in real time
// export const fetchUserTasksFromDb = async (user_id) => {
//   const q = query(collection(db, "tasks"), where("uid", "==", user_id));
//   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const tasks = [];
//     querySnapshot.forEach((doc) => {
//       tasks.push(doc.data());
//     });
//     console.log("Available tasks by user");
//     console.log(tasks);
//   });
// };

// Get single document
export const getCurrentUserDetails = async (doc_id) => {
  try {
    const docRef = doc(db, "users", doc_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return { ...docSnap.data() };
    } else {
      // docSnap.data() will be undefined in this case
      return { status: "failed", message: "User record does not exist." };
    }
  } catch (error) {
    console.log("An error occured fetching user details ", error);
    return {
      status: "failed",
      message: "An error occured fetching user details.",
    };
  }
};

// Get retrieve single note for user
export const getSingleUserNOte = async (doc_id) => {
  try {
    const docRef = doc(db, "notes", doc_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return { ...docSnap.data() };
    } else {
      // docSnap.data() will be undefined in this case
      return { status: "failed", message: "User record does not exist." };
    }
  } catch (error) {
    console.log("An error occured fetching user details ", error);
    return {
      status: "failed",
      message: "An error occured fetching user details.",
    };
  }
};
