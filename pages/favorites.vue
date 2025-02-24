<template>
    <div class="container">
        <NothingFound v-if="isEmpty" />
        <div v-else class="fruit-grid">
            <div v-for="item in store.favoriteItems" :key="item.id">
                <FruitCard :fruit="item" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFruitsStore, useFavoriteFruits } from '~/store/fruit';

const store = useFruitsStore();
const favoritesStore = useFavoriteFruits();
const isEmpty = computed(() => !store.favoriteItems.length)

await useAsyncData("favoriteFruits", store.fetchFruits);

onMounted(favoritesStore.loadFavorites)
</script>