export enum Priority {
    Low = 'low',
    Medium = 'medium',
    Hight = 'hight'
}

export enum TaskStatus {
    ToDo = 'to_do',
    InProgress = 'in_progress',
    Done = 'done',
    Cancelled = 'cancelled',
}

export type Task = {
    id: string;
    status: TaskStatus;
    title: string;
    description: string;
    priority: Priority;
    due_date: string;
}