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
