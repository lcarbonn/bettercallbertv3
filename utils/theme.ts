import { type DocumentData } from "firebase/firestore"

/**
 * ThemeType interface
 * @public
 */
export interface ThemeType {
    id:string,
    color:string,
    order: number,
    title: string
}

/**
 * Theme class
 * @public
 */
export class Theme implements ThemeType {
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
 * @return color as string or null
 */
export const getThemeColor = (idTheme:string) : string|null => {
    const themes = useThemes()
    if (!idTheme || !themes?.value) return null
    let color = "primary"
    themes.value.forEach(theme => {
        if (theme.id == idTheme) {
            color = theme.color
        }
    });
    return color
}

/**
 * Build options for input select based on themes list
 * @param themes - the themes list
 * @return options as {value:string, text:string}[]
 */
export const genThemeOptions = (themes:ThemeType[]) :{value:string, text:string}[] => {
    const opts:{value:string, text:string}[] = []
    if (themes) themes.forEach(theme => {
        opts.push(
            { value: theme.id, text: theme.title }
        )
    })
    return opts
}
