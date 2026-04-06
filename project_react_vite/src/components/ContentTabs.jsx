import { useNavigate, useLocation } from 'react-router-dom'

const TOGGLES = [
  { label: '정보', path: '/festivals' },
  { label: '소통', path: '/community' },
  { label: '후기', path: '/reviews' },
]

export default function ContentTabs() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()

  return (
    <div>
      {TOGGLES.map(({ label, path }) => {
        const isActive = pathname.startsWith(path)
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{ fontWeight: isActive ? 'bold' : 'normal' }}
            aria-pressed={isActive}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}