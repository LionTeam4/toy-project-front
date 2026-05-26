import { NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const NAV_ITEMS = [
  { to: '/',          label: '홈',  end: true },
  { to: '/festivals', label: '정보' },
  { to: '/search',    label: '검색' },
  { to: '/community', label: '소통' },
  { to: '/mypage',    label: '마이' },
]

export default function GNB() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  // if (!user) return null

  return (
    // 바깥 div — 화면 전체 고정
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-transparent">
      {/* 안쪽 nav — 390px로 제한 */}
      <nav className="w-full max-w-[393px] bg-white border-t border-[#E0E0E0] flex items-center justify-around px-4 py-2">
        {NAV_ITEMS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-medium py-1 px-3 transition-colors ${
                isActive ? 'text-[#33FE88]' : 'text-[#A8A8A8]'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}