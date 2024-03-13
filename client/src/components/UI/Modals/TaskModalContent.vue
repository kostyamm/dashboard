<script setup lang="ts">
import { useModalStore } from '../../../stores/useModalStore';
import { reactive, toRaw } from 'vue';
import { Priority } from '../../../api/types.ts';
import { useBoardStore } from '../../../stores/useBoardStore.ts';
import { useYupValidate } from '../../../hooks/useYupValidate.ts';
import { taskSchema, TaskSchema } from '../../../api/schemes/taskSchema.ts';

const modalStore = useModalStore();
const boardStore = useBoardStore();

const props = defineProps(['id', 'status', 'title', 'description', 'priority', 'due_date']);
const taskForm = reactive(toRaw(props));

const { validateForm, errors, isValid } = useYupValidate<TaskSchema>(taskSchema, taskForm)

const performSetForm = async () => {
    if (props.id) {
        return await boardStore.updateTask(taskForm);
    }

    return await boardStore.createTask(taskForm);
};

const onSubmit = async () => {
    await validateForm()

    if (!isValid.value) {
        return
    }

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
            <input v-model="taskForm.title" id="title">
            <span class="form__field__error">{{ errors.title }}</span>
        </div>

        <div class="form__field">
            <label for="description">Description</label>
            <textarea v-model="taskForm.description" id="description" rows="4" />
            <span class="form__field__error">{{ errors.description }}</span>
        </div>

        <div class="form__field">
            <label for="priority">Priority</label>
            <select v-model="taskForm.priority" id="priority" name="priority">
                <option disabled value="">Please select one</option>
                <option>{{ Priority.Low }}</option>
                <option>{{ Priority.Medium }}</option>
                <option>{{ Priority.Hight }}</option>
            </select>
            <span class="form__field__error">{{ errors.priority }}</span>
        </div>

        <div class="form__field">
            <label for="due_date">Due date</label>
            <input v-model="taskForm.due_date" type="date" id="due_date" />
            <span class="form__field__error">{{ errors.due_date }}</span>
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
