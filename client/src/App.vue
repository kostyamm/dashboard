<script setup lang="ts">
import Modal from './components/UI/Modals/Modal.vue';
import Dashboard from './components/Dashboard.vue';
import { onMounted } from 'vue';
import { useModalStore } from './stores/useModalStore.ts';
import { useAuthStore } from './stores/useAuthStore.ts';

const modalStore = useModalStore()
const authStore = useAuthStore()

onMounted(() => {
    if (authStore.isAuth) {
        return
    }

    modalStore.openAuthModal()
})
</script>

<template>
    <Dashboard />
    <Modal />
</template>
