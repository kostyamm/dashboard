import { Task } from '../api/types.ts';

export type Board = {
    to_do: Array<Task>;
    in_progress: Array<Task>;
    done: Array<Task>;
    cancelled: Array<Task>;
}

export type BoardState = {
    boards: Board | null;
}
