<template>
    <q-dialog v-model="dialog">
        <q-card>
            <q-form @submit.prevent="onSubmit">
                <q-card-section>
                    <q-input
                        v-model="titleRef"
                        type="text"
                        :label="$t(label)"
                    />
                </q-card-section>
                <q-card-actions>
                    <q-btn @click="onDelete" type="button" color="red" flat>
                        {{ $t('delete') }}
                    </q-btn>
                    <q-space />
                    <q-btn type="submit" color="primary" flat>
                        {{ $t('change') }}
                    </q-btn>
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from 'vue'

    export default defineComponent({
        name: 'form-change',
        props: {
            title: String,
            label: String,
            modelValue: Boolean
        },
        emits: {
            'item-update': (value: string) => value,
            'item-delete': null,
            'update:modelValue': null
        },
        setup(props, { emit }) {
            const dialog = ref(false)
            const closeDialog = () => (dialog.value = false)

            const titleRef = ref(props.title || '')
            watch(props, () => (titleRef.value = props.title || ''))

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
                emit('item-update', titleRef.value)
                titleRef.value = ''
                closeDialog()
            }

            function onDelete() {
                emit('item-delete')
                closeDialog()
            }
            return {
                titleRef,
                dialog,
                onSubmit,
                onDelete
            }
        }
    })
</script>
