<template>
    <q-layout>
        <q-header bordered class="bg-white">
            <div class="text-grey-14 row q-mx-sm items-center">
                <h5 class="q-ma-none">{{ $t('shopping-list') }}</h5>
                <q-space />
                <h6 class="q-ma-none text-grey text-weight-regular">
                    Sign in page
                </h6>
            </div>
        </q-header>
        <q-page-container>
            <q-page>
                <div class="absolute-center q-px-lg login-page_auth-wrapper">
                    <q-card class="q-py-lg" flat bordered>
                        <q-card-section>
                            <h5 class="text-center q-ma-none q-mb-sm">
                                {{ $t('sign-in-to-use') }}
                            </h5>
                            <p class="text-body2 text-grey-13 text-center">
                                {{ $t('choose-auth-method') }}
                            </p>
                        </q-card-section>
                        <q-card-actions id="login_firebase-ui" />
                    </q-card>
                </div>
            </q-page>
        </q-page-container>
        <q-footer class="bg-white">
            <the-lang-changer />
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from 'vue'
    import { FirebaseUIService } from '../firebase'
    import TheLangChanger from '../components/the-lang-changer.vue'

    export default defineComponent({
        name: 'login',
        components: {
            TheLangChanger
        },
        setup() {
            onMounted(() => {
                FirebaseUIService.start('login_firebase-ui')
            })
        }
    })
</script>

<style lang="scss" scoped>
    .login-page_auth-wrapper {
        width: 100%;
        max-width: 450px;
    }
</style>
