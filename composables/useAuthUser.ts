/**
 * Sign in user in firebase with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the auth user
 */
export const signInUser = (email:string, password:string) :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
        signInUserFirebase(email,password)
        .then((authUser) => {
            if(authUser) messageToSnack("Hello " + authUser.email)
            resolve(authUser)
        })
        .catch((error) => {
            errorToSnack(error, "Error on login")
            reject(error)
        })
    })
  }

/**
 * Sign in anonymously in firebase
 * @returns A Promise that resolve the auth user
 */
export const signInAnonymous = () :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
      signInAnonymousFirebase()
      .then((authUser) => {
        resolve(authUser)        
      })
      .catch((error) => {
        errorToSnack(error, "Error on login")
        reject(error)
      })
    })
  }

/**
 * Sign out the current user
 */
export const signOutUser = () :Promise<void> => {
    return new Promise((resolve, reject) => {

      signOutUserFirebase()
      .then(() => {
        messageToSnack("SignOut")
        resolve()
      })
    })
  }

/**
 * Initialize the authUser listener on auth state change
 */
export const initUser = () => {
    const callback = (auhUser:IAuthUser) => {
        useAuthUser().value = auhUser
    }
    initUserFirebase(callback)
}

/**
 * Send password reset email
 * @param email - the email
 */
export const sendPasswordReset = (email:string) => {
  return new Promise((resolve, reject) => {
    sendPasswordResetFirebase(email)
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
