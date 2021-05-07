<template>
    <dialog-form-change
        v-model="dialog"
        :title="currentProductTitle"
        label="product-name"
        @item-update="onItemUpdate"
        @item-delete="onItemDelete"
    />
    <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
        <q-list v-if="products.length">
            <transition-group
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
            >
                <product-list-item
                    v-for="product in products"
                    :key="product.id"
                    class="shopping-list_item"
                    :product="product"
                    @product-check="checkProduct"
                    @product-click="onProductClick"
                />
            </transition-group>
        </q-list>
        <div v-else class="text-center absolute-center full-width">
            <div class="text-h4 q-mb-md">
                {{ $t('empty-list.title') }}
            </div>
            <div class="text-body1 text-grey q-px-xl">
                {{ $t('empty-list.description') }}
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent, ref, computed, PropType } from 'vue'
    import ProductListItem from './product-list-item.vue'
    import { Product } from 'src/types'
    import DialogFormChange from 'components/forms/dialog-form-change.vue'

    export default defineComponent({
        name: 'product-list',
        components: {
            ProductListItem,
            DialogFormChange
        },
        props: {
            products: {
                type: Object as PropType<Product[]>,
                required: true
            }
        },
        emits: {
            'product-delete': (id: string) => id,
            'product-update': (value: Product) => value
        },
        setup(_, { emit }) {
            const dialog = ref(false)
            const openDialog = () => (dialog.value = true)
            const currentProduct = ref<Product>()
            const currentProductTitle = computed(
                () => currentProduct.value?.title || ''
            )

            function onProductClick(product: Product) {
                currentProduct.value = product
                openDialog()
            }

            function onItemDelete() {
                if (!currentProduct.value) return
                emit('product-delete', currentProduct.value.id)
            }

            function onItemUpdate(title: string) {
                if (!currentProduct.value) return
                const product: Product = {
                    ...currentProduct.value,
                    title
                }
                emit('product-update', product)
            }

            function checkProduct(product: Product) {
                emit('product-update', {
                    ...product,
                    checked: !product.checked
                })
            }

            return {
                onProductClick,
                currentProductTitle,
                dialog,
                onItemUpdate,
                onItemDelete,
                checkProduct
            }
        }
    })
</script>

<style scoped></style>
