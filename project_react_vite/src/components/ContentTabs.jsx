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
    <div className="flex items-center gap-[0px]">
      {TOGGLES.map(({ label, path }) => {
        const isActive = pathname.startsWith(path)
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`cursor-pointer text-center leading-[136%] h-[17px] text-[13.578px] font-bold tracking-[-0.01em] font-sans px-5 ${
              isActive ? 'text-primary' : 'text-gray-900'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}