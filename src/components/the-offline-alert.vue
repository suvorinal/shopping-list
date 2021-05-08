<template>
    <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
        <q-banner v-if="!isOnline" inline-actions class="text-white bg-red">
            {{ $t('lost-internet-connection') }}
            <template v-slot:action>
                <q-spinner size="3em" :thickness="2" />
            </template>
        </q-banner>
    </transition>
</template>

<script lang="ts">
    import { defineComponent, ref, onBeforeUnmount } from 'vue'

    export default defineComponent({
        name: 'offline-alert',
        setup() {
            const isOnline = ref(true)
            const setOffline = () => (isOnline.value = false)
            const setOnline = () => (isOnline.value = true)

            window.addEventListener('online', setOnline)
            window.addEventListener('offline', setOffline)

            onBeforeUnmount(() => {
                window.removeEventListener('online', setOnline)
                window.removeEventListener('offline', setOffline)
            })

            return {
                isOnline
            }
        }
    })
</script>

<style lang="scss"></style>
