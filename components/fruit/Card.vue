<template>
    <div class="fruit-card">
        <h3 class="fruit-card-title">
            {{ fruit.name }}
        </h3>
        <div class="fruit-card-body">
            <div v-for="(value, key) in fruit.nutritions" :key="key" class="fruit-card-body-nutritions">
                <div>{{ key }}</div>
                <div>{{ value }}</div>
            </div>
        </div>
        <div class="fruit-card-footer">
            <NuxtLink :to="`/family/${fruit.family}`" class="fruit-card-family">{{ fruit.family }}</NuxtLink>
            <button @click="favoritesStore.toggleFavorite(fruit)">
                <Icon v-if="favoritesStore.isFavorite(fruit)" icon="star-fill" />
                <Icon v-else icon="star" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Fruit } from '~/types/fruit';
import { useFavoriteFruits } from '~/store/fruit';

const favoritesStore = useFavoriteFruits();

defineProps<{ fruit: Fruit }>();
</script>