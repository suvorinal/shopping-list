import { database } from './init'
import { UserData } from './types'
import firebase from 'firebase/app'
import DocumentReference = firebase.firestore.DocumentReference

const collection = database.collection('users')

export const userService = {
    createUser(uid: string, userData: UserData) {
        collection.doc(uid).set(userData)
    },

    async getUserInfoByRef(ref: DocumentReference): Promise<UserData> {
        const res = await ref.get()
        const data = res.data()
        return {
            avatar: data?.avatar,
            name: data?.name,
            email: data?.email
        }
    },

    getUserRefById(id: string): DocumentReference {
        return collection.doc(id)
    },

    async getUserRefByEmail(email: string): Promise<DocumentReference | null> {
        const user = await collection.where('email', '==', email).limit(1).get()
        if (!user.docs[0]?.id) return null
        const userId = user.docs[0].id
        return collection.doc(userId)
    }
}
