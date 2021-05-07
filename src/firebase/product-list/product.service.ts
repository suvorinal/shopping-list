import { ProductList } from './product'
import { Product, ProductBody } from 'src/types'
import { shoppingListsService } from 'src/firebase'

const productListObjects = new Map<string, ProductList>()

let currentProductList: ProductList

export const productService = {
    async subscribeOnProducts(id: string, fn: (data: Product[]) => void) {
        if (!(await shoppingListsService.isListAvailable(id)))
            throw new Error('Invalid id')

        if (currentProductList) currentProductList.deleteFunction()
        if (!productListObjects.has(id)) {
            currentProductList = new ProductList(id, fn)
            productListObjects.set(id, currentProductList)
        } else {
            currentProductList = productListObjects.get(id) as ProductList
            currentProductList.addFunction(fn)
            fn(await currentProductList.getCachedData())
        }
    },

    async updateProduct(shoppingListProduct: Product) {
        await currentProductList.updateProduct(shoppingListProduct)
    },

    async addProduct(shoppingListProduct: ProductBody): Promise<void> {
        await currentProductList.addProduct(shoppingListProduct)
    },

    async deleteProduct(productId: string): Promise<void> {
        await currentProductList.deleteProduct(productId)
    }
}
