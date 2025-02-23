import { reactive, type Reactive } from "vue";
import type { Modal } from "~/types/modal";

class ModalManager {
    state: Reactive<{ modals: Modal[] }>;

    constructor() {
        this.state = reactive({
            modals: []
        });
    }

    open(options: Modal) {
        this.state.modals.push(options);
        options.id = new Date().getTime();
        return new Promise(resolve => {
            options.$resolve = resolve;
        });
    }

    close(spec: Modal, result: unknown) {
        const ref = this.find(spec.id);
        if (ref) {
            this.state.modals.splice(this.state.modals.indexOf(ref), 1);
            ref.$resolve(result);
        }
    }

    find(id: number) {
        return this.state.modals.find(modal => modal.id === id);
    }
}

export default new ModalManager();
