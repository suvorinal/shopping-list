<template>
    <q-toolbar class="bg-white text-black">
        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="openDrawer"
        />
        <q-toolbar-title @click="$root.$router.push('/')">
            {{ $t('shopping-list') }}
        </q-toolbar-title>
        <the-profile />
    </q-toolbar>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import TheProfile from './the-profile.vue'

    export default defineComponent({
        name: 'the-app-bar',
        components: {
            TheProfile
        },
        emits: {
            openDrawer: null
        },
        setup(_, { emit }) {
            const openDrawer = () => emit('openDrawer')
            return {
                openDrawer
            }
        }
    })
</script>

<style lang="scss" scoped></style>
