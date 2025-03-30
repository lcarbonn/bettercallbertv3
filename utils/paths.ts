/**
 * IPaths interface
 * @public
 */
export interface IPaths {
    imagePath:string|undefined,
    imageUrl: string|undefined,
}

/**
 * Path class
 * @public
 */
export class Paths implements IPaths {
    imagePath:string|undefined
    imageUrl: string|undefined

    /**
     * Paths constructor
     * @param imagePath
     * @param imageUrl
     */
    constructor(imagePath:string, imageUrl:string) {
        this.imagePath = imagePath
        this.imageUrl = imageUrl
    }
}
