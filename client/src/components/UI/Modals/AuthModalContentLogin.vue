<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import { useAuthStore } from '../../../stores/useAuthStore.ts';

defineProps<{ goToRegistrationForm: () => void }>()

const modalStore = useModalStore();
const authStore = useAuthStore();

const form = reactive({ email: null, password: null });

const onSubmit = async () => {
    const data = await authStore.login(toRaw(form));

    if (data.error) {
        return;
    }

    modalStore.closeModal();
};
</script>

<template>
    <form @submit.prevent="onSubmit" class="form">
        <div class="form__field">
            <label for="email">Email</label>
            <input v-model="form.email" id="email" />
        </div>

        <div class="form__field">
            <label for="password">Password</label>
            <input v-model="form.password" id="password" type="password" />
        </div>

        <div class="form__footer">
            <div>
                Or <span @click="goToRegistrationForm" class="form__footer__link">register now!</span>
            </div>
            <button type="submit">Log in</button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.form__footer {
    justify-content: space-between;
}
</style>
