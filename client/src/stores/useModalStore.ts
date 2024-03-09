import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

import TaskModalContent from '../components/UI/Modals/TaskModalContent.vue';
import { ModalProps, ModalState } from './useModalStore.types.ts';
import { Task } from '../api/types.ts';

const basicState = { component: null, props: {} };

export const useModalStore = defineStore('modal-store', {
    state: (): ModalState => ({ modalState: basicState }),
    actions: {
        openModal({ component, props = {} }: ModalProps) {
            const body = document.body;
            if (body) body.style.overflow = 'hidden';

            this.modalState = { component, props: props || {} };
        },

        closeModal() {
            // Reset our state
            this.modalState = basicState;

            const body = document.body;
            if (body) body.style.overflow = 'auto';
        },

        openTaskModal(props?: Task) {
            this.openModal({ component: shallowRef(TaskModalContent), props });
        },
    },
    getters: {},
});