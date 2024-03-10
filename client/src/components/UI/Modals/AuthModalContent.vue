<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import { useAuthStore } from '../../../stores/useAuthStore.ts';

const modalStore = useModalStore();
const authStore = useAuthStore();

const form = reactive({ name: null });

const onSubmit = async () => {
    await authStore.login(toRaw(form))

    modalStore.closeModal();
};
</script>

<template>
    <div class="form">
        <label for="name">Name</label>
        <input v-model="form.name" id="name" />

        <div class="form__footer">
            <button @click="onSubmit">Log in</button>
        </div>
    </div>
</template>
