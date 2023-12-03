import { collection, query, orderBy, getDocs, getDoc, doc, startAfter, limit, endBefore, updateDoc, deleteDoc, addDoc, type DocumentData } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"

export const getDbThemes= () :Promise<ThemeType[]> => {
    return new Promise((resolve, reject) => {
        const { $db } = useNuxtApp()

        console.debug("start get Themes")
        const cardsRef = collection($db as Firestore, "themes")
        const list: ThemeType[] = [];
    
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
            const snackBarMessage = useSnackBarMessage()
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error get Themes", errorCode, errorMessage)
            snackBarMessage.value = "Error getting Themes : "+errorMessage
        });
    })
};
