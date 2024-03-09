import { defineStore } from 'pinia';
import { BoardState } from './useBoardStore.types.ts';
import { fetchApi } from '../api';
import { Task } from '../api/types.ts';

export const useBoardStore = defineStore('board-store', {
    state: (): BoardState => ({ boards: null }),
    actions: {
        async clearBoard() {
            await fetchApi('/board/clear_board');

            this.boards = null;
        },
        async initMockBoard() {
            const { data } = await fetchApi('/board/init_mock_board');
            if (!data.length) return;

            this.boards = groupBoard(data);
        },
        async fetchBoard() {
            const { data } = await fetchApi('/board');
            if (!data.length) return;

            this.boards = groupBoard(data);
        },
    },
    getters: {},
});

const basicState = {
    to_do: null,
    in_progress: null,
    done: null,
    cancelled: null,
};

const groupBoard = (data: Array<Task>) => {
    return data.reduce((res, currentValue) => {
        const tasksByStatus = res[currentValue.status] || [];
        res[currentValue.status] = [...tasksByStatus, currentValue];

        return res;
    }, { ...basicState });
};