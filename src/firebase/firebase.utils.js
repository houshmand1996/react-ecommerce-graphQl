import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB31uz8xE-X3AYJUwaWp7j-uSfBxZPSm0A",
  authDomain: "crwn-db-74713.firebaseapp.com",
  databaseURL: "https://crwn-db-74713.firebaseio.com",
  projectId: "crwn-db-74713",
  storageBucket: "crwn-db-74713.appspot.com",
  messagingSenderId: "570246161053",
  appId: "1:570246161053:web:a898e8228e39d6e886aa74",
  measurementId: "G-0D1LFBB67C"
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
