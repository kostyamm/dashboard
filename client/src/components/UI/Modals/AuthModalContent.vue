<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import { useAuthStore } from '../../../stores/useAuthStore.ts';

const modalStore = useModalStore();
const authStore = useAuthStore();
const isDisabled = ref(false);

const form = reactive({ userName: null });

const onSubmit = async () => {
    isDisabled.value = true;

    await authStore.auth()

    modalStore.closeModal();
    isDisabled.value = false;
};
</script>

<template>
    <div class="form">
        <label for="username">Username</label>
        <input v-model="form.userName" id="username" />

        <div class="form__footer">
            <button :disabled="isDisabled" @click="onSubmit">Submit</button>
        </div>
    </div>
</template>
