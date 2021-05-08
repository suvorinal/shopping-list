<template>
    <q-item>
        <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
                <img v-if="user.avatar" alt="avatar" :src="user.avatar" />
                <div v-else>{{ userName }}</div>
            </q-avatar>
        </q-item-section>
        <q-item-section class="overflow-hidden">
            <h6 class="q-ma-none">{{ user.name }}</h6>
            <div class="text-body1 text-grey-13">{{ user.email }}</div>
        </q-item-section>
    </q-item>
</template>

<script lang="ts">
    import { computed, defineComponent } from 'vue'

    export default defineComponent({
        name: 'shared-users-user',
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            const userName = computed(() => {
                if (!props.user?.name) return ''
                const name = props.user.name.split(' ')
                return (
                    name[0][0].toUpperCase() + (name[1][0] || '').toUpperCase()
                )
            })

            return {
                userName
            }
        }
    })
</script>

<style scoped></style>
