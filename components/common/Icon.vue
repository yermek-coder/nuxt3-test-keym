<template>
    <i :class="style"></i>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({ icon: String });
const style = computed(() => `icon bi bi-${props.icon}`);
</script>
