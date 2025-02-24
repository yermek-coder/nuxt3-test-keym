<template>
    <div class="container">
        <h2>{{ route.params.id }}</h2>

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

const route = useRoute();
const familyId = computed(() => route.params.id)

const store = useFruitsStore(familyId.value as string)
const favoritesStore = useFavoriteFruits();
const isEmpty = computed(() => !store.filteredItems.length)

await useAsyncData("familyFruits" + familyId.value, store.fetchFruits)

onMounted(favoritesStore.loadFavorites)
onUnmounted(store.dispose)
</script>