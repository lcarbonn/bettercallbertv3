import { collection, query, orderBy, getDocs, getDoc, doc, startAfter, limit, endBefore, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
import { firestoreDb } from "../lib/firebase";

export default defineEventHandler(async (event) => {
    
    console.debug("start get Cards")
    const cardsRef = collection(firestoreDb, "cards")
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
        return { result: list};
    })
    .catch((error) => {
        console.debug("error get Cards", error)
        return { result: [], error: error.message };
    });
});