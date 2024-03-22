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
curl 'https://qa-board-back.onrender.com/api/board/task/65f308bdfed7fde5d5521ff2' \\
  -H 'accept: application/json' \\
  -H 'content-type: application/json' \\
  -H 'authorization: YOUR_TOKEN'
`
    },
    {
        curlMethod: 'POST',
        curl: `
curl 'https://qa-board-back.onrender.com/api/board/task' \\
  -H 'accept: application/json' \\
  -H 'content-type: application/json' \\
  -H 'authorization: YOUR_TOKEN' \\
  --data-raw '{"title":"12","description":"12","priority":"low","due_date":"2024-03-23"}'
`
    },
    {
        curlMethod: 'PUT',
        curl: `
curl 'https://qa-board-back.onrender.com/api/board/task/65fd47973d976deed7cb9cc0' \\
  -X 'PUT' \\
  -H 'accept: application/json' \\
  -H 'content-type: application/json' \\
  -H 'authorization: YOUR_TOKEN' \\
  --data-raw '{"title":"1","description":"12","status":"to_do","priority":"low","due_date":"2024-03-23","id":"65fd47973d976deed7cb9cc0"}'
`
    },
    {
        curlMethod: 'DELETE',
        curl: `
curl 'https://qa-board-back.onrender.com/api/board/task/65f308bdfed7fde5d5521ff2' \\
  -X 'DELETE' \\
  -H 'accept: application/json' \\
  -H 'content-type: application/json' \\
  -H 'authorization: YOUR_TOKEN'
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
    padding: 24px 24px 24px 0;

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
