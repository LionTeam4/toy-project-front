import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
 
// 와이어프레임 3.1 홈 기준: 하단 탭 — 홈 / 검색 / 축제 / 소통 / 마이
const NAV_ITEMS = [
  { to: '/',          label: '홈',   end: true },
  { to: '/search',    label: '검색' },
  { to: '/festivals', label: '축제' },
  { to: '/community', label: '소통' },
  // { to: '/login/', label: '로그인' },
  // { to: '/signup', label: '회원가입' },
  { to: '/mypage',    label: '마이' },
]
 
export default function GNB() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
 
  // 로그인 전에는 GNB 미노출
  // if (!user) return null
 
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
 
  return (
    <nav>
      {NAV_ITEMS.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
        >
          {label}
        </NavLink>
      ))}
      <button onClick={handleLogout}>로그아웃</button>
    </nav>
  )
}
 