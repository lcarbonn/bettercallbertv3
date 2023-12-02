import type { Card } from "#imports";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { type FirebaseStorage } from "firebase/storage"


export const setCardImageSrc = (card:Card) :Promise<string|void> => {
    return new Promise((resolve, reject) => {
        const { $storage } = useNuxtApp()
        const storageRef = ref($storage as FirebaseStorage, card.src)
        if(!card.src || card.src == "") resolve()
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
