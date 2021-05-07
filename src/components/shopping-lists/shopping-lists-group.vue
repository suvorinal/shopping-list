<template>
    <dialog-form-change
        v-model="dialog"
        label="list-name"
        :title="currentListTitle"
        @item-update="onItemUpdate"
        @item-delete="onItemDelete"
    />
    <q-list v-if="shoppingLists.length">
        <q-item
            v-for="list in shoppingLists"
            :key="list.id"
            v-ripple
            active-class="text-primary bg-grey-3"
            :to="'/list/' + list.id"
        >
            <q-item-section class="column">
                <div class="text-h6">{{ list.title }}</div>
                <div class="text-subtitle2 text-grey">
                    {{ $tc('product', 2) }}
                </div>
            </q-item-section>
            <q-item-section side>
                <q-btn
                    icon="more_vert"
                    round
                    flat
                    type="button"
                    @click.stop.prevent="openDialog(list)"
                />
            </q-item-section>
        </q-item>
    </q-list>
    <div v-else>
        <div class="text-subtitle1 text-grey-13 text-center">
            {{ $t('no-available-lists') }}
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, PropType, computed } from 'vue'
    import { ShoppingList } from 'src/types'
    import DialogFormChange from '../forms/dialog-form-change.vue'

    export default defineComponent({
        name: 'shopping-lists-group',
        components: {
            DialogFormChange
        },
        props: {
            shoppingLists: {
                type: Object as PropType<ShoppingList[]>,
                required: true
            }
        },
        emits: {
            'list-delete': (id: string) => id,
            'list-update': (value: ShoppingList) => value
        },
        setup(_, { emit }) {
            const currentList = ref<ShoppingList>()
            const currentListTitle = computed(
                () => currentList.value?.title || ''
            )

            const dialog = ref(false)
            function openDialog(list: ShoppingList) {
                dialog.value = true
                currentList.value = list
            }

            function onItemDelete() {
                if (!currentList.value) return
                emit('list-delete', currentList.value.id)
            }

            function onItemUpdate(title: string) {
                if (!currentList.value) return
                const newList: ShoppingList = {
                    ...currentList.value,
                    title
                }
                emit('list-update', newList)
            }

            return {
                currentListTitle,
                currentList,
                dialog,
                openDialog,
                onItemDelete,
                onItemUpdate
            }
        }
    })
</script>
