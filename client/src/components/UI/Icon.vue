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
import LogOut from 'lucide-vue-next/dist/esm/icons/log-out.js'
import CircleUserRound from 'lucide-vue-next/dist/esm/icons/circle-user-round.js'
import AlertTriangle from 'lucide-vue-next/dist/esm/icons/alert-triangle.js'

const icons = { Pencil, GripVertical, X, Trash2, Plus, LogOut, CircleUserRound, AlertTriangle }

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
        default: 1.4
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