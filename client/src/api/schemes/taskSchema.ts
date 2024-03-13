import { InferType, object, string } from 'yup';

export const taskSchema = object({
    title: string().max(60).required(),
    description: string().max(200).required(),
    priority: string().required(),
    due_date: string().required(),
});

export type TaskSchema = InferType<typeof taskSchema>
