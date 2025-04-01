import {
    signInWithEmailAndPassword,
    signInAnonymously,
    onAuthStateChanged,
    getAuth,
    sendPasswordResetEmail,
    type UserCredential,
  } from "firebase/auth";

/**
 * Sign in user in firebase with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the user credentials
 * @throws Throws the firebase error
 */
export const signInUserFirebase = (email:string, password:string) :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
  
      signInWithEmailAndPassword(auth,email,password)
      .then((credentials) => {
        const authUser = toAuthUser(credentials)
        resolve(authUser)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

/**
 * Sign in anonymously in firebase
 * @returns A Promise that resolve the user credentials
 * @throws Throws the firebase error
 */
export const signInAnonymousFirebase = () :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      signInAnonymously(auth)
      .then((credentials) => {
        const authUser = toAuthUser(credentials)
        resolve(authUser)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

/**
 * Sign out the current user from firebase
 * @throws Throws the firebase error
 */
export const signOutUserFirebase = () :Promise<void> => {
    return new Promise((resolve, reject) => {
      getAuth().signOut()
      .then(() => {
        resolve()
      })
    })
  }

/**
 * Initialize the firebase listener on auth state change
 */
export const initUserFirebase = (callback:any) => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    console.log("auth state change")
    if (user) {
      // console.log("auth state change, user isAnonymous:"+user.isAnonymous)
      const authUser = new AuthUser(user.uid, user.isAnonymous, user.email)
      callback(authUser)
    } else {
      //if signed out sing in anonymous
      // console.log("auth state change, no user")
      signInAnonymousFirebase().then((authUser)=>{
        if(authUser) {
          callback(authUser)
        }
      })
    }
  })
}

/**
 * Send password reset email
 * @param email - the email
 */
export const sendPasswordResetFirebase = (email:string) :Promise<void> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    sendPasswordResetEmail(auth,email)
    .then(() => {
      resolve()
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export const toAuthUser = (credentials:UserCredential) => {
  return new AuthUser(credentials.user.uid, credentials.user.isAnonymous, credentials.user.email)
}