<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import { useAuthStore } from '../../../stores/useAuthStore.ts';

const modalStore = useModalStore();
const authStore = useAuthStore();

const form = reactive({ name: null });

const onSubmit = async () => {
    const data = await authStore.login(toRaw(form));

    if (data.error) {
        return;
    }

    modalStore.closeModal();
};
</script>

<template>
    <div class="form">
        <div class="form__field">
            <label for="name">Name</label>
            <input v-model="form.name" id="name" />
        </div>

        <div class="form__footer">
            <button @click="onSubmit">Log in</button>
        </div>
    </div>
</template>
