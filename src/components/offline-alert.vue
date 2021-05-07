<template>
    <transition name="offline-alert">
        <div v-show="!isOnline" class="offline-alert">
            <span>{{ $t('lost-internet-connection') }}</span>
        </div>
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

<style lang="scss">
    $height: 1.2rem;

    .offline-alert {
        text-align: center;
        padding: 2px 0;
        z-index: 1000;
        color: $color-text-white;
        background: $color-error;
        width: 100%;
        font-size: 1rem;
        font-weight: 500;
        height: $height;

        &-enter-active,
        &-leave-active {
            transition: 0.2s ease;
        }

        &-enter-from,
        &-leave-to {
            margin-top: -$height;
        }
    }
</style>
