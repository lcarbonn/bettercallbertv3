/**
 * Reset cards list to full cards list
 */
export const resetCards = () => {
    useCards().value = useFullCards().value
}

/**
 * Get all cards then get their image
 */
export const getCardsWithImage = () => {
    getCardsDb()
    .then((list) => {
        const cards = useCards()
        cards.value = list
        const fullCards = useFullCards()
        fullCards.value = list
        setCardsImageSrc(cards.value)
    })
    .catch((error) => {
        errorToSnack(error, "Error getting cards")
    });    
}

/**
 * Get a card then get its image
 * @param id - the card id
 */
export const getCardWithImage = (id:string) => {
    getCardDb(id)
    .then((card) => {
        const stateCard = useCard()
        stateCard.value = card
        if (card.src?.indexOf("http") == -1) {
            setCardImageSrc(stateCard.value)
        }
    })
    .catch((error) => {
        errorToSnack(error, "Error getting card")
    });
}

/**
 * Add a default card in firebase db
 * @returns A `Promise` that will be resolved with the id of created card
 * @throws Throws the firebase error
 */
export const addCard = () :Promise<string> => {
    return new Promise((resolve, reject) => {
        const newCard = new Card()
        newCard.title = "New Card"
        newCard.idTheme = "DEFAULT"
        addCardDb(newCard)
        .then((id) => {
            // reload cards list
            getCardsWithImage()
            messageToSnack("Card created")
            resolve(id)
        })
        .catch((error) => {
            errorToSnack(error, "Error creating card")
            reject(error)
        });
    })
};

/**
 * Save a card
 * @param card - the card to update
 * @return A `Promise`that resolves when card updated
 */
export const saveCard = (card:ICard) :Promise<void> => {
    return new Promise((resolve, reject) => {
        saveCardDb(card)
        .then(() => {
            if (card.src?.indexOf("http") == -1) {
                setCardImageSrc(card)
                .then(() => {
                    // reload cards to react image
                    getCardsWithImage()
                })
                .catch((e) => {
                    messageToSnack("Image Source non disponible dans le store")
                })
            }
            messageToSnack("Card saved")
            resolve()
        })
        .catch((error) => {
            errorToSnack(error, "Error saving card")
            reject(error)
        });
    })
};

/**
 * Delete a card
 * @param card - the ICard
  * @return A `Promise`that resolves when card is deleted
 */
export const deleteCard = (card:ICard) :Promise<void> => {
    return new Promise((resolve, reject) => {
        deleteCardDb(card.id)
        .then(() => {
            // delete image
            if(card.src) deleteImage(card.src)
            //refresh full cards list
            getCardsWithImage()
            messageToSnack("Card deleted")
            resolve()
        })
        .catch((error) => {
            errorToSnack(error, "Error deleting card")
            reject(error)
        });
    })
};

/**
 * Filtering cards on theme
 * @param idTheme - the theme id
 */
export const filterCardsOnTheme = (idTheme:string) => {
    const list: ICard[] = [];
    const cards = useCards()
    const fullCards = useFullCards()
    if (idTheme == null) {
        cards.value = fullCards.value
    } else {
        fullCards.value.forEach((card) => {
            if (card.idTheme == idTheme) {
                list.push(card);
            }
        })
        cards.value = list
    }
}

/**
 * Searching cards on title
 * @param textsearch - the text to search in title
 */
export const searchCardsOnTitle = (textsearch:string) => {
    const list: ICard[] = [];
    const cards = useCards()
    const fullCards = useFullCards()
    const st = textsearch ? textsearch.trim() : textsearch
    if (!st) {
        cards.value = fullCards.value
    } else {
        fullCards.value.forEach((card) => {
            if (card.title.toLowerCase().includes(st.toLowerCase())) {
                list.push(card);
            }
        })
        cards.value = list
    }   
}
