<template>
    <div class="text-center">
        <span
            class="text-body2 text-grey cursor-pointer q-mx-xs"
            @click="change('RU')"
            >Русский</span
        >
        <span>&bull;</span>
        <span
            class="text-body2 text-grey cursor-pointer q-mx-xs"
            @click="change('EN')"
            >English</span
        >
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useQuasar } from 'quasar'

    export default defineComponent({
        name: 'v-lang-changer',
        setup() {
            const { locale } = useI18n()
            const { localStorage } = useQuasar()

            const storageLocale = localStorage.getItem('locale') as string
            if (storageLocale) locale.value = storageLocale

            function change(lang: string) {
                localStorage.set('locale', lang)
                locale.value = lang
            }

            return {
                change
            }
        }
    })
</script>

<style lang="scss"></style>
