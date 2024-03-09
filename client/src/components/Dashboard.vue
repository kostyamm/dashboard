<script setup lang="ts">
import { ref } from 'vue';
import DashboardColumn from './DashboardColumn.vue';
import Icon from './UI/Icon.vue';
import { useModalStore } from '../stores/useModalStore.ts';
import { Priority, Task, TaskStatus } from '../api/types.ts';

const mockBacklogTasks: Array<Task> = [
    { id: 1, title: 'Title A', status: TaskStatus.ToDo, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 2, title: 'Title B', status: TaskStatus.ToDo, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 3, title: 'Title C', status: TaskStatus.ToDo, position: 3, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 4, title: 'Title D', status: TaskStatus.ToDo, position: 4, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
];
const mockInProgressTasks: Array<Task> = [
    { id: 5, title: 'Title E', status: TaskStatus.InProgress, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 6, title: 'Title F', status: TaskStatus.InProgress, position: 3, description: 'description', priority: Priority.Hight, due_date: '2024-03-14'  },
];
const mockCancelled: Array<Task> = [
    { id: 7, title: 'Title G', status: TaskStatus.Cancelled, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 8, title: 'Title H', status: TaskStatus.Cancelled, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 9, title: 'Title I', status: TaskStatus.Cancelled, position: 3, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
];
const mockDoneTasks: Array<Task> = [
    { id: 10, title: 'Title J', status: TaskStatus.Done, position: 1, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 11, title: 'Title K', status: TaskStatus.Done, position: 2, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 12, title: 'Title L', status: TaskStatus.Done, position: 3, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 13, title: 'Title M', status: TaskStatus.Done, position: 4, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
    { id: 14, title: 'Title N', status: TaskStatus.Done, position: 5, description: 'description', priority: Priority.Hight, due_date: '2024-03-14' },
];

const tasksBacklog = ref(mockBacklogTasks);
const tasksInProgress = ref(mockInProgressTasks);
const tasksCancelled = ref(mockCancelled);
const tasksDone = ref(mockDoneTasks);

const modalStore = useModalStore();
</script>

<template>
    <div class="container">
        <button @click="modalStore.openTaskModal()">
            <Icon name="Plus" />
            Add task
        </button>
        <div class="dashboard">
            <DashboardColumn v-model="tasksBacklog" status="to_do" />
            <DashboardColumn v-model="tasksInProgress" status="in_progress" />
            <DashboardColumn v-model="tasksDone" status="done" />
            <DashboardColumn v-model="tasksCancelled" status="cancelled" />
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 24px 0;
}

.dashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}
</style>
