<template>
    <q-dialog v-model="dialog">
        <q-card>
            <q-card-section>
                <div class="text-h5 q-mt-sm q-mb-xs">
                    {{ $t('confirm-exit.title') }}
                </div>
                <div class="text-caption text-grey">
                    {{ $t('confirm-exit.description') }}
                </div>
            </q-card-section>
            <q-card-actions>
                <q-btn color="primary" flat rounded @click="closeDialog">
                    {{ $t('cancel') }}
                </q-btn>
                <q-space />
                <q-btn color="red" flat rounded @click="logout">
                    {{ $t('exit') }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-icon v-if="!isAuth" style="font-size: 1.3rem" name="person" />
    <q-btn flat round v-else @click="openDialog">
        <q-avatar color="primary" text-color="white">
            <img v-if="userData.avatar" alt="avatar" :src="userData.avatar" />
            <div v-else>{{ userName }}</div>
        </q-avatar>
    </q-btn>
</template>

<script lang="ts">
    import { defineComponent, ref, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuth } from '../compositions/use-auth'
    import { authService } from '../firebase'

    export default defineComponent({
        name: 'the-profile',
        setup() {
            const { push } = useRouter()
            const { userData } = useAuth()

            const dialog = ref(false)
            const openDialog = () => (dialog.value = true)
            const closeDialog = () => (dialog.value = false)

            function logout() {
                authService.logout()
                push('/login')
            }

            const userName = computed(() => {
                if (!userData.value?.name) return ''
                const name = userData.value.name.split(' ')
                return (
                    name[0][0].toUpperCase() + (name[1][0] || '').toUpperCase()
                )
            })

            return {
                ...useAuth(),
                userName,
                dialog,
                openDialog,
                closeDialog,
                logout
            }
        }
    })
</script>

<style scoped></style>
