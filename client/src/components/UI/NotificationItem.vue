<script setup lang="ts">
import { NotificationProps } from '../../stores/useNotificationStore.types.ts';
import { onMounted } from 'vue';
import { NOTIFICATION_REMOVE_TIMEOUT, useNotificationStore } from '../../stores/useNotificationStore.ts';
import Icon from './Icon.vue';

const props = defineProps<{ item: NotificationProps }>();
const notificationStore = useNotificationStore();

onMounted(() => {
    setTimeout(
        () => notificationStore.closeNotification(props.item.key),
        NOTIFICATION_REMOVE_TIMEOUT,
    );
});
</script>

<template>
    <div class="notification-item">
        <div class="notification-item__title">
            <h3>{{ item.status }} {{ item.title }}</h3>
            <button @click="notificationStore.closeNotification(item.key)" class="outline">
                <Icon name="X" />
            </button>
        </div>
        <p>{{ item.message }}</p>
    </div>
</template>

<style scoped lang="scss">
.notification-item {
    padding: 12px 12px 12px 24px;

    background: var(--grey-color);
    border-radius: var(--border-radius);

    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;

        button {
            padding: 4px;
        }
    }

    h3, p {
        margin: 0;
    }
}
</style>