<template>
    <dialog-form-add v-model="dialog" label="list-name" @add="addList" />
    <div class="column q-pb-xl">
        <div class="text-h5 q-py-md q-pl-sm">{{ $t('your-lists') }}</div>
        <shopping-lists-group
            :shopping-lists="lists"
            @list-update="onListUpdate"
            @list-delete="onListDelete"
        />
        <q-btn
            @click="openAddForm"
            flat
            color="primary"
            class="full-width q-py-md"
        >
            {{ $t('create-list') }}
        </q-btn>
        <q-separator />
        <div class="text-h5 q-py-md q-pl-sm">{{ $t('shared-lists') }}</div>
        <shopping-lists-group :shopping-lists="sharedLists" />
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import ShoppingListsGroup from './shopping-lists-group.vue'
    import DialogFormAdd from '../forms/dialog-form-add.vue'
    import { ShoppingList } from 'src/types'
    import { shoppingListsService } from 'src/firebase'

    export default defineComponent({
        name: 'shopping-lists',
        components: {
            ShoppingListsGroup,
            DialogFormAdd
        },
        setup() {
            const lists = ref<ShoppingList[]>([])
            const sharedLists = ref<ShoppingList[]>([])

            shoppingListsService.subscribeToShoppingLists((shoppingLists) => {
                lists.value = shoppingLists
            })

            shoppingListsService.subscribeToSharedShoppingLists((lists) => {
                sharedLists.value = lists
            })

            const dialog = ref(false)
            const openAddForm = () => (dialog.value = true)

            function addList(title: string) {
                shoppingListsService.addList({ title })
            }

            function onListDelete(listId: string) {
                shoppingListsService.deleteList(listId)
            }

            function onListUpdate(list: ShoppingList) {
                shoppingListsService.updateList(list)
            }

            return {
                lists,
                sharedLists,
                openAddForm,
                dialog,
                addList,
                onListDelete,
                onListUpdate
            }
        }
    })
</script>

<style lang="scss" scoped></style>
