import { deleteStorageImageSvc, getStorageDownloadUrlSvc, uploadStorageImageFileSvc } from "./storage/storageServices"

/**
 * Retrieve the download url form src
 * @param src - the file src
 * @returns `Promise` - that resolves with the download URL for this object
 */
export const getStorageDownloadUrl = (src:string) :Promise<string> => {
    return new Promise((resolve, reject) => {
        getStorageDownloadUrlSvc(src)
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
export const uploadStorageImageFile = (file:File) :Promise<IPaths> => {
    return new Promise((resolve, reject) => {
        uploadStorageImageFileSvc(file)
        .then((paths) => {
            resolve(paths)
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
export const deleteStorageImage = (src:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        deleteStorageImageSvc(src)
        .then(() => {
            resolve()
        }).catch((error) => {
            reject(error)
        })
    })
}
