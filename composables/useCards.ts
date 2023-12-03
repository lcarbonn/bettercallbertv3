export const resetCards = () => {
    useCards().value = useFullCards().value
}

export const getCardsWithImage = () => {
    getDbCards().then((list:CardType[]) => {
        const cards = useCards()
        cards.value = list
        const fullCards = useFullCards()
        fullCards.value = list
        setCardsImageSrc(cards.value)
    })
}

export const getCardWithImage = (id:string) => {
    getDbCard(id).then((card:CardType) => {
        const stateCard = useCard()
        stateCard.value = card
        setCardImageSrc(stateCard.value)
    })
}

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
