//https://firebase.google.com/docs/auth/web/start

import {
    getAuth,
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
  } from "firebase/auth";
  
  export const signInUser = async (email:string, password:string) => {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    return credentials;
  };

  export const signInAnonymous = async () => {
    const auth = getAuth();
    const credentials = await signInAnonymously(
      auth
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    return credentials;
  };

  export const initUser = async () => {
    const auth = getAuth();
    const firebaseUser = useFirebaseUser();
    // firebaseUser.value = auth.currentUser;
  
    // const userCookie = useCookie("userCookie");
  
    // const router = useRouter();
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        firebaseUser.value = user;
    } else {
        //if signed out
        firebaseUser.value = signInAnonymous().user
        // router.push("/");
      }
    });
    console.log("firebaseUser", firebaseUser)
  };
  
  export const signOutUser = async () => {
    const auth = getAuth();
    const result = await auth.signOut();
    return result;
  };