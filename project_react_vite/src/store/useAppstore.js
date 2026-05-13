import { create } from 'zustand'

const useAppStore = create((set) => ({

  // ── 로그인 여부 ──────────────────────────
  user: null,
  isLoggedIn: false,
  isLoading: false,
  login: (userData) => set({ user: userData, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),

  // ── 토스트 ──────────────────────────────
  toast: null,  // { message, type: 'success' | 'error' | 'info' }
  showToast: (message, type = 'success') => {
    set({ toast: { message, type } })
    setTimeout(() => set({ toast: null }), 3000)  // 3초 후 자동 사라짐
  },
  hideToast: () => set({ toast: null }),

  // ── 다이얼로그(모달) ─────────────────────
  dialog: null,  // { title, message, onConfirm, onCancel }
  showDialog: (title, message, onConfirm, onCancel) =>
    set({ dialog: { title, message, onConfirm, onCancel } }),
  hideDialog: () => set({ dialog: null }),

}))

export default useAppStore