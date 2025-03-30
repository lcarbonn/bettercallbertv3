import { type DocumentData } from "firebase/firestore"

/**
 * ICard interface
 * @public
 */
export interface ICard {
    id:string,
    title: string,
    idTheme: string,
    link: string|undefined,
    src: string|undefined,
    img:string|undefined,
    /**
     * Card equals
     * @param card - ICard to compare
     */
    equals: (card:ICard) => boolean
    getCardNextId : (cards:ICard[]) => string|undefined
    getCardPreviousId : (cards:ICard[]) => string|undefined
}

/**
 * Card class
 * @public
 */
export class Card implements ICard {
    id:string
    title: string
    idTheme: string
    src: string
    link: string|undefined
    img:string|undefined

    /**
     * Card constructor
     * @param doc - DocumentData form Firebase
     */
    constructor(doc?:DocumentData) {
        this.id = doc?.id
        this.title = doc?.data().title ?? ""
        this.idTheme= doc?.data().idTheme ?? ""
        this.src = doc?.data().src
        this.link = doc?.data().link
    }
    /**
     * Card equals
     * @param card - ICard to compare
     */
    public equals(card:ICard) : boolean {
        return (this.id == card.id && this.title == card.title && this.idTheme == card.idTheme && this.link == card.link && this.src == card.src && this.img == card.img)
    }

    /**
     * Get the next id of the given card
     * @param cards - the given list of cards
     * @return id or undefined
     */
    public getCardNextId = (cards:ICard[]) :string|undefined => {
        if(!cards) return undefined
        const i = cards.findIndex(x => x.id === this.id)
        if(i<cards.length-1) {
            let next = i+1
            return cards[next].id
        }
        else return undefined
    }

    
    /**
     * Get the previous id of the given card
     * @param cards - the given list of cards
     * @return id or undefined
     */
    public getCardPreviousId = (cards:ICard[]) :string|undefined => {
        if(!cards) return undefined
        const i = cards.findIndex(x => x.id === this.id)
        if(i>0) return cards[i-1].id
    }
}
