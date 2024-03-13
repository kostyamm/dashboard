import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

import TaskModalContent from '../components/UI/Modals/TaskModalContent.vue';
import { ModalProps, ModalState } from './useModalStore.types.ts';
import { Task } from '../api/types.ts';
import AuthModalContent from '../components/UI/Modals/AuthModalContent.vue';

const basicState: ModalProps = { component: null, options: {} };

export const useModalStore = defineStore('modal-store', {
    state: (): ModalState => ({ modalState: basicState }),
    actions: {
        updateModalTitle(title: string) {
            this.modalState.options.title = title
        },

        openModal({ component, options }: ModalProps) {
            const body = document.body;
            if (body) body.style.overflow = 'hidden';

            this.modalState = { component, options };
        },

        closeModal() {
            const body = document.body;
            if (body) body.style.overflow = 'auto';

            this.modalState = basicState;
        },

        openTaskModal(contentProps?: Task) {
            const options: ModalProps['options'] = {
                title: 'Task',
                contentProps
            }

            this.openModal({ component: shallowRef(TaskModalContent), options});
        },

        openAuthModal() {
            const options: ModalProps['options'] = {
                title: 'Authorization',
                blockClose: true
            }

            this.openModal({ component: shallowRef(AuthModalContent), options });
        },
    },
    getters: {},
});