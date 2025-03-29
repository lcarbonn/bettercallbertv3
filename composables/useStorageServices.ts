import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { type FirebaseStorage } from "firebase/storage"

/**
 * Retrieve and set image of each card in the cards list from firebase storage
 * @param cards - the cards list
 * @returns Promise - when resolved
 */
export const setCardsImageSrc = (cards:ICard[]) :Promise<void> => {
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

/**
 * Retrieve and set image of the card from firebase storage 
 * @param card - the card
 * @returns Promise - when resolved
 */
export const setCardImageSrc = (card:ICard) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("set card image :", card)
        const { $storage } = useNuxtApp()
        const storageRef = ref($storage as FirebaseStorage, card.src)
        if(!card.src || card.src == "") resolve()
        getDownloadURL(storageRef).then((url) => {
            card.img = url
            resolve()
        }).catch((error) => {
            errorToSnack(error, "Error setting image src on cards")
            reject()
        })
    })
}

/**
 * Upload the given image file into firebase storage
 * @param file - the image file
 * @returns Promise - with paths (url and path) to the image
 */
export const uploadStorageImageFile = (file:File) :Promise<any|void> => {
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
                messageToSnack("Image uploaded")
                console.debug("storage path=" + paths.imagePath + ', url=' + paths.imageUrl)
                resolve(paths)
            })
        }).catch((error) => {
            errorToSnack(error, "Error on uploading image file")
            reject(error)
        })
    })
}