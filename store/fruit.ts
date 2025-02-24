import { defineStore, getActivePinia } from "pinia"
import fruitService from '~/services/fruit'
import type { Fruit, FruitFilters } from "~/types/fruit";

export function useFruitsStore(family: string = 'All') {
    const id = `fruits${family}`;

    const store = defineStore(id, () => {
        const items = ref<Fruit[]>([]);

        const favoritesStore = useFavoriteFruits();

        const filters = reactive<FruitFilters>({
            carbohydrates: [0, 100],
            protein: [0, 100],
            fat: [0, 100],
            calories: [0, 100],
            sugar: [0, 100],
        });

        const favoriteItems = computed(() => {
            return items.value.filter(item => favoritesStore.favorites.includes(item.id))
        })

        const filteredItems = computed(() => {
            return items.value.filter(item => {
                return Object.keys(filters).every(key => {
                    const nutKey = key as keyof Fruit['nutritions'];
                    return filters[nutKey][0] <= item.nutritions[nutKey] &&
                        filters[nutKey][1] >= item.nutritions[nutKey]
                })
            })
        })

        function fetchFruits() {
            return (family ? fruitService.getByFamily(family) : fruitService.getAll()).then(result => (items.value = result))
        }


        function dispose() {
            store.$dispose()
            const pinia = getActivePinia()
            if (pinia) {
                delete pinia.state.value[id]
            }
        }

        return {
            fetchFruits,
            favoriteItems,
            items,
            filteredItems,
            filters,
            dispose
        }
    })()

    return store
}

export const useFavoriteFruits = defineStore("favoriteFruits", () => {
    const favorites = ref<number[]>([]);
    const isHydrated = ref(false);

    function isFavorite(fruit: Fruit) {
        return favorites.value.includes(fruit.id)
    }

    function persistFavorites(items: number[]) {
        if (import.meta.client && isHydrated.value) {
            localStorage.setItem("fruitFavorites", JSON.stringify(items))
        }
    }

    function toggleFavorite(fruit: Fruit) {
        if (isFavorite(fruit)) {
            favorites.value = favorites.value.filter(id => id !== fruit.id)
        } else {
            favorites.value.push(fruit.id)
        }
    }

    function loadFavorites() {
        if (import.meta.client) {
            const saved = localStorage.getItem("fruitFavorites")
            if (saved) {
                favorites.value = JSON.parse(saved)
            }
            isHydrated.value = true
        }
    }

    watch(favorites, persistFavorites, { deep: true });

    return {
        favorites, isFavorite, toggleFavorite, loadFavorites
    }
})