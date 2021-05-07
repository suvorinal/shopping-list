<template>
    <label>
        <input
            type="checkbox"
            hidden
            :checked="modelValue"
            @input="$emit('update:modelValue', !modelValue)"
        />
        <span>
            <svg width="12px" height="9px" viewbox="0 0 12 9">
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
    label {
        cursor: pointer;
    }

    span {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid $color-grey;
        transition: all 0.2s ease;

        &:hover {
            border-color: $color-primary;
        }
    }

    svg {
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

    input:checked + span {
        border-color: $color-primary;
        background: $color-primary;
        animation: check 0.6s ease;

        svg {
            stroke-dashoffset: 0;
        }
    }

    @keyframes check {
        50% {
            transform: scale(1.2);
        }
    }
</style>
