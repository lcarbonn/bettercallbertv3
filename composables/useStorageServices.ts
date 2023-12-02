import type { Card } from "#imports";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { type FirebaseStorage } from "firebase/storage"


export const setCardImageSrc = (card:Card) :Promise<string> => {
    const { $storage } = useNuxtApp()
    const storageRef = ref($storage as FirebaseStorage, card.src)
    return new Promise((resolve, reject) => {
        getDownloadURL(storageRef).then((url) => {
            resolve(url)
        }).catch((error) => {
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error set cardsImageSrc", errorCode, errorMessage)
            snackBarMessage.value = "Error setting image src on cards : " + errorMessage
            reject()
            });
        })
};
