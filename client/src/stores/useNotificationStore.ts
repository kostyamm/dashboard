import { defineStore } from 'pinia';
import { NotificationProps, NotificationState } from './useNotificationStore.types.ts';

const basicState: Array<NotificationProps> = [];

export const NOTIFICATION_REMOVE_TIMEOUT = 5 * 1000;
export const MAX_NOTIFICATION_ITEMS = 1;

export const useNotificationStore = defineStore('notification-store', {
    state: (): NotificationState => ({ notificationState: basicState }),
    actions: {
        openNotification(options: Omit<NotificationProps, 'key'>) {
            if (this.notificationState.length > MAX_NOTIFICATION_ITEMS) {
                this.closeLastNotification()
            }

            this.notificationState.unshift({
                key: Symbol(),
                ...options
            });
        },

        closeNotification(key: Symbol) {
            this.notificationState = this.notificationState.filter((item) => item.key !== key)
        },

        closeLastNotification() {
            this.notificationState = this.notificationState.filter((_, index, array) => {
                return index !== (array.length - 1);
            })
        },
    },
    getters: {},
});