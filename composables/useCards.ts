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
    getDbCards().then((list:CardType[]) => {
        const cards = useCards()
        cards.value = list
        const fullCards = useFullCards()
        fullCards.value = list
        setCardsImageSrc(cards.value)
    })
}

/**
 * Get a card then get its image
 * @param id - the card id
 */
export const getCardWithImage = (id:string) => {
    getDbCard(id).then((card:CardType) => {
        const stateCard = useCard()
        stateCard.value = card
        if (card.src?.indexOf("http") == -1) {
            setCardImageSrc(stateCard.value)
        }
    })
}

/**
 * Filtering card on theme
 * @param idTheme - the theme id
 */
export const serviceFilterCards = (idTheme:string) => {
    const list: CardType[] = [];
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
export const serviceSearchCards = (textsearch:string) => {
    const list: CardType[] = [];
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
