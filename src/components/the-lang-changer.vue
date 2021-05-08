<template>
    <div class="v-lang-changer">
        <span class="v-lang-changer_text" @click="change('RU')">Русский</span>
        <span>&bull;</span>
        <span class="v-lang-changer_text" @click="change('EN')">English</span>
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

<style lang="scss">
    .v-lang-changer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 0;

        &_text {
            margin: 0 5px;
            font-size: 0.8rem;
            color: $grey;
        }
    }
</style>
