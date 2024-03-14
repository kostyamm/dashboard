<script setup lang="ts">
import { useBoardStore } from '../stores/useBoardStore.ts';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import DashboardColumn from './DashboardColumn.vue';
import DashboardHeader from './DashboardHeader.vue';
import DashboardLoader from './DashboardLoader.vue';
import { TaskStatus } from '../api/types.ts';

const boardStore = useBoardStore();
const { boards, isEmptyState } = storeToRefs(boardStore);

onMounted(() => boardStore.fetchBoard());
</script>

<template>
    <div class="container">
        <DashboardHeader />

        <Transition name="fade" mode="out-in">
            <div v-if="!isEmptyState" class="dashboard">
                <DashboardColumn :list="boards.to_do" :status="TaskStatus.ToDo" />
                <DashboardColumn :list="boards.in_progress" :status="TaskStatus.InProgress" />
                <DashboardColumn :list="boards.done" :status="TaskStatus.Done" />
                <DashboardColumn :list="boards.cancelled" :status="TaskStatus.Cancelled" />
            </div>
            <DashboardLoader v-else />
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.dashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}
</style>
