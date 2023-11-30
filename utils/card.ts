import { type DocumentData } from "firebase/firestore"

export interface CardType {
    id:string,
    title: string,
    idTheme: string,
    link: string|undefined,
    src: string,
    img:string|undefined,
}

export class Card implements CardType {
    id:string
    title: string
    idTheme: string
    link: string|undefined
    src: string
    img:string|undefined
    constructor(doc:DocumentData) {
        this.id = doc.id
        this.title = doc.data().title
        this.idTheme= doc.data().idTheme
        this.link = doc.data().link
        this.src = doc.data().src
        this.img = ""
      }    
}
