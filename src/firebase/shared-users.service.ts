import { database } from './init'
import firebase from 'firebase/app'
import { userService } from 'src/firebase/user.service'
import DocumentReference = firebase.firestore.DocumentReference
import { UserData } from 'src/firebase/index'

const collection = database.collection('shopping-lists')

export const sharedUsersService = {
    async getListUsers(listId: string): Promise<UserData[]> {
        const snapshot = await collection.doc(listId).get({ source: 'cache' })
        const snapshotData = snapshot.data()
        if (!snapshotData || !snapshotData.author) return []
        const promises: Promise<UserData>[] = []

        promises.push(userService.getUserInfoByRef(snapshotData.author))
        if (snapshotData.users) {
            snapshotData.users.forEach((user: DocumentReference) => {
                promises.push(userService.getUserInfoByRef(user))
            })
        }
        return Promise.all(promises)
    },

    async addUser(listId: string, email: string): Promise<boolean> {
        const userRef = await userService.getUserRefByEmail(email)

        if (!userRef) return false

        await collection.doc(listId).update({
            users: firebase.firestore.FieldValue.arrayUnion(userRef)
        })

        return true
    }
}
