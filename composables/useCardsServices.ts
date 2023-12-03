import { collection, query, orderBy, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

export const getCardsWithImage = () => {
    const cards = useCards()
    getCards().then(() => {
        setCardsImageSrc(cards.value)
    })
}

export const getCardWithImage = (id:string) => {
    const card = useCard()
    getCard(id).then(() => {
        setCardImageSrc(card.value)
    })
}

export const getCards = () :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()
        const cards = useCards()
        
        console.debug("start get Cards")
        const cardsRef = collection($db as Firestore, "cards")
        const list: CardType[] = [];
    
        const q = query(cardsRef, orderBy("idTheme"));
        getDocs(q)
        .then((querySnapshot)=> {
            querySnapshot.forEach(doc => {
                const card = new Card(doc)
                if (card.src?.indexOf("http") != -1) {
                    card.img = card.src
                }
                list.push(card);
            });
            cards.value = list
            const fullCards = useFullCards()
            fullCards.value = list
            resolve()
        })
        .catch((error) => {
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error get Cards", errorCode, errorMessage)
            snackBarMessage.value = "Error getting cards : "+errorMessage
            reject()
        });    
    })
};

export const getCard = (id:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()
        const stateCard = useCard()
    
        console.debug("start get Card")
        const docRef = doc($db as Firestore, "cards", id)
    
        getDoc(docRef)
        .then((doc)=> {
            const card = new Card(doc)
            stateCard.value = card
            if (card.src?.indexOf("http") != -1) {
                stateCard.value.img = card.src
            }
            resolve()
        })
        .catch((error) => {
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error get Card", errorCode, errorMessage)
            snackBarMessage.value = "Error getting card : "+errorMessage
            reject()
        });
    })
};

export const createCard = () :Promise<string> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start create Card")

        const newCard ={
            "title": "New Card",
            "idTheme": "DEFAULT"
        }
        const cardsRef = collection($db as Firestore, "cards")
        addDoc(cardsRef, newCard)
        .then((doc) => {
            resolve(doc.id)
        })
        .catch((error) => {
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error create Card", errorCode, errorMessage)
            snackBarMessage.value = "Error create card : "+errorMessage
            reject()
        });
    })
};

export const saveCard = (card:CardType) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start save Card")

        const docRef = doc($db as Firestore, "cards", card.id)
        updateDoc(docRef, {
            title: card.title,
            link: card.link ? card.link : "",
            src: card.src,
            idTheme: card.idTheme
        })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error save Card", errorCode, errorMessage)
            snackBarMessage.value = "Error save card : "+errorMessage
            reject()
        });
    })
};

export const deleteCard = (card:CardType) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start delete Card")

        const docRef = doc($db as Firestore, "cards", card.id)
        deleteDoc(docRef)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error delete Card", errorCode, errorMessage)
            snackBarMessage.value = "Error delete card : "+errorMessage
            reject()
        });
    })
};

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
