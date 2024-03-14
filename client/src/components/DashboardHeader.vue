<script setup lang="ts">
import Icon from './UI/Icon.vue';

import { useModalStore } from '../stores/useModalStore.ts';
import { useAuthStore } from '../stores/useAuthStore.ts';
import { useNotificationStore } from '../stores/useNotificationStore.ts';

const modalStore = useModalStore();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const onCopy = () => {
    const token = authStore.authState.token || ''

    navigator.clipboard.writeText(token);

    notificationStore.openNotification({ message: 'Token has been copied' })
}
</script>

<template>
    <div class="header">
        <button @click="modalStore.openTaskModal()">
            <Icon name="Plus" />
            Add task
        </button>

        <div v-if="authStore.isAuth" class="header__menu">
            <div class="header__menu__user">
                <Icon name="CircleUserRound" size="28" :stroke-width="1.2" />

                <div class="header__menu__user__data">
                    <strong>{{ authStore.authState.email }}</strong>
                    <span>{{ authStore.userName }}</span>
                </div>
            </div>
            <button @click="onCopy" class="outline header__menu__token">
                <Icon name="Copy" />
                <span>Copy token {{ authStore.authState.token }}</span>
            </button>
            <button @click="authStore.logout" class="outline">
                <Icon name="LogOut" />
                Log out
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;

    &__menu {
        display: flex;
        align-items: center;
        gap: 12px;

        &__token {
            max-width: 200px;
        }

        &__user {
            display: flex;
            align-items: center;

            &__data {
                display: flex;
                flex-direction: column;
                gap: 4px;

                strong, span {
                    white-space: nowrap;
                    width: 140px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                strong {
                    font-size: 16px;
                    line-height: 16px;
                }

                span {
                    font-size: 12px;
                    line-height: 12px;
                }
            }

            .icon {
                padding-right: 6px;
                color: var(--primary-color);
            }
        }
    }
}
</style>
