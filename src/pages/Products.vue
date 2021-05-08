<template>
    <dialog-form-add v-model="dialog" label="product-name" @add="addProduct" />
    <q-page class="shopping-list">
        <shared-users :list-id="$root.$route.params.id" />
        <product-list
            :products="products"
            @product-update="updateProduct"
            @product-delete="deleteProduct"
        />

        <q-btn
            rounded
            class="add-button bg-white q-py-sm"
            @click="openDialog"
            float
        >
            <q-icon name="create" />
            <span class="q-ml-sm">{{ $t('add-new') }}</span>
        </q-btn>
    </q-page>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { Product } from '../types'
    import DialogFormAdd from 'components/forms/dialog-form-add.vue'
    import ProductList from 'components/product-list/product-list.vue'
    import SharedUsers from 'components/shared-users/shared-users.vue'
    import { productService } from 'src/firebase'

    export default defineComponent({
        name: 'Products',
        components: {
            DialogFormAdd,
            ProductList,
            SharedUsers
        },
        setup() {
            const route = useRoute()
            const { push } = useRouter()
            const products = ref<Product[]>([])

            function subscribeOnProducts(id: string) {
                try {
                    productService.subscribeOnProducts(id, (data) => {
                        products.value = data
                    })
                } catch (e) {
                    push('/')
                }
            }

            subscribeOnProducts(route.params.id as string)
            watch(
                () => route.params,
                ({ id }) => {
                    subscribeOnProducts(id as string)
                }
            )

            const dialog = ref(false)
            const openDialog = () => (dialog.value = true)

            async function addProduct(title: string) {
                await productService.addProduct({
                    title,
                    checked: false
                })
            }

            async function updateProduct(product: Product) {
                await productService.updateProduct(product)
            }

            async function deleteProduct(productId: string) {
                await productService.deleteProduct(productId)
            }

            return {
                products,
                dialog,
                openDialog,
                deleteProduct,
                addProduct,
                updateProduct
            }
        }
    })
</script>

<style lang="scss">
    .add-button {
        position: fixed;
        bottom: 35px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
</style>
