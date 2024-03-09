<script setup lang="ts">
import { useModalStore } from '../../../stores/useModalStore';
import { reactive, ref, toRaw } from 'vue';
import { Priority } from '../../../api/types.ts';
import { useBoardStore } from '../../../stores/useBoardStore.ts';

const modalStore = useModalStore();
const boardStore = useBoardStore();
const isDisabled = ref(false);

const props = defineProps(['id', 'status', 'position', 'title', 'description', 'priority', 'due_date']);
const form = reactive(toRaw(props));

const performSetForm = async () => {
    if (props.id) {
        await boardStore.updateTask(toRaw(form));
        return;
    }

    await boardStore.createTask(toRaw(form));
};
const onSubmit = async () => {
    isDisabled.value = true;

    await performSetForm();

    modalStore.closeModal();
    isDisabled.value = false;
};
</script>

<template>
    <div class="form">
        <label for="title">Title</label>
        <input v-model="form.title" id="title" />

        <label for="description">Description</label>
        <textarea v-model="form.description" id="description" rows="4" />

        <label for="priority">Priority</label>
        <select v-model="form.priority" id="priority" name="priority">
            <option disabled value="">Please select one</option>
            <option>{{ Priority.Low }}</option>
            <option>{{ Priority.Medium }}</option>
            <option>{{ Priority.Hight }}</option>
        </select>

        <label for="due_date">Due date</label>
        <input v-model="form.due_date" type="date" id="due_date" />

        <div class="form__footer">
            <button :disabled="isDisabled" @click="onSubmit">Submit</button>
            <button class="outline" @click="modalStore.closeModal">Close</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 16px;

    & textarea {
        resize: none;
    }

    & select {
        text-transform: capitalize;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
        margin-top: 16px;
    }
}
</style>
