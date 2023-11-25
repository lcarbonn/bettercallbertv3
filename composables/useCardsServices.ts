import { collection, query, orderBy, getDocs, getDoc, doc, startAfter, limit, endBefore, updateDoc, deleteDoc, addDoc } from "firebase/firestore"

export const getCards= async () => {
    
    const { $db } = useNuxtApp()

    console.debug("start get Cards")
    const cardsRef = collection($db, "cards")
    const list: {}[] = [];
    let card = {}

    const q = query(cardsRef);
    getDocs(q)
    .then((querySnapshot)=> {
        querySnapshot.forEach(doc => {
            card = {}
            card = doc.data()
            card.id = doc.id
            if (card.src.indexOf("http") == -1) {
                card.img = null
            } else {
                card.img = card.src
            }
            list.push(card);
        });
        console.debug("result get Cards", list)
        const cards = useCards()
        cards.value = list
    })
    .catch((error) => {
        console.debug("error get Cards", error)
        const snackBarMessage = useSnackBarMessage()
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error get Cards", errorCode, errorMessage)
        snackBarMessage.value = "Error on login"+errorMessage
    });
};