<script setup lang="ts">
import { ref, watch } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';

import AuthModalContentLogin from './AuthModalContentLogin.vue';
import AuthModalContentRegistration from './AuthModalContentRegistration.vue';

const modalStore = useModalStore();
const isAuthForm = ref(true);

const goToLoginForm = () => isAuthForm.value = true;
const goToRegistrationForm = () => isAuthForm.value = false;

watch(() => isAuthForm.value, (value) => {
    if (value) {
        return modalStore.updateModalTitle('Authorization');
    }

    modalStore.updateModalTitle('Registration');
});
</script>

<template>
    <Transition name="form" mode="out-in">
        <AuthModalContentLogin v-if="isAuthForm" :goToRegistrationForm="goToRegistrationForm" />
        <AuthModalContentRegistration v-else :goToLoginForm="goToLoginForm" />
    </Transition>
</template>
