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

            if (!data.error) {
                this.boards[data.status].unshift(data);
            }

            return data
        },
        async updateTask(task: Partial<Task>) {
            const data = await fetchApi(`/board/task/${task.id}`, {
                method: 'PUT',
                body: task,
            });

            if (!data.error) {
                this.boards[data.status] = this.boards[data.status]
                    .map((task: Task) => {
                        if (task.id === data.id) return data;

                        return task;
                    });
            }

            return data
        },
        async updateTaskStatus(task: Pick<Task, 'id' | 'status'>, oldStatus: Task['status']) {
            const data = await fetchApi(`/board/task/${task.id}`, {
                method: 'PUT',
                body: task,
            });

            if (!data.error) {
                this.boards[oldStatus] = this.boards[oldStatus].filter((item: Task) => item.id !== data.id)
                this.boards[data.status].unshift(data)
            }

            return data
        },
        async deleteTask(id: string) {
            const data = await fetchApi(`/board/task/${id}`, { method: 'DELETE' });

            if (!data.error) {
                this.boards[data.status] = this.boards[data.status]
                    .filter((task) => task.id !== data.id);
            }

            return data
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
