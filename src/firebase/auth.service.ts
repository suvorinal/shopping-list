import { auth, database } from './init'
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
    async getUserData(): Promise<UserData | null> {
        try {
            const user = await authStateChanged()
            return {
                avatar: user.photoURL || '',
                email: user.email || '',
                name: user.displayName || ''
            }
        } catch (e) {
            return null
        }
    },

    async isAuth(): Promise<boolean> {
        try {
            await authStateChanged()
            return true
        } catch (e) {
            return false
        }
    },

    async logout() {
        await database.terminate()
        await Promise.all([database.clearPersistence(), auth.signOut()])
        location.reload()
    },

    get uid(): string {
        return auth.currentUser?.uid || ''
    }
}
