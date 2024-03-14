<script setup lang="ts">
import { NotificationProps, NotificationType } from '../../../stores/useNotificationStore.types.ts';
import { computed, onMounted } from 'vue';
import { NOTIFICATION_REMOVE_TIMEOUT, useNotificationStore } from '../../../stores/useNotificationStore.ts';
import Icon from '../Icon.vue';

const props = defineProps<{ item: NotificationProps }>();
const notificationStore = useNotificationStore();

const isErrorNotification = computed(() => props.item.type === NotificationType.Error)

onMounted(() => {
    setTimeout(
        () => notificationStore.closeNotification(props.item.key),
        NOTIFICATION_REMOVE_TIMEOUT,
    );
});
</script>

<template>
    <div
        class="notification-item"
        :class="isErrorNotification && 'notification-item--error'"
    >
        <button @click="notificationStore.closeNotification(item.key)" class="outline">
            <Icon name="X" size="18" />
        </button>

        <h3 v-if="item.status || item.title">{{ item.status }} {{ item.title }}</h3>
        <p>{{ item.message }}</p>
    </div>
</template>

<style scoped lang="scss">
.notification-item {
    position: relative;
    padding: 12px 12px 12px 24px;
    min-height: 38px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border-left: 4px solid var(--primary-color);

    background: var(--grey-color);
    border-radius: var(--border-radius);

    &--error {
        border-left: 4px solid var(--warning--color);
    }

    button {
        position: absolute;
        top: 12px;
        right: 12px;

        color: var(--white-color);
        border-color: var(--white-color);
        background-color: transparent;
        padding: 4px;
    }

    h3, p {
        margin: 0;

        width: 220px;
        word-break: break-word;
    }

    h3 {
        margin-bottom: 12px;
    }
}
</style>