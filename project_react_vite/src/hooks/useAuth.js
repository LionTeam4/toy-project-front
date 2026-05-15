import useAuthStore from '../store/useAuthStore'

export default function useAuth() {
  const { user, login, logout } = useAuthStore()
  const isLoggedIn = !!user
  return { user, login, logout, isLoggedIn }
}