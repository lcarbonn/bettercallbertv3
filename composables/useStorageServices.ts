import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { type FirebaseStorage } from "firebase/storage"

export const setCardsImageSrc = (cards:CardType[]) :Promise<void> => {
    return new Promise((resolve) => {
        // console.log("set cards image :", cards)
        if(!cards) resolve()
        cards.forEach(card => {
            if (card.src?.indexOf("http") == -1) {
                setCardImageSrc(card)
            }
        })
        resolve()
    })
}

export const setCardImageSrc = (card:CardType) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("set card image :", card)
        const { $storage } = useNuxtApp()
        const storageRef = ref($storage as FirebaseStorage, card.src)
        if(!card.src || card.src == "") resolve()
        getDownloadURL(storageRef).then((url) => {
            card.img = url
            resolve()
        }).catch((error) => {
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error set cardsImageSrc", errorCode, errorMessage)
            snackBarMessage.value = "Error setting image src on cards : " + errorMessage
            reject()
        })
    })
}

export const uploadImageFile = (file:File) :Promise<any|void> => {
    return new Promise((resolve, reject) => {
        const { $storage } = useNuxtApp()
        const storageRef = ref($storage as FirebaseStorage, "cards/" + file.name)
        const metadata = {
            contentType: file.type
        }
        uploadBytes(storageRef, file, metadata)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const paths = {
                    imagePath: storageRef.fullPath,
                    imageUrl: url
                }
                console.debug("storage path=" + paths.imagePath + ', url=' + paths.imageUrl)
                resolve(paths)
            })
        }).catch((error) => {
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error upload image file", errorCode, errorMessage)
            snackBarMessage.value = "error upload image file : " + errorMessage
            reject()
        })
    })
}