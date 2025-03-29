import { collection, query, orderBy, getDocs} from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Get the themes from firestore
 * @returns Promise - the themes list
 * @returns Reject the error
 */
export const getDbThemes= () :Promise<ITheme[]> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start get Themes")
        const cardsRef = collection($db as Firestore, "themes")
        const list: ITheme[] = [];
    
        const q = query(cardsRef, orderBy("order"));
        getDocs(q)
        .then((querySnapshot)=> {
            querySnapshot.forEach(doc => {
                const theme = new Theme(doc)
                list.push(theme);
            });
            resolve(list)
        })
        .catch((error) => {
            errorToSnack(error, "Error getting Themes")
            reject(error)
        });
    })
};
