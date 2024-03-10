import { defineStore } from 'pinia';
import { AuthState } from './useAuthStore.types.ts';

export const useAuthStore = defineStore('auth-store', {
    state: (): AuthState => ({ token: null, userName: null }),
    actions: {
        async auth() {
            // auth method
            setToken('test_token')
        },
    },
    getters: {
        isAuth(): boolean {
            const token = getToken()
            return !!token
        }
    },
});

export const getToken = () => {
    try {
        return window.localStorage.getItem('token')
    } catch (e) {
        console.error(e);
        return null
    }
}

export const setToken = (token: string) => {
    try {
        return window.localStorage.setItem('token', token)
    } catch (e) {
        console.error(e);
    }
}