<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useModalStore } from '../../../stores/useModalStore';
import Icon from '../Icon.vue';

const modalStore = useModalStore();

const modalState = computed(() => modalStore.modalState)

const keydownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        modalStore.closeModal()
    }
};

const onCloseModal = () => {
    if (modalState.value.options.blockClose) {
        return
    }

    modalStore.closeModal()
}

onMounted(() => document.addEventListener('keydown', keydownListener));
onUnmounted(() => document.removeEventListener('keydown', keydownListener));
</script>

<template>
    <Transition name="modal-fade">
        <div
            v-if="modalState?.component"
            @click.self="onCloseModal"
            aria-modal="true"
            role="dialog"
            tabindex="-1"
            class="modal-wrapper"
        >
            <div class="modal-inner">
                <div class="modal-inner__header">
                    <div>{{ modalState.options.title }}</div>
                    <button v-if="!modalState.options.blockClose" @click="onCloseModal" class="outline">
                        <Icon name="X" />
                    </button>
                </div>
                <div class="modal-inner__content">
                    <component
                        :is="modalState?.component"
                        v-bind="modalState.options?.contentProps"
                    />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;

    width: 100vw;
    height: 100dvh;
    background: rgba(40, 40, 40, 0.8);

    display: grid;
    place-items: center;
}

.modal-inner {
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    max-width: 600px;

    background-color: var(--dark-color);
    border-radius: var(--border-radius);
    padding: 24px;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 24px;
        font-weight: 600;
    }

    &__content {
        max-height: 500px;
        overflow-y: auto;
    }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: 0.25s ease all;
}
</style>