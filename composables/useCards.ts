/**
 * Reset cards list to full cards list
 */
export const resetStatedCards = (cards?:ICard[]) => {
    if(cards) useFullCards().value = cards
    useCards().value = useFullCards().value
}

/**
 * Add or replace a card in stated cards list
 * @param card - the card
 */
export const setCardToStatedCards = (card:ICard) => {
    const cards:ICard[] = []
    Object.assign(cards, useFullCards().value)
    let found = false
    cards.forEach((oldCard) => {
        if(card.id == oldCard.id) {
            oldCard = card,
            found = true
        }
    })
    if(!found) cards.push(card)
    resetStatedCards(cards)
}

/**
 * Delete the card form stated cards list
 * @param card - the card
 */
export const removeCardFromStatedCards = (card:ICard) => {
    let cards:ICard[]
    const oldCards = useFullCards().value
    if(oldCards) {
        cards = []
        oldCards.forEach((oldCard) => {
            if(oldCard.id != card.id) {
                cards.push(oldCard)
            }
        })
        resetStatedCards(cards)
    }
    else resetStatedCards()
}

/**
 * Set the card image url
 * @param card - the card
 */
const setCardStatedSrc = (card:ICard) => {
    if (card.src?.indexOf("http") == -1) {
        card.getImageDownloadUrl()
        .then((url) => {
            if(url) {
                card.img = url
                setCardToStatedCards(card)
            }
        })
        .catch((e) => {
            messageToSnack("Image Source non disponible dans le store")
        })
    }
}

/**
 * Retrieve and set image of each card in the cards list
 * @param cards - the cards list
 */
export const setCardsImageSrc = (cards:ICard[]) => {
    // console.log("set cards image :", cards)
    if(!cards) return
    cards.forEach(card => {
        setCardStatedSrc(card)
    })
}

/**
 * Get all cards then set their image
 */
export const getCardsWithImage = () => {
    Card.getCards()
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
    const card = new Card()
    card.id = id
    card.read()
    .then((card) => {
        if (card.src?.indexOf("http") == -1) {
            card.getImageDownloadUrl()
            .then((url) => {
                if(url) {
                    card.img = url
                    useCard().value = card
                }
            })
        }
        else useCard().value = card
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
        const card = new Card()
        card.title = "New Card"
        card.idTheme = "DEFAULT"
        card.create()
        .then((id) => {
            card.id = id
            setCardToStatedCards(card)
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
        card.update()
        .then(() => {
            setCardStatedSrc(card)
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
        card.delete()
        .then(() => {
            // delete image
            removeCardFromStatedCards(card)
            card.deleteImage()
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
    const filteredCards = useCards()
    const fullCards = useFullCards().value
    if (idTheme == null) {
        filteredCards.value = fullCards
    } else {
        if(fullCards) {
            fullCards?.forEach((card) => {
                if (card.idTheme == idTheme) {
                    list.push(card);
                }
            })
            filteredCards.value = list
        }
        else filteredCards.value = undefined
    }
}

/**
 * Searching cards on title
 * @param textsearch - the text to search in title
 */
export const searchCardsOnTitle = (textsearch:string) => {
    const list: ICard[] = [];
    const filteredCard = useCards()
    const fullCards = useFullCards().value
    const st = textsearch ? textsearch.trim() : textsearch
    if (!st) {
        filteredCard.value = fullCards
    } else {
        if(fullCards) {
            fullCards.forEach((card) => {
                if (card.title.toLowerCase().includes(st.toLowerCase())) {
                    list.push(card);
                }
            })
            filteredCard.value = list
        } else filteredCard.value = undefined
    }   
}
