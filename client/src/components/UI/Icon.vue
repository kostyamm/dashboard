<script setup lang="ts">
import { computed } from 'vue';
/**
 * Importing all icons will significantly increase the build size of the application,
 * negatively affecting its performance.
 * https://lucide.dev/guide/packages/lucide-vue-next#one-generic-icon-component
 * */
import Pencil from 'lucide-vue-next/dist/esm/icons/pencil.js'
import GripVertical from 'lucide-vue-next/dist/esm/icons/grip-vertical.js'
import X from 'lucide-vue-next/dist/esm/icons/x.js'
import Trash2 from 'lucide-vue-next/dist/esm/icons/trash-2.js'
import Plus from 'lucide-vue-next/dist/esm/icons/plus.js'
import ListRestart from 'lucide-vue-next/dist/esm/icons/list-restart.js'
import ListX from 'lucide-vue-next/dist/esm/icons/list-x.js'

const icons = { Pencil, GripVertical, X, Trash2, Plus, ListRestart, ListX }

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: '20'
    },
    color: String,
    strokeWidth: {
        type: Number,
        default: 1.6
    },
    defaultClass: String
})

const icon = computed(() => icons[props.name]);
</script>

<template>
    <component
        :is="icon"
        :size="size"
        :color="color"
        :stroke-width="strokeWidth" :default-class="defaultClass"
        class="icon"
    />
</template>

<style lang="scss" scoped>
.icon {
    padding: 0 4px;
}
</style>