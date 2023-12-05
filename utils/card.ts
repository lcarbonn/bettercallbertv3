import { type DocumentData } from "firebase/firestore"

/**
 * CardType interface
 * @public
 */
export interface CardType {
    id:string,
    title: string,
    idTheme: string,
    link: string|undefined,
    src: string,
    img:string|undefined,
    /**
     * Card equals
     * @param card - CardType to compare
     */
    equals: (card:CardType) => boolean
}

/**
 * Card class
 * @public
 */
export class Card implements CardType {
    id:string
    title: string
    idTheme: string
    link: string|undefined
    src: string
    img:string|undefined

    /**
     * Card constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(doc:DocumentData) {
        this.id = doc.id
        this.title = doc.data().title
        this.idTheme= doc.data().idTheme
        this.link = doc.data().link
        this.src = doc.data().src
        this.img = ""
    }
    /**
     * Card equals
     * @param card - CardType to compare
     */
    public equals(card:CardType) : boolean {
        return (this.id == card.id && this.title == card.title && this.idTheme == card.idTheme && this.link == card.link && this.src == card.src && this.img == card.img)
    }
}

/**
 * Get the next id of the given card
 * @param card - the card
 * @param cards - the given list of cards
 * @return id or undefined
 */
export const getCardNextId = (card:CardType, cards:CardType[]) :string|undefined => {
    if(!card||!cards) return undefined
    const i = cards.findIndex(x => x.id === card.id)
    if(i<cards.length) {
        let next = i+1
        return cards[next].id
    }
    else return undefined
}

/**
 * Get the previous id of the given card
 * @param card - the card
 * @param cards - the given list of cards
 * @return id or undefined
 */
export const getCardPreviousId = (card:CardType, cards:CardType[]) :string|undefined => {
    if(!card||!cards) return undefined
    const i = cards.findIndex(x => x.id === card.id)
    if(i>0) return cards[i-1].id
    // else return undefined
}
