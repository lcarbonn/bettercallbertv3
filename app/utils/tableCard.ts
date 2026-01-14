/**
 * ICard interface
 * @public
 */
export interface ICard {
    id:number,
    title: string,
    idTheme: number,
    link?: string,
    src?: string,
    img?:string,
    color?:string
}

/**
 * Card class
 * @public
 */
export class Card implements ICard {
    id:number
    title: string
    idTheme: number
    src?: string
    link?: string
    img?:string
    color?:string

    /**
     * Card constructor
     * @param raw data
     */
    constructor(raw:any) {
        this.id = raw["Id"]
        this.title = raw["Title"]
        this.src = raw["Src"]
        this.link = raw["Link"]
        const theme = raw["Theme"][0]
        this.idTheme= theme?theme.value:undefined
        this.color = raw["Color"]
    }
}
