//https://firebase.google.com/docs/auth/web/start

import {
    getAuth,
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
  } from "firebase/auth";
  
  export const signInUser = async (email:string, password:string) => {
    const auth = getAuth();
    const snackBarMessage = useSnackBarMessage()

    const credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("signInUser", errorCode, errorMessage)
      snackBarMessage.value = "Error on login"+errorMessage
    });
    if(credentials) snackBarMessage.value = "Hello " + credentials.user.email
    return credentials;
  };

  export const signInAnonymous = async () => {
    const auth = getAuth();
    const snackBarMessage = useSnackBarMessage()
    const credentials = await signInAnonymously(
      auth
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("signInAnonymous", errorCode, errorMessage)
      snackBarMessage.value = "Error on login"+errorMessage
    });
    return credentials;
  };

  export const signOutUser = async () => {
    const auth = getAuth();
    const snackBarMessage = useSnackBarMessage()
    const result = await auth.signOut();
    snackBarMessage.value = "SignOut"
    return result;
  };

  export const initUser = async () => {
    const auth = getAuth();
    const firebaseUser = useFirebaseUser();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("Auth changed", user)
        firebaseUser.value = user;
    } else {
        //if signed out
        console.log("Auth changed", user)
        firebaseUser.value = signInAnonymous().user
      }
    });
    // console.log("firebaseUser", firebaseUser)
  };
  