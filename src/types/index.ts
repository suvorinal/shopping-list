export type Product = {
    title: string
    id: string
    checked: boolean
}

export type ProductBody = {
    title: string
    checked: boolean
}

export type ShoppingList = {
    title: string
    numberOfUsers?: number
    id: string
}

export type ShoppingListBody = {
    title: string
    numberOfUsers?: number
}
