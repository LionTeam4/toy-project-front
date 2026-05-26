import { create } from 'zustand'

const useToastStore = create((set) => ({
  toast: null,
  showToast: (message, type = 'success') => {
    set({ toast: { message, type } })
    setTimeout(() => set({ toast: null }), 3000)
  },
  hideToast: () => set({ toast: null }),
}))

export default useToastStore