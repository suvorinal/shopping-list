import { ShoppingList, ShoppingListBody } from '../types'
import { database } from './init'
import { authService } from './auth.service'
import { userService } from 'src/firebase/user.service'
import firebase from 'firebase'
import QuerySnapshot = firebase.firestore.QuerySnapshot

const collection = database.collection('shopping-lists')
const availableLists = new Set<string>()

export const shoppingListsService = {
    async subscribeToShoppingLists(fn: (data: ShoppingList[]) => void) {
        if (!(await authService.isAuth())) return []
        const userRef = userService.getUserRefById(authService.uid)
        collection
            .where('author', '==', userRef)
            .onSnapshot((querySnapshot) => this.onSnapshotFn(querySnapshot, fn))
    },

    async subscribeToSharedShoppingLists(fn: (data: ShoppingList[]) => void) {
        if (!(await authService.isAuth())) return []
        const userRef = userService.getUserRefById(authService.uid)
        collection
            .where('users', 'array-contains', userRef)
            .onSnapshot((querySnapshot) => this.onSnapshotFn(querySnapshot, fn))
    },

    async onSnapshotFn(
        querySnapshot: QuerySnapshot,
        fn: (data: ShoppingList[]) => void
    ) {
        const lists: ShoppingList[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            if (data) {
                const numberOfUsers = data.users ? data.users.length + 1 : 1
                lists.push({
                    title: data.title as string,
                    numberOfUsers,
                    id: doc.id
                })
                availableLists.add(doc.id)
            }
        })
        fn(lists)
    },

    async updateList(shoppingList: ShoppingList) {
        await collection.doc(shoppingList.id).update({
            title: shoppingList.title
        })
    },

    async addList(shoppingList: ShoppingListBody): Promise<void> {
        const list = {
            ...shoppingList,
            author: userService.getUserRefById(authService.uid)
        }
        await collection.add(list)
    },

    async deleteList(listId: string): Promise<void> {
        await collection.doc(listId).delete()
    },

    isListAvailable(id: string): boolean {
        return availableLists.has(id)
    }
}
