import {
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
    getAuth,
    sendPasswordResetEmail,
    type UserCredential,
    verifyPasswordResetCode,
    confirmPasswordReset,
  } from "firebase/auth";

/**
 * Sign in user in firebase with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the user credentials
 * @throws Throws the firebase error
 */
export const signInUser = (email:string, password:string) :Promise<UserCredential> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
  
      signInWithEmailAndPassword(auth,email,password)
      .then((credentials) => {
        if(credentials) messageToSnack("Hello " + credentials.user.email)
        resolve(credentials)
      })
      .catch((error) => {
        errorToSnack(error, "Error on login")
        reject(error)
      })
    })
  }

/**
 * Sign in anonymously in firebase
 * @returns A Promise that resolve the user credentials
 * @throws Throws the firebase error
 */
export const signInAnonymous = () :Promise<UserCredential> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      signInAnonymously(auth)
      .then((credentials) => {
        resolve(credentials)        
      })
      .catch((error) => {
        errorToSnack(error, "Error on login")
        reject(error)
      })
    })
  }

/**
 * Sign out the current user from firebase
 * @throws Throws the firebase error
 */
export const signOutUser = () :Promise<void> => {
    return new Promise((resolve, reject) => {

      getAuth().signOut()
      .then(() => {
        messageToSnack("SignOut")
        resolve
      })
    })
  }

/**
 * Initialize the firebase listener on auth state change
 */
export const initUser = () => {
  const auth = getAuth()
  const firebaseUser = useFirebaseUser();

  onAuthStateChanged(auth, async (user) => {
    console.log("auth state change")
    if (user) {
      console.log("auth state change, user isAnonymous:"+user.isAnonymous)
      firebaseUser.value = user;
      const currentRoute = useRoute().fullPath
      if(user.isAnonymous && currentRoute?.indexOf('/admin') != -1) {
        console.log("auth state change, navigate")
        await navigateTo('/')
      }
    } else {
      //if signed out sing in anonymous
      console.log("auth state change, no user")
      signInAnonymous().then((credentials)=>{
        if(credentials) firebaseUser.value = credentials.user
      })
    }
  })
}

/**
 * Send password reset email
 * @param email - the email
 */
export const sendPasswordReset = (email:string) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()

    sendPasswordResetEmail(auth,email)
    .then(() => {
      messageToSnack("Reset password email sent to "+ email)
      resolve
    })
    .catch((error) => {
      errorToSnack(error, "Error on sending email to reset password")
      reject
    })
  })
}

/**
 * Confirm password reset
 * @param password - the new password
 */
export const confirmNewPasswordReset = (actionCode:string, newPassword:string) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    verifyPasswordResetCode(auth, actionCode).then((email) => {
      confirmPasswordReset(auth,actionCode, newPassword)
      .then(() => {
        messageToSnack("New password confirmed")
        navigateTo('/login')
        resolve
      })
      .catch((error) => {
        errorToSnack(error, "Error saving new password")
        reject
      })
 
    })
    .catch((error) => {
      errorToSnack(error, "Error verifying action code for reset password")
      reject
    })

  })
}
