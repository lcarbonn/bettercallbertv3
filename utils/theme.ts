import { type DocumentData } from "firebase/firestore"

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
}

/**
 * Get the color of the theme
 * @param idTheme - the theme id
 * @return color if found or primary color
 */
export const getThemeColor = (idTheme:string) : string => {
    const themes = useThemes()
    let color = "bg-primary"
    if (!idTheme || !themes?.value) return color
    themes.value.forEach(theme => {
        if (theme.id == idTheme) {
            color = "bg-"+theme.color
        }
    });
    return color
}

/**
 * Build options for input select based on themes list
 * @param themes - the themes list
 * @return options as {value:string, text:string}[]
 */
export const genThemeOptions = (themes:ITheme[]) :{value:string, text:string}[] => {
    const opts:{value:string, text:string}[] = []
    if (themes) themes.forEach(theme => {
        opts.push(
            { value: theme.id, text: theme.title }
        )
    })
    return opts
}
