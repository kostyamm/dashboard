<script setup lang="ts">
import Icon from './UI/Icon.vue';

import { useModalStore } from '../stores/useModalStore.ts';
import { useAuthStore } from '../stores/useAuthStore.ts';

const modalStore = useModalStore();
const authStore = useAuthStore();
</script>

<template>
    <div class="header">
        <button @click="modalStore.openTaskModal()">
            <Icon name="Plus" />
            Add task
        </button>

        <div v-if="authStore.isAuth" class="header__menu">
            <div class="header__menu__user">
                <Icon name="CircleUserRound" />
                {{ authStore.userName }}
            </div>
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
    margin-bottom: 24px;

    &__menu {
        display: flex;
        align-items: center;
        gap: 24px;

        &__user {
            display: flex;
            align-items: center;

            .icon {
                padding-right: 8px;
            }
        }
    }
}
</style>
