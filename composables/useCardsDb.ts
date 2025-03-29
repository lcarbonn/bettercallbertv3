import { collection, query, orderBy, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Get all cards from firebase db
 * @returns A Promise that resolve a list of ICard
 * @throws Throws the firebase error
 */
export const getDbCards = () :Promise<ICard[]> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()
        
        console.debug("start get Cards")
        const cardsRef = collection($db as Firestore, "cards")
        const list: ICard[] = [];
    
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
            reject(error)
        });    
    })
};

/**
 * Get a card from firebase db
 * @param id - the card id
 * @returns A Promise that resolve the card
 * @throws Throws the firebase error
 */
export const getDbCard = (id:string) :Promise<ICard> => {
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
            reject(error)
        });
    })
};

/**
 * Create a default card in firebase db
 * @returns A Promise that resolve the id of the created card
 * @throws Throws the firebase error
 */
export const createDbCard = () :Promise<string> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start create Card")

        const newCard = {
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
            reject(error)
        });
    })
};

/**
 * Save a card in firebase db
 * @throws Throws the firebase error
 */
export const saveDbCard = (card:ICard) :Promise<void> => {
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
            reject(error)
        });
    })
};

/**
 * Delete a card in firebase db
 * @param id - the card id
 * @throws Throws the firebase error
 */
export const deleteDbCard = (id:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start delete Card")

        const docRef = doc($db as Firestore, "cards", id)
        deleteDoc(docRef)
        .then(() => {
            messageToSnack("Card deleted")
            resolve()
        })
        .catch((error) => {
            errorToSnack(error, "Error deleting card")
            reject(error)
        });
    })
};
