<script setup lang="ts">
import DashboardColumn from './DashboardColumn.vue';
import DashboardHeader from './DashboardHeader.vue';
import DashboardLoader from './DashboardLoader.vue';
import { useBoardStore } from '../stores/useBoardStore.ts';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const boardStore = useBoardStore();
const { boards } = storeToRefs(boardStore);

onMounted(() => boardStore.fetchBoard());
</script>

<template>
    <div class="container">
        <DashboardHeader />

        <Transition name="fade" mode="out-in">
            <div v-if="boards" class="dashboard">
                <DashboardColumn :list="boards.to_do" status="to_do" />
                <DashboardColumn :list="boards.in_progress" status="in_progress" />
                <DashboardColumn :list="boards.done" status="done" />
                <DashboardColumn :list="boards.cancelled" status="cancelled" />
            </div>
            <DashboardLoader v-else />
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.container {
    padding: 24px 0;
}

.dashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}
</style>
