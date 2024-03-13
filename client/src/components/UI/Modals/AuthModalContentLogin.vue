<script setup lang="ts">
import { reactive } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import { useAuthStore } from '../../../stores/useAuthStore.ts';
import { useYupValidate } from '../../../hooks/useYupValidate.ts';
import { loginSchema, LoginSchema } from '../../../api/schemes/loginSchema.ts';

defineProps<{ goToRegistrationForm: () => void }>()

const modalStore = useModalStore();
const authStore = useAuthStore();

const loginForm = reactive({ email: null, password: null });

const { validateForm, errors, isValid } = useYupValidate<LoginSchema>(loginSchema, loginForm)

const onSubmit = async () => {
    await validateForm()

    if (!isValid.value) {
        return
    }

    const data = await authStore.login(loginForm);

    if (data.error) {
        return;
    }

    modalStore.closeModal();
};
</script>

<template>
    <form @submit.prevent="onSubmit" class="form">
        <div class="form__field">
            <label for="email" class="required">Email</label>
            <input v-model="loginForm.email" id="email" />
            <span class="form__field__error">{{ errors.email }}</span>
        </div>

        <div class="form__field">
            <label for="password" class="required">Password</label>
            <input v-model="loginForm.password" id="password" type="password" />
            <span class="form__field__error">{{ errors.password }}</span>
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
