<template>
    <q-dialog v-model="dialog">
        <q-card>
            <q-card-section>
                <h4 class="q-ma-none text-center">{{ $t('share-list') }}</h4>
            </q-card-section>
            <q-form>
                <q-card-section class="items-center">
                    <q-input
                        v-model="email"
                        type="email"
                        :rules="rules"
                        label="Email"
                        no-error-icon
                        ref="emailRef"
                    >
                        <template v-slot:after>
                            <q-btn
                                @click="onSubmit"
                                type="submit"
                                flat
                                round
                                dense
                                icon="person_add"
                            />
                        </template>
                    </q-input>
                </q-card-section>
            </q-form>
            <q-card-section>
                <div class="text-h6">{{ $t('people-with-access') }}</div>
                <q-item-section>
                    <q-list v-if="sharedUsers.length" class="full-width">
                        <shared-users-user
                            v-for="(sharedUser, key) in sharedUsers"
                            :user="sharedUser"
                            :key="key"
                        />
                    </q-list>
                </q-item-section>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from 'vue'
    import SharedUsersUser from './shared-users-user.vue'
    import { useI18n } from 'vue-i18n'

    export default defineComponent({
        name: 'shared-users',
        components: {
            SharedUsersUser
        },
        props: {
            modelValue: Boolean,
            sharedUsers: {
                type: Array,
                default: () => []
            }
        },
        emits: {
            'update:modelValue': null,
            'add-person': (email: string) => typeof email === 'string'
        },
        setup(props, { emit }) {
            const { t } = useI18n()
            const dialog = ref(false)
            const email = ref('')
            const emailRef = ref()

            watch(
                () => props.modelValue,
                (v) => {
                    dialog.value = v
                }
            )

            watch(dialog, () => {
                emit('update:modelValue', dialog.value)
            })

            function onSubmit() {
                if (emailRef.value) emailRef.value.validate()
                if (!emailRef.value.hasError) emit('add-person', email.value)
            }

            const rules = [
                (v: string) => (v && v.length) || t('required-field'),
                (v: string) =>
                    (v &&
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                            v
                        )) ||
                    t('enter-valid-email')
            ]

            return {
                dialog,
                email,
                emailRef,
                onSubmit,
                rules
            }
        }
    })
</script>

<style scoped></style>
