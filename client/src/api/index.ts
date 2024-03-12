import { getToken } from '../stores/useAuthStore.ts';
import { useNotificationStore } from '../stores/useNotificationStore.ts';

export const fetchApi = async (path: string, options?: Omit<RequestInit, 'body'> & { body?: any }) => {
    const notificationStore = useNotificationStore()

    const url = `${import.meta.env.VITE_API_URL}${path}`;

    const fetchOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': getToken(),
        },
        ...getNormalizedOptions(options),
    };

    try {
        const result = await fetch(url, fetchOptions)
        const response = await result.json()

        if (response.error) {
            const { message, status, statusText } = response.error

            notificationStore.openNotification({
                title: statusText || 'Api Error',
                status,
                message,
            })
        }

        return response
    } catch (error: any) {
        throw new Error(error);
    }
};

const getNormalizedOptions = (options) => {
    if (!options) {
        return {}
    }

    const body = options.body ? JSON.stringify(options.body) : undefined

    return { ...options, body }
}