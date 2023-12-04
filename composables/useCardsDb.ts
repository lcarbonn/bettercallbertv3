import { collection, query, orderBy, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

export const getDbCards = () :Promise<CardType[]> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()
        
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
            resolve(list)
        })
        .catch((error) => {
            errorToSnack(error, "Error getting cards")
            reject()
        });    
    })
};

export const getDbCard = (id:string) :Promise<CardType> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()
    
        console.debug("start get Card")
        const docRef = doc($db as Firestore, "cards", id)
    
        getDoc(docRef)
        .then((doc)=> {
            const card = new Card(doc)
            if (card.src?.indexOf("http") != -1) {
                card.img = card.src
            }
            resolve(card)
        })
        .catch((error) => {
            errorToSnack(error, "Error getting card")
            reject()
        });
    })
};

export const createDbCard = () :Promise<string> => {
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
            errorToSnack(error, "Error creating card")
            reject()
        });
    })
};

export const saveDbCard = (card:CardType) :Promise<void> => {
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
            messageToSnack("Card saved")
            resolve()
        })
        .catch((error) => {
            errorToSnack(error, "Error saving card")
            reject()
        });
    })
};

export const deleteDbCard = (card:CardType) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start delete Card")

        const docRef = doc($db as Firestore, "cards", card.id)
        deleteDoc(docRef)
        .then(() => {
            messageToSnack("Card deleted")
            resolve()
        })
        .catch((error) => {
            errorToSnack(error, "Error deleting card")
            reject()
        });
    })
};
