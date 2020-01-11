import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBTHoEQcE0WPbvWj5leoN_qipX5HSlf1BY",
  authDomain: "e-f2007.firebaseapp.com",
  databaseURL: "https://e-f2007.firebaseio.com",
  projectId: "e-f2007",
  storageBucket: "e-f2007.appspot.com",
  messagingSenderId: "370625385452",
  appId: "1:370625385452:web:f157c77e0249715e4be6c9",
  measurementId: "G-4F2B9R42J8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
