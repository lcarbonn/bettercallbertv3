import {
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
    type Auth,
  } from "firebase/auth";

  export const signInUser = async (email:string, password:string) => {
    //check 
    const { $auth } = useNuxtApp()
    const snackBarMessage = useSnackBarMessage()

    const credentials = await signInWithEmailAndPassword(
      $auth as Auth,
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
    const { $auth } = useNuxtApp()
    const snackBarMessage = useSnackBarMessage()
    const credentials = await signInAnonymously(
      $auth as Auth
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("signInAnonymous", errorCode, errorMessage)
      snackBarMessage.value = "Error on login"+errorMessage
    });
    const firebaseUser = useFirebaseUser();
    if(credentials) firebaseUser.value = credentials.user
    return credentials;
  };

  export const signOutUser = async () => {
    const { $auth } = useNuxtApp()
    const snackBarMessage = useSnackBarMessage()
    const result = await ($auth as Auth).signOut();
    snackBarMessage.value = "SignOut"
    return result;
  };

  export const initUser = async () => {
    const { $auth } = useNuxtApp()
    const firebaseUser = useFirebaseUser();

    onAuthStateChanged($auth as Auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("Auth changed", user)
        firebaseUser.value = user;
    } else {
        //if signed out
        console.log("Auth changed", user)
        signInAnonymous()
      }
    });
  };
  