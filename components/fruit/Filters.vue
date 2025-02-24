<template>
    <div class="fruit-filters">
        <div v-for="(value, key) in filters" :key="key" class="fruit-filters-group">
            <div class="fruit-filters-group-title">{{ key }}</div>
            <div class="fruit-filters-group-body">
                <input v-model="value[0]" type="number">
                <input v-model="value[1]" type="number">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FruitFilters } from '~/types/fruit';
defineProps<{ filters: FruitFilters }>()
</script>