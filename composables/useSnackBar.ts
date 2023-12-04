// send message to snackbar
export const messageToSnack = (message:string) => {
    const snackBarMessage = useSnackBarMessage()
    snackBarMessage.value = message
}
// send error to snackbar
export const errorToSnack = (error:any, message:string) => {
    const snackBarMessage = useSnackBarMessage()
    console.log(message, " : ", error?.code, error?.message)
    snackBarMessage.value = message + " : " + error?.message
}