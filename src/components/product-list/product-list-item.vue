<template>
    <q-item @click.stop="onClick" clickable v-ripple>
        <q-item-section>
            <div
                class="product-list-item_title"
                :class="{ 'product-list-item_title__checked': isChecked }"
            >
                <span class="product-list-item_title-span text-h6">
                    {{ product.title }}
                </span>
            </div>
        </q-item-section>
        <q-item-section side>
            <v-checkbox v-model="isChecked" @click.stop />
        </q-item-section>
    </q-item>
</template>

<script lang="ts">
    import { defineComponent, ref, watch, PropType } from 'vue'
    import { Product } from 'src/types'
    import VCheckbox from 'components/ui/v-checkbox.vue'

    export default defineComponent({
        name: 'todo-list-item',
        components: {
            VCheckbox
        },
        props: {
            product: {
                type: Object as PropType<Product>,
                required: true
            }
        },
        emits: {
            'product-click': (value: Product) => value,
            'product-check': (value: Product) => value
        },
        setup(props, { emit }) {
            const isChecked = ref(props.product.checked)
            watch(isChecked, () => {
                emit('product-check', props.product)
            })

            function onClick() {
                emit('product-click', props.product)
            }

            return {
                isChecked,
                onClick
            }
        }
    })
</script>

<style lang="scss" scoped>
    .product-list-item {
        &_title {
            transition: 0.3s ease-out all;
            position: relative;
            width: fit-content;

            &__checked {
                .product-list-item_title-span:before {
                    width: 100%;
                }

                .product-list-item_title-span {
                    opacity: 0.5;
                }
            }
        }

        &_title-span {
            transition: 0.3s ease-out all;

            &:before {
                background-color: black;
                position: absolute;
                bottom: 47%;
                display: block;
                content: '';
                height: 1px;
                width: 0;
                transition: width 0.2s ease-in-out;
            }
        }
    }
</style>
