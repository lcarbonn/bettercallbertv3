import { type DocumentData } from "firebase/firestore"

/**
 * ICard interface
 * @public
 */
export interface ICard {
    id:string,
    title: string,
    idTheme: string,
    link?: string,
    src?: string,
    img?:string,
    /**
     * Card equals
     * @param card - ICard to compare
     */
    equals: (card:ICard) => boolean;
    getCardNextId : (cards:ICard[]) => string|undefined;
    getCardPreviousId : (cards:ICard[]) => string|undefined;
    create: () => Promise<string>
    read : () => Promise<ICard>
    update : () => Promise<void>
    delete : () => Promise<void>
    getImageDownloadUrl : () => Promise<string|void>
    deleteImage : () => Promise<void>
}

/**
 * Card class
 * @public
 */
export class Card implements ICard {
    id:string
    title: string
    idTheme: string
    src?: string
    link?: string
    img?:string

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
     * Create the Card in db
     * @returns A Promise that resolves the id
     */
    public create = () :Promise<string> => {
        return new Promise((resolve, reject) => {
            addCardDb(this)
            .then((id) => {
                resolve(id)
            })
        })
    }
    
    /**
     * Read the card from db
     * @returns A Promise that resolves the card
     */
    public read = () :Promise<ICard> => {
        return new Promise((resolve, reject) => {
            getCardDb(this.id)
            .then((card) => {
                resolve(card)
            })
        })
    }

    /**
     * Update the card in db
     * @returns Promise when done
     */
    public update = () :Promise<void> => {
        return new Promise((resolve, reject) => {
            saveCardDb(this)
            .then(() => {
                resolve()
            })
        })
    }

    /**
     * Delete the card in db
     * @returns A Promise when done
     */
    public delete = () :Promise<void> => {
        return new Promise((resolve, reject) => {
            deleteCardDb(this.id)
            .then(() => {
                resolve()
            })
        })
    }

    /**
     * Get all the cards from db
     * @returns A Promise that resolves a array of cards
     */
    public static getCards = () :Promise<Array<ICard>> => {
        return new Promise((resolve, reject) => {
            getCardsDb()
            .then((cards) => {
                resolve(cards)
            })
        })
    }

    /**
     * Card equals
     * @param card - ICard to compare
     */
    public equals = (card:ICard) :boolean => {
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

    /**
     * Retrieve the image download url form a src
     * @param src - the source
     * @returns Promise - will resolves the url of the image
     */
    public getImageDownloadUrl = () :Promise<string|void> => {
        return new Promise((resolve, reject) => {
            // console.log("set card image :", card)
            if(!this.src) resolve()
            else {
                getStorageDownloadUrl(this.src)
                .then((url) => {
                    resolve(url)
                })
            }
        })
    }

    /**
     * Delete the src img
     * @param src - the image file src
     * @returns Promise - resolved when done
     */
    public deleteImage = () :Promise<void> => {
        return new Promise((resolve, reject) => {
            if(!this.src) resolve()
            else {
                deleteStorageImage(this.src)
                .then(() => {
                    resolve()
                })
            }
        })
    }
}
