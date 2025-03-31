/**
 * IAuthUser interface
 * @public
 */
export interface IAuthUser {
    uid:string,
    isAnonymous:boolean,
    email:string|null,
}

/**
 * User class
 * @public
 */
export class AuthUser implements IAuthUser {
    uid:string
    isAnonymous:boolean
    email:string|null

    /**
     * AuthUser constructor
     */
    constructor(uid:string, isAnonymous:boolean, email:string|null) {
        this.uid = uid,
        this.isAnonymous = isAnonymous,
        this.email = email
    }

}