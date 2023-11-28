import { initializeApp } from 'firebase/app'
import { getAuth, type Auth } from "firebase/auth"
import { Firestore, getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.public.FIREBASE_API_KEY,
        authDomain: config.public.FIREBASE_AUTH_DOMAIN,
        databaseURL: config.public.FIREBASE_DATABASE_URL,
        projectId: config.public.FIREBASE_PROJECT_ID,
        storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
        appId: config.public.FIREBASE_APP_ID,
        measurementId: config.public.FIREBASE_MEASUREMENT_ID
    }
    const app = initializeApp(firebaseConfig)
    const db = getFirestore()
    const storage = getStorage(app)

    const auth = getAuth(app)

    nuxtApp.provide('auth', auth)
    nuxtApp.provide('db', db)
    nuxtApp.provide('storage', storage)

    initUser()

})