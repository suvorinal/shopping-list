import { ShoppingList, ShoppingListBody } from '../types'
import { database } from './init'
import { authService } from './auth.service'
import { userService } from 'src/firebase/user.service'

const collection = database.collection('shopping-lists')
const availableLists: string[] = []

export const shoppingListsService = {
    async subscribeToShoppingLists(fn: (data: ShoppingList[]) => void) {
        if (!(await authService.isAuth())) return []
        const userRef = userService.getUserRefById(authService.uid)
        collection
            .where('author', '==', userRef)
            .onSnapshot((querySnapshot) => {
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
                fn(lists)
            })
    },

    async subscribeToSharedShoppingLists(fn: (data: ShoppingList[]) => void) {
        if (!(await authService.isAuth())) return []
        const userRef = userService.getUserRefById(authService.uid)
        collection
            .where('users', 'array-contains', userRef)
            .onSnapshot((querySnapshot) => {
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
                fn(lists)
            })
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
        return availableLists.includes(id)
    }
}
