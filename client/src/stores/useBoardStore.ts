import { defineStore } from 'pinia';
import { Board, BoardState } from './useBoardStore.types.ts';
import { fetchApi } from '../api';
import { Task } from '../api/types.ts';

export const useBoardStore = defineStore('board-store', {
    state: (): BoardState => ({ boards: null }),
    actions: {
        updateState(data) {
            if (!data.length) return;

            this.boards = groupBoard(data)
        },
        async clearBoard() {
            await fetchApi('/board/clear_board');

            this.boards = null;
        },
        async initMockBoard() {
            const { data } = await fetchApi('/board/init_mock_board');

            this.updateState(data)
        },
        async fetchBoard() {
            const { data } = await fetchApi('/board');

            this.updateState(data)
        },
        async createTask(body: Partial<Task>) {
            const { data } = await fetchApi('/board/create_task',{
                method: 'POST',
                body
            });

            this.updateState(data)
        },
        async updateTask(body: Partial<Task>) {
            const { data } = await fetchApi('/board/update_task',{
                method: 'POST',
                body
            });

            this.updateState(data)
        },
        async deleteTask(id: string | number) {
            const { data } = await fetchApi('/board/delete_task',{
                method: 'POST',
                body: { id }
            });

            this.updateState(data)
        },
        async changePosition(options: Pick<Task, 'id' | 'position' | 'status'>) {
            const { data } = await fetchApi('/board/change_position',{
                method: 'POST',
                body: options
            });

            this.updateState(data)
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