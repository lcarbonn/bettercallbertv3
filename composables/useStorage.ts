/**
 * Retrieve and set image of each card in the cards list
 * @param cards - the cards list
 */
export const setCardsImageSrc = (cards:ICard[]) => {
    // console.log("set cards image :", cards)
    if(!cards) return
    cards.forEach(card => {
        if (card.src?.indexOf("http") == -1) {
            setCardImageSrc(card)
        }
    })
}

/**
 * Retrieve and set image of the card
 * @param card - the card
 * @returns Promise - when resolved
 */
export const setCardImageSrc = (card:ICard) :Promise<void> => {
    return new Promise((resolve, reject) => {
        // console.log("set card image :", card)
        setStorageCardImageSrc(card)
        .then((url) => {
            if(url) card.img = url
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
 * @returns Promise - with paths to the image
 */
export const uploadImageFile = (file:File) :Promise<IPaths> => {
    return new Promise((resolve, reject) => {
        uploadStorageImageFile(file)
        .then((paths) => {
            messageToSnack("Image uploaded")
            console.debug("storage path=" + paths.imagePath + ', url=' + paths.imageUrl)
            resolve(paths)
        }).catch((error) => {
            errorToSnack(error, "Error on uploading image file")
            reject(error)
        })
    })
}