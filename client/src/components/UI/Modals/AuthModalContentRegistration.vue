<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import { useAuthStore } from '../../../stores/useAuthStore.ts';
import { useYupValidate } from '../../../hooks/useYupValidate.ts';
import { registrationSchema, RegistrationSchema } from '../../../api/schemes/registrationSchema.ts';

defineProps<{ goToLoginForm: () => void }>();

const modalStore = useModalStore();
const authStore = useAuthStore();

const registrationForm = reactive({
    email: null,
    name: null,
    surname: null,
    password: null,
});

const { validateForm, errors, isValid } = useYupValidate<RegistrationSchema>(registrationSchema, registrationForm)

const onSubmit = async () => {
    await validateForm()

    if (!isValid.value) {
        return
    }

    const data = await authStore.registration(toRaw(registrationForm));

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
            <input v-model="registrationForm.email" id="email" />
            <span class="form__field__error">{{ errors.email }}</span>
        </div>

        <div class="form__field">
            <label for="name" class="required">Name</label>
            <input v-model="registrationForm.name" id="name" />
            <span class="form__field__error">{{ errors.name }}</span>
        </div>

        <div class="form__field">
            <label for="surname" class="required">Surname</label>
            <input v-model="registrationForm.surname" id="surname" />
            <span class="form__field__error">{{ errors.surname }}</span>
        </div>

        <div class="form__field">
            <label for="password" class="required">Password</label>
            <input v-model="registrationForm.password" id="password" type="password" />
            <span class="form__field__error">{{ errors.password }}</span>
        </div>

        <div class="form__footer">
            <div>
                Or <span @click="goToLoginForm" class="form__footer__link">log in now!</span>
            </div>
            <button type="submit">Sing up</button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.form__footer {
    justify-content: space-between;
}
</style>