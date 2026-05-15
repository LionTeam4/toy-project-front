import { create } from 'zustand'

const useDialogStore = create((set) => ({
  dialog: null,
  showDialog: (title, message, onConfirm, onCancel) =>
    set({ dialog: { title, message, onConfirm, onCancel } }),
  hideDialog: () => set({ dialog: null }),
}))

export default useDialogStore