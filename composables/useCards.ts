// reset card to full cards
export const resetCards = () => {
    useCards().value = useFullCards().value
}

// get all card then get their image
export const getCardsWithImage = () => {
    getDbCards().then((list:CardType[]) => {
        const cards = useCards()
        cards.value = list
        const fullCards = useFullCards()
        fullCards.value = list
        setCardsImageSrc(cards.value)
    })
}

// get a card then get its image
export const getCardWithImage = (id:string) => {
    getDbCard(id).then((card:CardType) => {
        const stateCard = useCard()
        stateCard.value = card
        if (card.src?.indexOf("http") == -1) {
            setCardImageSrc(stateCard.value)
        }
    })
}

// fitering cards on theme
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

// searching cards on title
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
