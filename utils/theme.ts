import { type DocumentData } from "firebase/firestore"
import { getThemesDb } from "./db/themesDb"

/**
 * ITheme interface
 * @public
 */
export interface ITheme {
    id:string,
    color:string,
    order: number,
    title: string
}

/**
 * Theme class
 * @public
 */
export class Theme implements ITheme {
    id:string
    color:string
    order: number
    title: string
    /**
     * Card constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(doc:DocumentData) {
        this.id = doc.id
        this.color = doc.data().color
        this.order = doc.data().order
        this.title = doc.data().title
    }
    /**
     * Get all the themes from db
     * @returns A Promise that resolves a array of themes
     */
    public static getThemes = () :Promise<Array<ITheme>> => {
        return new Promise((resolve, reject) => {
            getThemesDb()
            .then((themes) => {
                resolve(themes)
            })
        })
    }

}
