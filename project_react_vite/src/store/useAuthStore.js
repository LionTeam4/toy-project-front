import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({

      user: null,
      isLoggedIn: false,

      login: (userData) =>
        set({
          user: userData,
          isLoggedIn: true,
        }),

      logout: () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        set({
          user: null,
          isLoggedIn: false,
        })
      },

    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore