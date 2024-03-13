<script setup lang="ts">
import { TagVariant } from '../types.ts';

defineProps<{ variant: TagVariant, label: string }>();
</script>

<template>
    <div class="tag" :class="variant">
        {{ label }}
    </div>
</template>

<style scoped lang="scss">
.tag {
    border-radius: var(--border-radius);
    background-color: var(--white-opacity--color);
    border: 1px solid var(--white-color);
    color: var(--white-color);
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 400;
    font-family: inherit;

    &--orange {
        background-color: var(--orange-opacity--color);
        border-color: var(--orange--color);
        color: var(--orange--color);
    }

    &--warning {
        background-color: var(--warning-opacity--color);
        border-color: var(--warning--color);
        color: var(--warning--color);
    }
}
</style>