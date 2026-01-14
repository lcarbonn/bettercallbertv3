// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id:number
    first_name:string
    username:string
    language:string
  }

  interface SecureSessionData {
    // Add your own fields
    access_token:string
    refresh_token:string
  }
}

export {}