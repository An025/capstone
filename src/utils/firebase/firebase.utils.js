import { initializeApp} from 'firebase/app';
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider} from 'firebase/auth';

    import {
      getFirestore,
      doc,
      getDoc,
      setDoc
    } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDiDKgGamgJmdkytNIpwMulX6p3vaxCK2s",
    authDomain: "crwn-clothing-db-6e221.firebaseapp.com",
    projectId: "crwn-clothing-db-6e221",
    storageBucket: "crwn-clothing-db-6e221.appspot.com",
    messagingSenderId: "744245427498",
    appId: "1:744245427498:web:62525f908cb77b38f57253"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) =>{
      if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
 
    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      }catch (error){
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
      if(!email || !password) return;
      return await createUserWithEmailAndPassword(auth, email, password)
  }