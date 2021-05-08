import { ProductList } from './product-list'
import { Product, ProductBody } from 'src/types'
import { shoppingListsService } from '../shopping-lists.service'

const productListObjects = new Map<string, ProductList>()

let currentProductList: ProductList

export const productService = {
    subscribeOnProducts(id: string, fn: (data: Product[]) => void) {
        if (!shoppingListsService.isListAvailable(id))
            throw new Error('Invalid id')

        if (currentProductList) currentProductList.deleteFunction()
        if (!productListObjects.has(id)) {
            currentProductList = new ProductList(id, fn)
            productListObjects.set(id, currentProductList)
        } else {
            currentProductList = productListObjects.get(id) as ProductList
            currentProductList.addFunction(fn)
            currentProductList.getCachedData().then((data) => {
                fn(data)
            })
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
