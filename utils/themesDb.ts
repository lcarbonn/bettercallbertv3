import { collection, query, orderBy, getDocs} from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

/**
 * Get the themes from firestore
 * @returns A `Promise` that will be resolved with an array of themes
 */
export const getThemesDb= () :Promise<ITheme[]> => {
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
            reject(error)
        });
    })
};
