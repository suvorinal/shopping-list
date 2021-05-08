<template>
    <shared-users-dialog
        v-model="dialog"
        @add-person="addPerson"
        :shared-users="users"
    />
    <q-item class="text-primary q-pt-md" v-ripple @click="openDialog" clickable>
        <q-item-section avatar>
            <q-icon name="person_add" />
        </q-item-section>
        <q-item-section>
            <div class="text-body1">{{ $t('add-user.add') }}</div>
        </q-item-section>
    </q-item>
    <q-separator />
</template>

<script lang="ts">
    import { defineComponent, ref, watch, onMounted } from 'vue'
    import SharedUsersDialog from './shared-users-dialog.vue'
    import { UserData } from 'src/firebase'
    import { sharedUsersService } from 'src/firebase/shared-users.service'
    import { useQuasar } from 'quasar'
    import { useI18n } from 'vue-i18n'

    export default defineComponent({
        name: 'shared-users',
        components: {
            SharedUsersDialog
        },
        props: {
            listId: {
                type: String,
                required: true
            }
        },
        setup(props) {
            const { notify } = useQuasar()
            const { t } = useI18n()

            const dialog = ref(false)
            const openDialog = () => (dialog.value = true)
            const users = ref<UserData[]>([])

            onMounted(async () => {
                users.value = await sharedUsersService.getListUsers(
                    props.listId
                )
            })

            watch(
                () => props.listId,
                async () => {
                    users.value = await sharedUsersService.getListUsers(
                        props.listId
                    )
                }
            )

            async function addPerson(email: string) {
                if (await sharedUsersService.addUser(props.listId, email))
                    notify({
                        message: t('add-user.success'),
                        type: 'positive',
                        timeout: 2500
                    })
                else
                    notify({
                        message: t('add-user.not-found'),
                        type: 'negative',
                        timeout: 2500
                    })
            }

            return {
                dialog,
                users,
                openDialog,
                addPerson
            }
        }
    })
</script>

<style scoped></style>
