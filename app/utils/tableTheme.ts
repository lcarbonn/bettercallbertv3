/**
 * ITheme interface
 * @public
 */
export interface ITheme {
    id:number,
    title: string
    color:string,
    order: number,
}

/**
 * Theme class
 * @public
 */
export class Theme implements ITheme {
    id:number
    title: string
    color:string
    order: number
    /**
     * Card constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(raw:any) {
        this.id = raw["Id"]
        this.title = raw["Title"]
        this.color = raw["Color"]
        this.order = raw["Order"]
    }
}
