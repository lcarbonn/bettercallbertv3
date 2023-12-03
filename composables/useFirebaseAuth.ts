import {
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
    type Auth,
    getAuth,
  } from "firebase/auth";

  export const signInUser = async (email:string, password:string) => {
    //check 
    const auth = getAuth()
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
    //refacto with then
    if(credentials) snackBarMessage.value = "Hello " + credentials.user.email
    return credentials;
  };

  export const signInAnonymous = async () => {
    const auth = getAuth()
    const snackBarMessage = useSnackBarMessage()
    const credentials = await signInAnonymously(
      auth
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
    const auth = getAuth()
    const snackBarMessage = useSnackBarMessage()
    const result = await (auth as Auth).signOut();
    snackBarMessage.value = "SignOut"
    return result;
  };

  export const initUser = async () => {
    const auth = getAuth()
    const firebaseUser = useFirebaseUser();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        firebaseUser.value = user;
        const currentRoute = useRouter().currentRoute
        if(user.isAnonymous && currentRoute?.value?.fullPath.indexOf('/admin') != -1) {
          await navigateTo('/')
        }
    } else {
        //if signed out sing in anonymous
        const credentials = await signInAnonymous()
        if(credentials) firebaseUser.value = credentials.user
      }
    });
  };
  