<script setup lang="ts">
import Icon from './UI/Icon.vue';
import { Priority, Task } from '../api/types.ts';
import { useModalStore } from '../stores/useModalStore.ts';
import { computed } from 'vue';
import { useBoardStore } from '../stores/useBoardStore.ts';
import Tag from './UI/Tag.vue';
import { TagVariant } from './types.ts';

type ItemProps = {
    item: Task
}
const props = defineProps<ItemProps>();
const item = computed(() => props.item);

const modalStore = useModalStore();
const boardStore = useBoardStore();

const calculateDeadline = (targetDate: string, deadline: number) => {
    let currentDate = new Date();
    let targetDateObj = new Date(targetDate);

    let timeDiff = targetDateObj.getTime() - currentDate.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays <= deadline;
};
const isDeadline = computed(() => calculateDeadline(props.item.due_date, 1));

const priorityMap = {
    [Priority.Low]: {
        variant: TagVariant.White,
        label: 'Low',
    },
    [Priority.Medium]: {
        variant: TagVariant.Orange,
        label: 'Medium',
    },
    [Priority.High]: {
        variant: TagVariant.Warning,
        label: 'High',
    },
};
const priority = computed(() => priorityMap[props.item.priority]);
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
            <Tag v-if="priority" :label="priority.label" :variant="priority.variant" />
            <div v-else>{{ props.item.priority }}</div>

            <div :class="isDeadline && 'item__common-info__date-warning'">
                <Icon v-if="isDeadline" name="AlertTriangle" size="16" color="var(--warning--color)" />
                <span>{{ item.due_date }}</span>
            </div>
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
    background-color: var(--sub-card--bg);
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
        margin-bottom: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        & span {
            font-weight: 500;
            margin-right: 12px;

            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    &__common-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        line-height: 1;
        text-transform: capitalize;

        & span {
            opacity: 0.8;
        }

        &__date-warning {
            display: flex;
            align-items: center;

            & .icon {
                color: var(--warning--color);
            }
        }
    }

    &__edit,
    &__delete {
        border-color: transparent;
        background-color: transparent;
        padding: 4px;
        opacity: 0.8;

        &:hover {
            opacity: 1;
        }
    }

    &__edit:hover {
        color: var(--primary-color);
    }

    &__delete:hover {
        color: var(--warning--color);
    }
}
</style>