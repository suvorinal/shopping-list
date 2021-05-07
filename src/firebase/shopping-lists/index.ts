import { ShoppingList, ShoppingListBody } from '../../types'
import { database } from '../init'
import { authService } from '../auth.service'
import firebase from 'firebase/app'
import QuerySnapshot = firebase.firestore.QuerySnapshot
import DocumentData = firebase.firestore.DocumentData

const collection = database.collection('shopping-lists')
const availableLists: string[] = []

const shoppingListsQuery = () =>
    collection.where('author', '==', authService.uid)
const sharedShoppingListsQuery = () =>
    collection.where('users', 'array-contains', authService.uid)

export const shoppingListsService = {
    async subscribeToShoppingLists(fn: (data: ShoppingList[]) => void) {
        if (!(await authService.isAuth())) return []
        shoppingListsQuery().onSnapshot((querySnapshot) =>
            this.onSnapshot(querySnapshot, fn)
        )
    },

    async subscribeToSharedShoppingLists(fn: (data: ShoppingList[]) => void) {
        if (!(await authService.isAuth())) return []
        sharedShoppingListsQuery().onSnapshot((querySnapshot) =>
            this.onSnapshot(querySnapshot, fn)
        )
    },

    async getShoppingLists() {
        const res = await shoppingListsQuery().get({ source: 'cache' })
        return this.onSnapshot(res)
    },

    async getSharedShoppingLists() {
        const res = await sharedShoppingListsQuery().get({ source: 'cache' })
        return this.onSnapshot(res)
    },

    onSnapshot(
        querySnapshot: QuerySnapshot<DocumentData>,
        cb?: (data: ShoppingList[]) => void
    ) {
        const lists: ShoppingList[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            if (data) {
                lists.push({
                    title: data.title as string,
                    id: doc.id
                })
                availableLists.push(doc.id)
            }
        })
        if (!cb) return lists
        cb(lists)
    },

    async updateList(shoppingList: ShoppingList) {
        await collection.doc(shoppingList.id).update({
            title: shoppingList.title
        })
    },

    async addList(shoppingList: ShoppingListBody): Promise<void> {
        const list = {
            ...shoppingList,
            author: authService.uid
        }
        await collection.add(list)
    },

    async deleteList(listId: string): Promise<void> {
        await collection.doc(listId).delete()
    },

    addUser(listId: string, email: string) {
        collection.doc(listId).update({
            users: firebase.firestore.FieldValue.arrayUnion(email)
        })
    },

    deleteUser(listId: string, email: string) {
        collection.doc(listId).update({
            users: firebase.firestore.FieldValue.arrayUnion(email)
        })
    },

    async isListAvailable(id: string): Promise<boolean> {
        const shoppingLists = await this.getShoppingLists()
        if (!shoppingLists || !shoppingLists.find((v) => v.id === id))
            return false
        const sharedShoppingLists = await this.getSharedShoppingLists()
        return !(
            !sharedShoppingLists ||
            !sharedShoppingLists.find((v) => v.id === id)
        )
    }
}
