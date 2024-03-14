<script setup lang="ts">
import { computed, ref } from 'vue';
import { Task, TaskStatus } from '../api/types.ts';
import { useBoardStore } from '../stores/useBoardStore.ts';
import DashboardColumnItem from './DashboardColumnItem.vue';

const boardStore = useBoardStore();

const props = defineProps<{ list: Array<Task>; status: Task['status']; group?: string }>();

const sortedList = computed(() => props.list.sort((a, b) => {
    const difference = new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf();

    return difference < 0 ? 1 : -1;
}));

const activeColumn = ref(false)
const toggleActive = () => activeColumn.value = !activeColumn.value

const onDragStart = (event: DragEvent, item: Task, index: number) => {
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) return;

    dataTransfer.dropEffect = 'move';
    const data = {
        item,
        index,
        oldStatus: props.status,
    };

    dataTransfer.setData('text/plain', JSON.stringify(data));
};

const onDrop = (event: DragEvent) => {
    toggleActive()

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) return;

    const { item, oldStatus } = JSON.parse(dataTransfer.getData('text/plain'));

    if (props.status === oldStatus) {
        return;
    }

    boardStore.updateTaskStatus({
        id: item.id,
        status: props.status,
    }, oldStatus);
};

const statusMap = {
    [TaskStatus.ToDo]: 'To Do',
    [TaskStatus.InProgress]: 'In Progress',
    [TaskStatus.Done]: 'Done',
    [TaskStatus.Cancelled]: 'Cancelled',
};
</script>

<template>
    <div class="dashboard-container">
        <h2>{{ statusMap[props.status] }}</h2>

        <div
            @drop.prevent="onDrop"
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            class="dashboard-column"
            :class="{ 'dashboard-column--active': activeColumn }"
        >
            <TransitionGroup name="list-vertical">
                <div
                    v-for="(item, index) in sortedList"
                    :key="item.id"
                    draggable="true"
                    @dragstart="onDragStart($event, item, index)"
                >
                    <DashboardColumnItem :item="item" />
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
    display: block;
    min-width: 264px;
    flex: 1;
}

.dashboard-column {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 16px;
    min-height: 103px;

    border-radius: var(--border-radius);
    background-color: var(--card--bg);

    &--active:before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        content: '+';
        font-weight: 400;
        font-size: 54px;
        z-index: 10;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: rgba(65, 184, 131, 0.6);
        border-radius: var(--border-radius);
    }
}
</style>