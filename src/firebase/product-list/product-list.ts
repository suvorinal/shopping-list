import { Product, ProductBody } from '../../types'
import { database } from '../init'
import firebase from 'firebase/app'

export class ProductList {
    private readonly _collection: firebase.firestore.CollectionReference
    private _listener?: () => void
    private _fn?: (data: Product[]) => void

    constructor(private readonly _id: string, fn: (data: Product[]) => void) {
        this._collection = database
            .collection('shopping-lists')
            .doc(_id)
            .collection('products')
        this.addFunction(fn)

        this.subscribeOnProducts()
    }

    subscribeOnProducts() {
        this._listener = this._collection.onSnapshot((querySnapshot) => {
            const products: Product[] = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                products.push({
                    title: data.title as string,
                    checked: data.checked as boolean,
                    id: doc.id
                })
            })
            this.execFunc(products)
        })
    }

    async getCachedData() {
        const products: Product[] = []
        const res = await this._collection.get({ source: 'cache' })
        res.docs.forEach((doc) => {
            const data = doc.data()
            products.push({
                title: data.title as string,
                checked: data.checked as boolean,
                id: doc.id
            })
        })
        return products
    }

    execFunc(products: Product[]) {
        if (this._fn) this._fn(products)
    }

    addFunction(fn: (data: Product[]) => void) {
        this._fn = fn
    }

    deleteFunction() {
        this._fn = undefined
    }

    async updateProduct(shoppingListProduct: Product) {
        await this._collection.doc(shoppingListProduct.id).update({
            title: shoppingListProduct.title,
            checked: shoppingListProduct.checked
        })
    }

    async addProduct(shoppingListProduct: ProductBody): Promise<void> {
        await this._collection.add(shoppingListProduct)
    }

    async deleteProduct(productId: string): Promise<void> {
        await this._collection.doc(productId).delete()
    }
}
