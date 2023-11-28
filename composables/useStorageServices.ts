import type { Card } from "#imports";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { type FirebaseStorage } from "firebase/storage"
// get the url for download image
export const getImageSrc = async (card:Card) => {
    const { $storage } = useNuxtApp()

    const storageRef = ref($storage as FirebaseStorage, card.src)
    await getDownloadURL(storageRef).then((url) => {
        // console.debug("url:" + url);
        const cards = useCards()
        const i = cards.value.indexOf(card)
        cards.value[i].img = url
        // card.img = url
    }).catch((error) => {
        const snackBarMessage = useSnackBarMessage()
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error get ImageSrc", errorCode, errorMessage)
        snackBarMessage.value = "Error getting image src"+errorMessage
        });
    };
