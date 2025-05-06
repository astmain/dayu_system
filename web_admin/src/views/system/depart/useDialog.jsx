// useDialog.js
import { ref } from 'vue';

export function useDialog() {
    const isVisible = ref(false);
    const confirmCallback = ref(null);
    const cancelCallback = ref(null);

    const open = (onConfirm, onCancel) => {
        isVisible.value = true;
        confirmCallback.value = onConfirm;
        cancelCallback.value = onCancel;
    };

    const close = () => {
        isVisible.value = false;
        confirmCallback.value = null;
        cancelCallback.value = null;
    };

    const handleConfirm = () => {
        if (confirmCallback.value) {
            confirmCallback.value();
        }
        close();
    };

    const handleCancel = () => {
        if (cancelCallback.value) {
            cancelCallback.value();
        }
        close();
    };

    return {
        isVisible,
        open,
        close,
        handleConfirm,
        handleCancel
    };
}