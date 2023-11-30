import { collection, query, orderBy, getDocs, getDoc, doc, startAfter, limit, endBefore, updateDoc, deleteDoc, addDoc, type DocumentData } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

export const getCards= () => {
    
    const { $db } = useNuxtApp()

    console.debug("start get Cards")
    const cardsRef = collection($db as Firestore, "cards")
    const list: CardType[] = [];

    const q = query(cardsRef, orderBy("idTheme"));
    getDocs(q)
    .then((querySnapshot)=> {
        querySnapshot.forEach(doc => {
            const card = new Card(doc)
            if (card.src.indexOf("http") == -1) {
                setCardsImageSrc(card)
             } else {
                card.img = card.src
            }
            list.push(card);
        });
        const cards = useCards()
        cards.value = list
        const fullCards = useFullCards()
        fullCards.value = list
    })
    .catch((error) => {
        const snackBarMessage = useSnackBarMessage()
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error get Cards", errorCode, errorMessage)
        snackBarMessage.value = "Error getting cards : "+errorMessage
    });
};

export const getCard = (id:string) => {
    
    const { $db } = useNuxtApp()

    console.debug("start get Card")
    const docRef = doc($db as Firestore, "cards", id)

    getDoc(docRef)
    .then((doc)=> {
        const card = new Card(doc)
        if (card.src.indexOf("http") == -1) {
            setCardImageSrc(card)
         } else {
            card.img = card.src
        }

        const stateCard = useCard()
        stateCard.value = card
    })
    .catch((error) => {
        const snackBarMessage = useSnackBarMessage()
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error get Card", errorCode, errorMessage)
        snackBarMessage.value = "Error getting card : "+errorMessage
    });
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
