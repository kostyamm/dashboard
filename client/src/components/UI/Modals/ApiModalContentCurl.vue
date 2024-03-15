<script setup lang="ts">
import Icon from '../Icon.vue';
import Tag from '../Tag.vue';
import { TagVariant } from '../../types.ts';
import { useNotificationStore } from '../../../stores/useNotificationStore.ts';

const props = defineProps<{ curlMethod: string, curl: string }>()

const notificationStore = useNotificationStore()

const onCopy = () => {
    navigator.clipboard.writeText(props.curl);

    notificationStore.openNotification({ message: 'Curl has been copied' })
}
</script>

<template>
    <div class="curl-block">
        <div class="curl-block__title">
            <Tag :variant="TagVariant.White" :label="curlMethod"/>

            <button @click="onCopy" class="outline">
                <Icon name="Copy" />
            </button>
        </div>
        <pre>
            <code>{{ curl }}</code>
        </pre>
    </div>
</template>

<style lang="scss" scoped>
.curl-block {
    border-top: 1px solid var(--grey-color);
    padding-top: 12px;

    pre {
        overflow-x: auto;
        margin: 0;
    }

    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
