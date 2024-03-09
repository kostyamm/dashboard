<script setup lang="ts">
import Icon from './UI/Icon.vue';
import { Task } from '../api/types.ts';
import { useModalStore } from '../stores/useModalStore.ts';
import { computed } from 'vue';
import { useBoardStore } from '../stores/useBoardStore.ts';

type ItemProps = {
    item: Task
}
const props = defineProps<ItemProps>();
const item = computed(() => props.item);

const modalStore = useModalStore();
const boardStore = useBoardStore();
</script>

<template>
    <div class="item">
        <div class="item__title">
            <Icon name="GripVertical" size="28" class="icon-grip" />
            <span>
                {{ item.title }}
            </span>
            <button @click="modalStore.openTaskModal(item)" class="outline item__edit">
                <Icon name="Pencil" size="18" />
            </button>
            <button @click="boardStore.deleteTask(item.id)" class="outline item__delete">
                <Icon name="Trash2" size="18" />
            </button>
        </div>

        <div class="item__common-info">
            <div>Priority: {{ item.priority }}</div>
            <div>Due date: {{ item.due_date }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.icon-grip {
    opacity: 0.6;
    padding: 0;
    margin-left: -4px;
}

.item {
    padding: 12px;
    background-color: var(--grey-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 1px solid transparent;
    transition: border 100ms ease-out;

    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        & span {
            font-weight: 600;
            width: 100%;
        }
    }

    &__common-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 12px;
        font-size: 12px;
        line-height: 1;
        text-transform: capitalize;
    }

    &__edit,
    &__delete {
        border: none;
        padding: 4px;

        &:hover {
            opacity: 0.8;
        }
    }

    &__edit {
        color: var(--primary-color);
    }

    &__delete {
        color: var(--warning--color);
    }

    &:hover {
        opacity: 0.8;
    }
}
</style>