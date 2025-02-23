<template>
    <div>
        INDEX
        <button @click="openaa">afwafwa</button>
    </div>
</template>

<script setup>
import fruitService from '~/services/fruit'

const { $modal } = useNuxtApp()

function openaa() {
    fruitService.getAll()
}
</script>