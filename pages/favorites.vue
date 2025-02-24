<template>
    <div class="container">
        <div class="fruit-grid">
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

await useAsyncData("favoriteFruits", store.fetchFruits);

onMounted(favoritesStore.loadFavorites)
onUnmounted(store.dispose)
</script>