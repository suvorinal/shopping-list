import { Product, ProductBody } from '../types'
import { database } from './init'
import { shoppingListsService } from './shopping-lists.service'

let collection = database.collection('shopping-lists')
let listener: (() => void) | null = null

export const productService = {
    subscribeOnProducts(id: string, fn: (data: Product[]) => void) {
        if (listener) listener()
        if (!shoppingListsService.isListAvailable(id))
            throw new Error('Invalid id')

        collection = database
            .collection('shopping-lists')
            .doc(id)
            .collection('products')
        listener = collection.onSnapshot((querySnapshot) => {
            const products: Product[] = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                products.push({
                    title: data.title as string,
                    checked: data.checked as boolean,
                    id: doc.id
                })
            })
            fn(products)
        })
    },

    async updateProduct(shoppingListProduct: Product) {
        await collection.doc(shoppingListProduct.id).update({
            title: shoppingListProduct.title,
            checked: shoppingListProduct.checked
        })
    },

    async addProduct(shoppingListProduct: ProductBody): Promise<void> {
        await collection.add(shoppingListProduct)
    },

    async deleteProduct(productId: string): Promise<void> {
        await collection.doc(productId).delete()
    }
}
