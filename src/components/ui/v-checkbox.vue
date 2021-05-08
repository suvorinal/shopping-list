<template>
    <label class="v-checkbox">
        <input
            class="v-checkbox_input"
            type="checkbox"
            hidden
            :checked="modelValue"
            @input="$emit('update:modelValue', !modelValue)"
        />
        <span class="v-checkbox_span">
            <svg
                class="v-checkbox_svg"
                width="12px"
                height="9px"
                viewbox="0 0 12 9"
            >
                <polyline points="1 5 4 8 11 1"></polyline>
            </svg>
        </span>
    </label>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'v-checkbox',
        props: {
            modelValue: {
                type: Boolean,
                default: false
            }
        }
    })
</script>

<style lang="scss" scoped>
    .v-checkbox {
        cursor: pointer;

        &_span {
            display: inline-block;
            vertical-align: middle;
            position: relative;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid $grey;
            transition: all 0.2s ease;

            &:hover {
                border-color: $primary;
            }
        }

        &_svg {
            position: absolute;
            z-index: 1;
            top: 8px;
            left: 6px;
            fill: none;
            stroke: white;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 16px;
            stroke-dashoffset: 16px;
            transition: all 0.3s ease;
            transition-delay: 0.1s;
            transform: translate3d(0, 0, 0);
        }
    }

    .v-checkbox_input:checked + .v-checkbox_span {
        border-color: $primary;
        background: $primary;
        animation: check 0.6s ease;

        .v-checkbox_svg {
            stroke-dashoffset: 0;
        }
    }

    @keyframes check {
        50% {
            transform: scale(1.2);
        }
    }
</style>
