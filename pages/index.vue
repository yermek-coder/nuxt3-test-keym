<template>
    <div class="container">
        <FruitFilters :filters="store.filters" />
        <div v-if="store.filteredItems.length" class="fruit-grid">
            <div v-for="item in store.filteredItems" :key="item.id">
                <FruitCard :fruit="item" />
            </div>
        </div>
        <NothingFound v-else />
    </div>
</template>

<script setup lang="ts">
import { useFruitsStore, useFavoriteFruits } from '~/store/fruit';

const store = useFruitsStore()
const favoritesStore = useFavoriteFruits();

const data = await useAsyncData("fruits", store.fetchFruits)

onMounted(favoritesStore.loadFavorites)
</script>