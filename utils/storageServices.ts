import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { type FirebaseStorage } from "firebase/storage"

/**
 * Retrieve and set image of the card from firebase storage 
 * @param card - the card
 * @returns Promise - will resolve the url when done
 */
export const setStorageCardImageSrc = (card:ICard) :Promise<string|void> => {
    return new Promise((resolve, reject) => {
        // console.log("set card image :", card)
        const { $storage } = useNuxtApp()
        const storageRef = ref($storage as FirebaseStorage, card.src)
        if(!card.src || card.src == "") resolve()
        getDownloadURL(storageRef)
        .then((url) => {
            resolve(url)
        }).catch((error) => {
            reject()
        })
    })
}

/**
 * Upload the given image file into firebase storage
 * @param file - the image file
 * @returns Promise - with paths (url and path) to the image
 */
export const uploadStorageImageFile = (file:File) :Promise<IPaths> => {
    return new Promise((resolve, reject) => {
        const { $storage } = useNuxtApp()
        const storageRef = ref($storage as FirebaseStorage, "cards/" + file.name)
        const metadata = {
            contentType: file.type
        }
        uploadBytes(storageRef, file, metadata)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const paths = new Paths(storageRef.fullPath, url)
                resolve(paths)
            })
        }).catch((error) => {
            reject(error)
        })
    })
}