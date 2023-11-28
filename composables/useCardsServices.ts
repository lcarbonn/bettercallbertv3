import { collection, query, orderBy, getDocs, getDoc, doc, startAfter, limit, endBefore, updateDoc, deleteDoc, addDoc, type DocumentData } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

export const getCards= async () => {
    
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
                card.img = null
                getImageSrc(card)
             } else {
                card.img = card.src
            }
            list.push(card);
        });
        console.debug("result get Cards", list)
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
        snackBarMessage.value = "Error getting cards"+errorMessage
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