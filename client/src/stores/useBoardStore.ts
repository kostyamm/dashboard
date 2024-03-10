import { defineStore } from 'pinia';
import { BoardState } from './useBoardStore.types.ts';
import { fetchApi } from '../api';
import { Task } from '../api/types.ts';

export const useBoardStore = defineStore('board-store', {
    state: (): BoardState => ({
        boards: {
            to_do: [],
            in_progress: [],
            done: [],
            cancelled: [],
        },
    }),
    actions: {
        async fetchBoard() {
            this.boards = await fetchApi('/board');
        },
        async createTask(body: Partial<Task>) {
            const data = await fetchApi('/board/task', {
                method: 'POST',
                body,
            });

            this.boards[data.status].unshift(data);
        },
        async updateTask(task: Partial<Task>) {
            const data = await fetchApi(`/board/task/${task.id}`, {
                method: 'PUT',
                body: task,
            });

            this.boards[data.status] = this.boards[data.status]
                .map((task) => {
                    if (task.id === data.id) return data;

                    return task;
                });
        },
        async deleteTask(id: string) {
            const data = await fetchApi(`/board/task/${id}`, { method: 'DELETE' });

            this.boards[data.status] = this.boards[data.status]
                .filter((task) => task.id !== data.id);
        },
    },
    getters: {
        isEmptyState({ boards }) {
            return !boards.to_do.length
                && !boards.in_progress.length
                && !boards.done.length
                && !boards.cancelled.length
        },
    },
});
