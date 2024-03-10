<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import { useAuthStore } from '../../../stores/useAuthStore.ts';

const modalStore = useModalStore();
const authStore = useAuthStore();
const isDisabled = ref(false);

const form = reactive({ name: null });

const onSubmit = async () => {
    isDisabled.value = true;

    await authStore.login(toRaw(form))

    modalStore.closeModal();
    isDisabled.value = false;
};
</script>

<template>
    <div class="form">
        <label for="name">Name</label>
        <input v-model="form.name" id="name" />

        <div class="form__footer">
            <button :disabled="isDisabled" @click="onSubmit">Log in</button>
        </div>
    </div>
</template>
