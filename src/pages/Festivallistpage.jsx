import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import FestivalCard from '../components/FestivalCard'
import { getFestivalList } from '../apis/festival'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function FestivalListPage() {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['festivals'],
    queryFn: async () => {
      const response = await getFestivalList()
      return Array.isArray(response.data)
        ? response.data
        : (response.data?.results || [])
    },
  })

  const festivals = data ?? []

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">불러오는 중...</p>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-white">

      {/* 헤더 */}
      <div className="flex h-[84px] items-center bg-white px-[34px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <button
          onClick={() => navigate(-1)}
          className="flex-shrink-0 cursor-pointer"
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path
              d="M6 1L1 6L6 11"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="flex-1 text-center text-[13.58px] font-bold leading-[136%] tracking-[-0.01em] text-black font-sans">
          정보
        </p>

        <div className="w-[7px]" />
      </div>

      {/* 리스트 */}
      <div className="absolute left-[31px] top-[113px] flex flex-col gap-3">
        {festivals.map((festival, index) => (
          <FestivalCard
            key={festival.id}
            festival={{
              ...festival,
              poster: festival.poster
                ? `${BASE_URL}${festival.poster}`
                : null,
              date: `${festival.start_date} ~ ${festival.end_date}`,
            }}
            index={index}
            onClick={() => navigate(`/festivals/${festival.id}`)}
          />
        ))}
      </div>

    </div>
  )
}