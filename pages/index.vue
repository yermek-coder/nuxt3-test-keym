<template>
    <div class="container">
        <FruitFilters :filters="store.filters" />
        <NothingFound v-if="isEmpty" />
        <div v-else class="fruit-grid">
            <div v-for="item in store.filteredItems" :key="item.id">
                <FruitCard :fruit="item" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFruitsStore, useFavoriteFruits } from '~/store/fruit';

const store = useFruitsStore()
const favoritesStore = useFavoriteFruits();
const isEmpty = computed(() => !store.filteredItems.length)

await useAsyncData("fruits", () => store.fetchFruits());

onMounted(favoritesStore.loadFavorites)
</script>