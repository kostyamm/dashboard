<script setup lang="ts">
import Draggable from 'vuedraggable';
import { computed, ref } from 'vue';
import { Task, TaskStatus } from '../api/types.ts';
import DashboardColumnItem from './DashboardColumnItem.vue';
import { useBoardStore } from '../stores/useBoardStore.ts';

const props = defineProps<{ list: Array<Task>; status: Task['status']; group?: string }>();
const sortedList = computed(() => props.list.sort((a, b) => {
    const difference = new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf();

    return difference < 0 ? 1 : -1;
}));

const listRef = ref(sortedList);

const boardStore = useBoardStore();

const onChangeStatus = (data: { element: any, newIndex: number, oldIndex: number }) => {
    const { element } = data;

    boardStore.updateTask({
        id: element.id,
        status: props.status,
    });
};

const onChange = (event: any) => {
    if (event.hasOwnProperty('added')) {
        onChangeStatus(event.added);
    }

    // if (event.hasOwnProperty('removed')) {
    //     console.log(`removed from ${props.status}`, event.removed);
    // }
    //
    // if (event.hasOwnProperty('moved')) {
    //     console.log(`moved to ${props.status}`, event.moved);
    // }
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
        <h1>{{ statusMap[props.status] }}</h1>

        <Draggable
            :list="listRef"
            :group="props.group || 'dashboard'"
            @change="onChange"
            item-key="id"
            animation="100"
            class="dashboard-column"
            ghostClass="dashboard-column__item--ghost"
            dragClass="dashboard-column__item--drag"
        >
            <template #item="{element}" class="dashboard-column">
                <DashboardColumnItem :item="element" />
            </template>
        </Draggable>
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

    padding: 20px 12px;
    min-height: 97px;

    border-radius: var(--border-radius);
    background-color: var(--card--bg);

    &:has(.dashboard-column__item--ghost):before {
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

    &__item--drag {
        opacity: 0.4;
        border: 1px dashed var(--white-color);
    }

    &__item--ghost {
        display: none;
        //background-color: var(--dark-color--lighter);
        //outline: 1px dashed var(--grey-color);
        //border-radius: var(--border-radius);
    }
}
</style>