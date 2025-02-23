<template>
    <div>
        <Modal v-for="(modal, index) in state.modals" :key="modal.id" :modal="modal" />
    </div>
</template>

<script setup lang="ts">
import modalService from "~/services/modal";

const state = reactive(modalService.state)
const backdropVisible = ref(false)

function modalStyle(index: number) {
    return {
        "z-index": 2050 + 10 * index
    };
}
</script>
