import { type DocumentData } from "firebase/firestore"

export type CardType = {
    id:string,
    title: string,
    idTheme: string,
    link: string|null,
    src: string,
    img:string|null,
}

export class Card implements CardType {
    id:string
    title: string
    idTheme: string
    link: string|null
    src: string
    img:string|null
    constructor(doc:DocumentData) {
        this.id = doc.id
        this.title = doc.data().title
        this.idTheme= doc.data().idTheme
        this.link = doc.data().link
        this.src = doc.data().src
        this.img = ""
      }    
}
