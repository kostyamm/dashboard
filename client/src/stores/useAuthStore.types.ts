export type Auth = {
    id: string | null;
    email: string | null;
    token: string | null;
    name: string | null;
    surname: string | null;
}

export type AuthState = {
    authState: Auth
}
