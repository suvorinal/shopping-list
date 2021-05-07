<template>
    <q-dialog v-model="dialog">
        <q-card>
            <q-form @submit.prevent="onSubmit">
                <q-card-section>
                    <q-input v-model="input" type="text" :label="$t(label)" />
                </q-card-section>
                <q-card-actions>
                    <q-space />
                    <q-btn type="submit" color="primary" flat>
                        {{ $t('add') }}
                    </q-btn>
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from 'vue'

    export default defineComponent({
        name: 'form-add',
        props: {
            label: String,
            modelValue: Boolean
        },
        emits: {
            add: (value: string) => value,
            'update:modelValue': null
        },
        setup(props, { emit }) {
            const input = ref('')
            const dialog = ref(false)

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
                emit('add', input.value)
                input.value = ''
                dialog.value = false
            }
            return {
                input,
                dialog,
                onSubmit
            }
        }
    })
</script>
