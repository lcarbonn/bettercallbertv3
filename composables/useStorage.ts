/**
 * Retrieve the image download url form a src
 * @param src - the source
 * @returns Promise - will resolves the url of the image
 */
export const getImageDownloadUrl = (src:string) :Promise<string|void> => {
    return new Promise((resolve, reject) => {
        // console.log("set card image :", card)
        if(!src) resolve()
        else {
            getStorageDownloadUrl(src)
            .then((url) => {
                resolve(url)
            }).catch((error) => {
                errorToSnack(error, "Error setting image src on cards")
                reject()
            })
        }
    })
}

/**
 * Upload the given image file into firebase storage
 * @param file - the image file
 * @returns Promise - with paths to the image
 */
export const uploadImageFile = (file:File) :Promise<IPaths> => {
    return new Promise((resolve, reject) => {
        uploadStorageImageFile(file)
        .then((paths) => {
            messageToSnack("Image uploaded")
            // console.debug("storage path=" + paths.imagePath + ', url=' + paths.imageUrl)
            resolve(paths)
        }).catch((error) => {
            errorToSnack(error, "Error on uploading image file")
            reject(error)
        })
    })
}

/**
 * Delete the src img
 * @param src - the image file src
 * @returns Promise - resolved when done
 */
export const deleteImage = (src:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        deleteStorageImage(src)
        .then(() => {
            resolve()
        }).catch((error) => {
            reject(error)
        })
    })
}