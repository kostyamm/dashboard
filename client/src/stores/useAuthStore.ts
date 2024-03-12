import { defineStore } from 'pinia';
import { AuthState } from './useAuthStore.types.ts';
import { fetchApi } from '../api';
import { useModalStore } from './useModalStore.ts';
import { useBoardStore } from './useBoardStore.ts';

export const useAuthStore = defineStore('auth-store', {
    state: (): AuthState => ({ token: null, name: null }),
    actions: {
        updateState(data) {
            if (!data) return;

            const { token, name } = data
            this.token = token;
            this.name = name;
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

            this.name = null
            this.token = null
        }
    },
    getters: {
        isAuth(state): boolean {
            return !!state.token;
        },
        userName(state): string | null {
            return state.name
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