import {
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
    type Auth,
    getAuth,
    type UserCredential,
  } from "firebase/auth";

  export const signInUser = async (email:string, password:string) :Promise<UserCredential> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      const snackBarMessage = useSnackBarMessage()
  
      signInWithEmailAndPassword(auth,email,password)
      .then((credentials) => {
        if(credentials) snackBarMessage.value = "Hello " + credentials.user.email
        resolve(credentials)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signInUser", errorCode, errorMessage)
        snackBarMessage.value = "Error on login"+errorMessage
        reject()
      })
    })
  }

  export const signInAnonymous = () :Promise<UserCredential> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      const snackBarMessage = useSnackBarMessage()
      signInAnonymously(auth)
      .then((credentials) => {
        resolve(credentials)        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signInAnonymous", errorCode, errorMessage)
        snackBarMessage.value = "Error on login"+errorMessage
        reject()
      })
    })
  }

  export const signOutUser = async () :Promise<void> => {
    return new Promise((resolve, reject) => {
      const snackBarMessage = useSnackBarMessage()
      getAuth().signOut()
      .then(() => {
        snackBarMessage.value = "SignOut"
        resolve
      })
    })
  }

  export const initUser = async () => {
    const auth = getAuth()
    const firebaseUser = useFirebaseUser();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        firebaseUser.value = user;
        const currentRoute = useRoute().fullPath
        if(user.isAnonymous && currentRoute?.indexOf('/admin') != -1) {
          await navigateTo('/')
        }
    } else {
        //if signed out sing in anonymous
        signInAnonymous().then((credentials)=>{
          if(credentials) firebaseUser.value = credentials.user
        })
      }
    })
  }
