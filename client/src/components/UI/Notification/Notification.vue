<script setup lang="ts">
import { useNotificationStore } from '../../../stores/useNotificationStore.ts';
import { storeToRefs } from 'pinia';
import NotificationItem from './NotificationItem.vue';

const notificationStore = useNotificationStore();
const { notificationState } = storeToRefs(notificationStore);
</script>

<template>
    <Transition name="list">
        <div v-if="notificationState.length" class="notifications">
            <TransitionGroup name="list">
                <template
                    v-for="item in notificationState"
                    :key="item.key"
                >
                    <NotificationItem :item="item" />
                </template>
            </TransitionGroup>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
.notifications {
    position: fixed;
    right: 24px;
    top: 20px;
    z-index: 999;

    width: 100%;
    max-width: 320px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    h3 {
        margin: 0 0 12px;
    }

    p {
        margin: 0;
    }
}
</style>