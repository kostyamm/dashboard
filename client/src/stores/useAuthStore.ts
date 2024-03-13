import { defineStore } from 'pinia';
import { Auth, AuthState } from './useAuthStore.types.ts';
import { fetchApi } from '../api';
import { useModalStore } from './useModalStore.ts';
import { useBoardStore } from './useBoardStore.ts';

const basicState: Auth = {
    id: null,
    email: null,
    token: null,
    name: null,
    surname: null,
};

export const useAuthStore = defineStore('auth-store', {
    state: (): AuthState => ({ authState: basicState }),
    actions: {
        updateState(data: Auth) {
            if (!data) return;

            this.authState = data;
        },
        async login(loginForm) {
            const data = await fetchApi('/login', {
                method: 'POST',
                body: loginForm,
            });

            if (!data.error) {
                this.updateState(data);
                setToken(data.token);
            }

            return data
        },
        async registration(registrationForm) {
            const data = await fetchApi('/registration', {
                method: 'POST',
                body: registrationForm,
            });

            if (!data.error) {
                this.updateState(data);
                setToken(data.token);
            }

            return data
        },
        async verify() {
            const data = await fetchApi('/verify');

            this.updateState(data);
            setToken(data.token);
        },
        logout() {
            const modalStore = useModalStore()
            const boardStore = useBoardStore()

            boardStore.$reset()
            modalStore.openAuthModal()

            removeToken()

            this.authState = basicState
        }
    },
    getters: {
        isAuth({ authState }): boolean {
            return !!authState.token;
        },
        userName({ authState }): string | null {
            return `${authState.name} ${authState.surname}`
        }
    },
});

export const getToken = () => {
    try {
        return window.localStorage.getItem('token');
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const setToken = (token: string) => {
    try {
        return window.localStorage.setItem('token', token);
    } catch (e) {
        console.error(e);
    }
};

export const removeToken = () => {
    try {
        return window.localStorage.removeItem('token');
    } catch (e) {
        console.error(e);
    }
};