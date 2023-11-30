import type { Card } from "#imports";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { type FirebaseStorage } from "firebase/storage"

// set the url for download image on card
export const setCardsImageSrc = (card:Card) => {
    const { $storage } = useNuxtApp()

    const storageRef = ref($storage as FirebaseStorage, card.src)
    getDownloadURL(storageRef).then((url) => {
        // console.debug("url:" + url);
        const cards = useCards()
        const i = cards.value.indexOf(card)
        cards.value[i].img = url
        // card.img = url
    }).catch((error) => {
        const snackBarMessage = useSnackBarMessage()
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error set cardsImageSrc", errorCode, errorMessage)
        snackBarMessage.value = "Error setting image src"+errorMessage
        });
};

// set the url for download image on card
export const setCardImageSrc = (card:Card) => {
    const { $storage } = useNuxtApp()

    const storageRef = ref($storage as FirebaseStorage, card.src)
    getDownloadURL(storageRef).then((url) => {
        // console.debug("url:" + url);
        const card = useCard()
        card.value.img = url
        // card.img = url
    }).catch((error) => {
        const snackBarMessage = useSnackBarMessage()
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error set cardImageSrc", errorCode, errorMessage)
        snackBarMessage.value = "Error setting image src"+errorMessage
        });
};
