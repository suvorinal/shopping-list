import { auth, googleProvider, database } from './init'
import firebase from 'firebase/app'
import User = firebase.User
import { UserData } from './types'

auth.languageCode = 'ru'

function authStateChanged(): Promise<User> {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe()
            if (user) resolve(user)
            reject(new Error())
        })
    })
}

export const authService = {
    authStateChanged, //todo
    async getUserData(): Promise<UserData | null> {
        try {
            const user = await authStateChanged()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return {
                avatar: user.photoURL || '',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                uid: user.uid,
                name: user.displayName || ''
            }
        } catch (e) {
            console.log('lelasdasglkhsdgajk hsdak jghsafkjg h')
            return null
        }
    },

    auth() {
        void auth.signInWithRedirect(googleProvider)
    },

    async isAuth(): Promise<boolean> {
        try {
            await authStateChanged()
            return true
        } catch (e) {
            return false
        }
    },

    getRedirectedResult() {
        return auth.getRedirectResult()
    },

    logout() {
        void database.terminate()
        void auth.signOut()
    },

    get uid(): string {
        return auth.currentUser?.uid || ''
    }
}
