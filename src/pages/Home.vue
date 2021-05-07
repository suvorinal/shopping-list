<template>
    <q-page class="home">
        <div class="q-px-xl full-width text-center absolute-center">
            <h2 class="q-my-md">{{ $t('no-list-selected.title') }}</h2>
            <div class="text-grey text-body1">
                {{ $t('no-list-selected.description') }}
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'Home',
        setup() {
            return {}
        }
    })
</script>

<style lang="scss"></style>
