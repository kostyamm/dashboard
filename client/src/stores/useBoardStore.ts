import { defineStore } from 'pinia';
import { Board, BoardState } from './useBoardStore.types.ts';
import { fetchApi } from '../api';
import { Task } from '../api/types.ts';

export const useBoardStore = defineStore('board-store', {
    state: (): BoardState => ({ boards: null }),
    actions: {
        updateState(data) {
            if (!data.length) return;

            this.boards = groupBoard(data);
        },
        async clearBoard() {
            await fetchApi('/board/clear');

            this.boards = null;
        },
        async initMockBoard() {
            const { data } = await fetchApi('/board/init_mock');

            this.updateState(data);
        },
        async fetchBoard() {
            const { data } = await fetchApi('/board');

            this.updateState(data);
        },
        async createTask(body: Partial<Task>) {
            const { data } = await fetchApi('/board/task', {
                method: 'POST',
                body,
            });

            this.updateState(data);
        },
        async updateTask(task: Partial<Task>) {
            const { data } = await fetchApi(`/board/task/${task.id}`, {
                method: 'PUT',
                body: task,
            });

            this.updateState(data);
        },
        async deleteTask(id: string) {
            const { data } = await fetchApi(`/board/task/${id}`, { method: 'DELETE' });

            this.updateState(data);
        },
        async changeTaskPosition(options: Pick<Task, 'id' | 'position' | 'status'>) {
            const { data } = await fetchApi(`/board/task/${options.id}/change_position`, {
                method: 'POST',
                body: options,
            });

            this.updateState(data);
        },
    },
    getters: {},
});

const groupBoard = (data: Array<Task>) => {
    return data.reduce((res, currentValue: Task) => {
        const tasksByStatus: Array<Task> = res[currentValue.status];
        res[currentValue.status] = [...tasksByStatus, currentValue];

        return res;

    }, {
        to_do: [],
        in_progress: [],
        done: [],
        cancelled: [],
    } as Board);
};