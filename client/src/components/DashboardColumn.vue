<script setup lang="ts">
import Draggable from 'vuedraggable';
import { ref } from 'vue';
import { Task, TaskStatus } from '../api/types.ts';
import DashboardColumnItem from './DashboardColumnItem.vue';
import { useBoardStore } from '../stores/useBoardStore.ts';

type DashboardColumnProps = { list: Array<Task>; status: Task['status']; group?: string }

const props = defineProps<DashboardColumnProps>();

const boardStore = useBoardStore();

const onRemoveItem = (data: any) => {
    console.log(`removed from ${props.status}`, data);
};

const onChangePosition = (data: any) => {
    console.log(`moved to ${props.status}`, data);
};

const onChangeStatus = (data: { element: any, newIndex: number, oldIndex: number }) => {
    const { element } = data;

    boardStore.updateTask({
        id: element.id,
        status: props.status,
    });
};

const onChange = (event: any) => {
    if (event.hasOwnProperty('removed')) {
        onRemoveItem(event.removed);
    }

    if (event.hasOwnProperty('added')) {
        onChangeStatus(event.added);
    }

    if (event.hasOwnProperty('moved')) {
        onChangePosition(event.moved);
    }
};

const statusMap = {
    [TaskStatus.ToDo]: 'To Do',
    [TaskStatus.InProgress]: 'In Progress',
    [TaskStatus.Done]: 'Done',
    [TaskStatus.Cancelled]: 'Cancelled',
};

const dragOptions = ref({
    animation: 100,
    group: props.group || 'dashboard',
    ghostClass: 'dashboard-column__item--ghost',
    dragClass: 'dashboard-column__item--drag',
});
</script>

<template>
    <div class="dashboard-container">
        <h1>{{ statusMap[props.status] }}</h1>

        <Draggable
            :list="list"
            @change="onChange"
            item-key="id"
            class="dashboard-column"
            v-bind="dragOptions"
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

    padding: 24px 12px;
    min-height: 90px;

    border-radius: var(--border-radius);
    background-color: var(--dark-color--lighter);

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

        margin: 12px 6px;
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