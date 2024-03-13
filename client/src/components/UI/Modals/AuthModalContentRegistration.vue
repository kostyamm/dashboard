<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import { useAuthStore } from '../../../stores/useAuthStore.ts';

defineProps<{ goToLoginForm: () => void }>()

const modalStore = useModalStore();
const authStore = useAuthStore();

const form = reactive({
    email: null,
    name: null,
    surname: null,
    password: null,
});

const onSubmit = async () => {
    const data = await authStore.registration(toRaw(form));

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
            <label for="name">Name</label>
            <input v-model="form.name" id="name" />
        </div>

        <div class="form__field">
            <label for="surname">Surname</label>
            <input v-model="form.surname" id="surname" />
        </div>

        <div class="form__field">
            <label for="password">Password</label>
            <input v-model="form.password" id="password" />
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