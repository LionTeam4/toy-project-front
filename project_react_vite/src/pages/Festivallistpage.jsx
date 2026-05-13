import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ewha from '../assets/ewha.svg'
import sogang from '../assets/sogang.svg'
import skku from '../assets/skku.svg'
import FestivalCard from '../components/FestivalCard'

const DUMMY_FESTIVALS = [
  {
    id: 1,
    name: '이화여대 대동제',
    date: '2026년 05월 21일 ~ 2026년 05월 24일',
    school: '이화여자대학교',
    posterUrl: ewha,
  },
  {
    id: 2,
    name: '서강대',
    date: '2026년 05월 21일 ~ 2026년 05월 24일',
    school: '서강대학교',
    posterUrl: sogang,
  },
  {
    id: 3,
    name: '성균관대',
    date: '2026년 05월 21일 ~ 2026년 05월 24일',
    school: '성균관대학교',
    posterUrl: skku,
  },
]

export default function FestivalListPage() {
  const navigate = useNavigate()

  const [festivals, setFestivals] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    setFestivals(DUMMY_FESTIVALS)
  }, [])

  useEffect(() => {
    setFiltered(festivals)
  }, [festivals])

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

        <p className="flex-1 text-center text-[13.58px] font-bold leading-[136%] tracking-[-0.01em] text-black">
          정보
        </p>

        <div className="w-[7px]" />
      </div>

      {/* 리스트 */}
      <div className="absolute left-[31px] top-[113px] flex flex-col gap-3">
        {filtered.map((festival, index) => (
          <FestivalCard
            key={festival.id}
            festival={festival}
            index={index}
            onClick={() => navigate(`/festivals/${festival.id}`)}
          />
        ))}
      </div>

    </div>
  )
}