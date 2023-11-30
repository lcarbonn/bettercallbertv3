import { type DocumentData } from "firebase/firestore"

export interface ThemeType {
    id:string,
    color:string,
    order: number,
    title: string
}

export class Theme implements ThemeType {
    id:string
    color:string
    order: number
    title: string
    constructor(doc:DocumentData) {
        this.id = doc.id
        this.color = doc.data().color
        this.order = doc.data().order
        this.title = doc.data().title
      }    
}

export const getThemeColor = (idTheme:string) => {
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
