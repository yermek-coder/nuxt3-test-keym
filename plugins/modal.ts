import modalService from "~/services/modal"
import type { Modal } from "~/types/modal";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            modal: function (options: Modal) {
                return modalService.open(options);
            }
        }
    }
})