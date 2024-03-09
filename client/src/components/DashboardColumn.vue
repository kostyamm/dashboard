<script setup lang="ts">
import Draggable from 'vuedraggable';
import { ref } from 'vue';
import { Task, TaskStatus } from '../api/types.ts';
import DashboardColumnItem from './DashboardColumnItem.vue';
import { useBoardStore } from '../stores/useBoardStore.ts';

const props = defineProps({
    list: { type: Array<Task> },
    status: { type: String, required: true },
    group: { type: String, default: 'dashboard' },
});

const boardStore = useBoardStore();

const onRemoveItem = (data: any) => {
    console.log(`removed from ${props.status}`, data);
};

const onChangeColumn = (data: any) => {
    console.log(`added to ${props.status}`, data);
};

const onChangePosition = (data: { element: any, newIndex: number, oldIndex: number }) => {
    const { element, newIndex } = data;

    boardStore.changePosition({
        id: element.id,
        status: element.status,
        position: newIndex,
    });
};

const onChange = (event: any) => {
    if (event.hasOwnProperty('removed')) {
        onRemoveItem(event.removed);
    }

    if (event.hasOwnProperty('added')) {
        onChangeColumn(event.added);
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
    group: props.group,
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
    padding: 24px 12px;
    background-color: var(--dark-color--lighter);
    border-radius: var(--border-radius);

    &__item--drag {
        opacity: 0.4;
        border: 1px dashed var(--white-color);
    }

    &__item--ghost {
        background-color: var(--dark-color--lighter);
        outline: 1px dashed var(--grey-color);
        border-radius: var(--border-radius);
    }
}
</style>