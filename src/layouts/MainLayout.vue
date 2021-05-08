<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <the-app-bar @open-drawer="toggleLeftDrawer" />
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            class="bg-grey-1 no-wrap column"
        >
            <q-scroll-area class="fit">
                <shopping-lists />
            </q-scroll-area>
            <the-lang-changer />
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
        <q-footer>
            <the-offline-alert />
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import TheLangChanger from 'components/the-lang-changer.vue'
    import TheAppBar from 'components/the-app-bar.vue'
    import ShoppingLists from 'components/shopping-lists/shopping-lists.vue'
    import TheOfflineAlert from 'components/the-offline-alert.vue'

    export default defineComponent({
        name: 'MainLayout',
        components: {
            TheLangChanger,
            ShoppingLists,
            TheAppBar,
            TheOfflineAlert
        },
        setup() {
            const leftDrawerOpen = ref(false)

            return {
                leftDrawerOpen,
                toggleLeftDrawer() {
                    leftDrawerOpen.value = !leftDrawerOpen.value
                }
            }
        }
    })
</script>
