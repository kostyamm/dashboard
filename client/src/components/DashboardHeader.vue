<script setup lang="ts">
import Icon from './UI/Icon.vue';

import { useModalStore } from '../stores/useModalStore.ts';
import { useBoardStore } from '../stores/useBoardStore.ts';

const modalStore = useModalStore();
const boardStore = useBoardStore()
</script>

<template>
    <div class="header">
        <button @click="modalStore.openTaskModal()">
            <Icon name="Plus" />
            Add task
        </button>

        <div class="header__actions">
            <button @click="boardStore.initMockBoard" class="outline">
                <Icon name="ListRestart" />
                Init Board
            </button>
            <button @click="boardStore.clearBoard" class="outline">
                <Icon name="ListX" />
                Clear Board
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    &__actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }
}
</style>
