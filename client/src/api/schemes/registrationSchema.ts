import { InferType, object, string } from 'yup';

export const registrationSchema = object({
    email: string().email().required(),
    name: string().required(),
    surname: string().nullable(),
    password: string().min(6).required(),
});

export type RegistrationSchema = InferType<typeof registrationSchema>
