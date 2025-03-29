import { collection, query, orderBy, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Get all cards from firebase db
 * @returns A `Promise` that will be resolved with a array of ICard
 */
export const getCardsDb = () :Promise<ICard[]> => {
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
            reject(error)
        });    
    })
};

/**
 * Get a card from firebase db
 * @param id - the card id
 * @returns A `Promise` that will be resolved with the card
 */
export const getCardDb = (id:string) :Promise<ICard> => {
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
            reject(error)
        });
    })
};

/**
 * Add a card in firebase db
 * @param newCard - card to add
 * @returns A `Promise` that will be resolved with the id of created card
 */
export const addCardDb = (newCard:ICard) :Promise<string> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start create Card")

        const cardsRef = collection($db as Firestore, "cards")
        addDoc(cardsRef,
            {title:newCard.title,
            idTheme:newCard.idTheme})
        .then((doc) => {
            resolve(doc.id)
        })
        .catch((error) => {
            reject(error)
        });
    })
};

/**
 * Save a card in firebase db
 * @param card - the card to update
 * @return A `Promise`that resolves when card updated
 */
export const saveCardDb = (card:ICard) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start save Card")

        const docRef = doc($db as Firestore, "cards", card.id)
        updateDoc(docRef, {
            title: card.title,
            link: card.link,
            src: card.src,
            idTheme: card.idTheme
        })
        .then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
    })
};

/**
 * Delete a card in firebase db
 * @param id - the card id
  * @return A `Promise`that resolves when card is deleted
 */
export const deleteCardDb = (id:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start delete Card")

        const docRef = doc($db as Firestore, "cards", id)
        deleteDoc(docRef)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        });
    })
};

