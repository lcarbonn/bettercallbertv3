import { collection, query, orderBy, getDocs, getDoc, doc, startAfter, limit, endBefore, updateDoc, deleteDoc, addDoc, type DocumentData } from "firebase/firestore"
import { type Firestore } from "firebase/firestore"
import { useThemes } from "./useStates";

export const getThemes= () => {
    
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
        const themes = useThemes()
        themes.value = list
    })
    .catch((error) => {
        const snackBarMessage = useSnackBarMessage()
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error get Themes", errorCode, errorMessage)
        snackBarMessage.value = "Error getting Themes"+errorMessage
    });
};

export const getTheme = (idTheme:string) => {
    const themes = useThemes()
    if(themes && idTheme) {
        const theme = getThemeColor(idTheme, themes.value)
        return theme
    }
    return "primary"
}
