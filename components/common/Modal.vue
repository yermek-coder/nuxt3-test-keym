<template>
    <div class="dialog-container">
        <div @click="close(null)" class="dialog-overlay"></div>
        <div class="dialog-content">
            <component :is="modal.component" @close="close" @dismiss="close" v-bind="modal.props"
                class="modal-content" />
        </div>
    </div>
</template>

<script setup lang="ts">
import modalService from "~/services/modal";
import type { Modal } from "~/types/modal"

const props = defineProps<{ modal: Modal }>()

function close(result: unknown) {
    modalService.close(props.modal, result);
}
</script>
