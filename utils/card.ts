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

export const getCardNextId = (card:CardType, cards:CardType[]) => {
    if(!card||!cards) return undefined
    const i = cards.findIndex(x => x.id === card.id)
    if(i<cards.length) {
        let next = i+1
        return cards[next].id
    }
    else return undefined
}

export const getCardPreviousId = (card:CardType, cards:CardType[]) => {
    if(!card||!cards) return undefined
    const i = cards.findIndex(x => x.id === card.id)
    if(i>0) return cards[i-1].id
    else return undefined
}
