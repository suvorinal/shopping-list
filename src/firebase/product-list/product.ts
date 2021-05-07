import { Product, ProductBody } from '../../types'
import { database } from '../init'
import firebase from 'firebase/app'

export class ProductList {
    private readonly _collection: firebase.firestore.CollectionReference
    private _listener: (() => void) | null = null
    private _fn: ((data: Product[]) => void) | undefined
    private _products: Product[] = []

    constructor(private readonly id: string, fn: (data: Product[]) => void) {
        this._collection = database
            .collection('shopping-lists')
            .doc(id)
            .collection('products')
        this.addFunction(fn)

        this.subscribeOnProducts()
    }

    subscribeOnProducts() {
        this._listener = this._collection.onSnapshot((querySnapshot) => {
            this._products = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                this._products.push({
                    title: data.title as string,
                    checked: data.checked as boolean,
                    id: doc.id
                })
            })
            this.execFunc()
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

    execFunc() {
        if (this._fn) this._fn(this._products)
    }

    addFunction(fn: (data: Product[]) => void) {
        this._fn = fn
    }

    get products(): Product[] {
        return this._products
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

    async addUser(listId: string, email: string) {
        this._collection.doc(listId).update({
            users: firebase.firestore.FieldValue.arrayUnion(email)
        })
    }

    async deleteUser(listId: string, email: string) {
        this._collection.doc(listId).update({
            users: firebase.firestore.FieldValue.arrayUnion(email)
        })
    }
}
