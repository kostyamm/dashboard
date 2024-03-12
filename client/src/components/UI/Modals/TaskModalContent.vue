<script setup lang="ts">
import { useModalStore } from '../../../stores/useModalStore';
import { reactive, toRaw } from 'vue';
import { Priority } from '../../../api/types.ts';
import { useBoardStore } from '../../../stores/useBoardStore.ts';

const modalStore = useModalStore();
const boardStore = useBoardStore();

const props = defineProps(['id', 'status', 'title', 'description', 'priority', 'due_date']);
const form = reactive(toRaw(props));

const performSetForm = async () => {
    if (props.id) {
        return await boardStore.updateTask(toRaw(form));
    }

    return await boardStore.createTask(toRaw(form));
};

const onSubmit = async () => {
    const data = await performSetForm();

    if (data.error) {
        return;
    }

    modalStore.closeModal();
};
</script>

<template>
    <div class="form">
        <div class="form__field">
            <label for="title">Title</label>
            <input v-model="form.title" id="title">
        </div>

        <div class="form__field">
            <label for="description">Description</label>
            <textarea v-model="form.description" id="description" rows="4" />
        </div>

        <div class="form__field">
            <label for="priority">Priority</label>
            <select v-model="form.priority" id="priority" name="priority">
                <option disabled value="">Please select one</option>
                <option>{{ Priority.Low }}</option>
                <option>{{ Priority.Medium }}</option>
                <option>{{ Priority.Hight }}</option>
            </select>
        </div>

        <div class="form__field">
            <label for="due_date">Due date</label>
            <input v-model="form.due_date" type="date" id="due_date" />
        </div>

        <div class="form__footer">
            <button @click="onSubmit">Submit</button>
            <button class="outline" @click="modalStore.closeModal">Close</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form {
    & textarea {
        resize: none;
    }

    & select {
        text-transform: capitalize;
    }
}
</style>
