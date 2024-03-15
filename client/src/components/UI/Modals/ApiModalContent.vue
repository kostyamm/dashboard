<script setup lang="ts">
import Icon from '../Icon.vue';
import { useAuthStore } from '../../../stores/useAuthStore.ts';
import { useNotificationStore } from '../../../stores/useNotificationStore.ts';
import ApiModalContentCurl from './ApiModalContentCurl.vue';

const authStore = useAuthStore()
const notificationStore = useNotificationStore();

const curls = [
    {
        curlMethod: 'GET',
        curl: `
curl --location --request GET 'http://localhost:8000/api/board/task/65f1836e7919ae36db5cd8cd' \\
    --header 'authorization: YOUR_TOKEN'
`
    },
    {
        curlMethod: 'POST',
        curl: `
curl --location 'http://localhost:8000/api/board/task/' \\
    --header 'Accept: application/json' \\
    --header 'Content-Type: application/json' \\
    --header 'authorization: YOUR_TOKEN' \\
    --data '{
        "title": "test_title",
        "status": "to_do",
        "priority": "medium",
        "due_date": "2024-03-16"
    }'
`
    },
    {
        curlMethod: 'PUT',
        curl: `
curl --location --request PUT 'http://localhost:8000/api/board/task/65f407a66f4509d1baf4b30d' \\
    --header 'Accept: application/json' \\
    --header 'Content-Type: application/json' \\
    --header 'authorization: YOUR_TOKEN' \\
    --data '{
        "title": "test_123"
    }'
`
    },
    {
        curlMethod: 'DELETE',
        curl: `
curl --location --request DELETE 'http://localhost:8000/api/board/task/65f1836e7919ae36db5cd8cd' \\
    --header 'authorization: YOUR_TOKEN'
`
    }
]

const onCopy = () => {
    const token = authStore.authState.token || ''

    navigator.clipboard.writeText(token);

    notificationStore.openNotification({ message: 'Token has been copied' })
}
</script>

<template>
    <div class="at-content">
        <div class="at-content__token">
            <label>Your token</label>
            <input :value="authStore.authState.token" disabled/>
            <button @click="onCopy" class="outline">
                <Icon name="Copy" />
            </button>
        </div>

        <ApiModalContentCurl
            v-for="(curlItem, index) in curls"
            :key="index"
            :curlMethod="curlItem.curlMethod"
            :curl="curlItem.curl"
        />
    </div>
</template>

<style lang="scss" scoped>
.at-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    padding-right: 24px;

    &__token {
        display: flex;
        align-items: center;
        gap: 12px;

        label {
            display: flex;
            align-items: center;
            white-space: nowrap;
            margin: 0;
        }

        & input{
            width: 100%;
        }
    }
}
</style>
