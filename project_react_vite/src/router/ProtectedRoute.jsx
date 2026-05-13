import { Navigate, useLocation } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAppStore()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}