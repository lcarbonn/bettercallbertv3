import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { type FirebaseStorage } from "firebase/storage"

/**
 * Retrieve the download url form src
 * @param src - the file src
 * @returns `Promise` - that resolves with the download URL for this object
 */
export const getStorageDownloadUrlSvc = (src:string) :Promise<string> => {
    return new Promise((resolve, reject) => {
        // console.log("set card image :", card)
        const { $storage } = useNuxtApp()
        const storageRef = ref($storage as FirebaseStorage, src)
        getDownloadURL(storageRef)
        .then((url) => {
            resolve(url)
        }).catch((error) => {
            reject(error)
        })
    })
}

/**
 * Upload the given image file into firebase storage
 * @param file - the image file
 * @returns Promise - with paths (url and path) to the image
 */
export const uploadStorageImageFileSvc = (file:File) :Promise<IPaths> => {
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

/**
 * Delete the src file
 * @param src - the file
 * @returns A `Promise` that resolves if the deletion succeeds.
 */
export const deleteStorageImageSvc = (src:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("set card image :", card)
        const { $storage } = useNuxtApp()
        const storageRef = ref($storage as FirebaseStorage, src)
        deleteObject(storageRef)
        .then(() => {
            resolve()
        }).catch((error) => {
            reject(error)
        })
    })
}
