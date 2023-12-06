/**
 * Send message to snackbar
 * @param message - the message
 */
export const messageToSnack = (message:string) => {
    const snackBarMessage = useSnackBarMessage()
    snackBarMessage.value = message
}

/**
 * Send error to snackbar
 * @param error - the error
 * @param message - the message
 */
export const errorToSnack = (error:any, message:string) => {
    const snackBarMessage = useSnackBarMessage()
    console.log(message, " : ", error?.code, error?.message)
    snackBarMessage.value = message + " : " + error?.message
}