import useAppStore from '../store/useAppStore'

export default function useAuth() {
  const { user, isLoading, login, logout, isLoggedIn } = useAppStore()
  return { user, isLoading, login, logout, isLoggedIn }
}