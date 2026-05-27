import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ewha_logo from '../assets/ewha_logo.svg'
import useToastStore from '../store/useToastStore'
import { getFestivalDetail } from "../apis/festival"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function FestivalDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { showToast } = useToastStore()

  const [bookmarked, setBookmarked] = useState(false)

  const { data: festival, isLoading } = useQuery({
    queryKey: ['festival', id],
    queryFn: async () => {
      const response = await getFestivalDetail(id)
      return response.data
    },
  })

  const handleBookmark = () => {
    setBookmarked((prev) => {
      const next = !prev
      showToast(
        next ? '즐겨찾기에 추가되었습니다!' : '즐겨찾기가 해제되었습니다.',
        next ? 'success' : 'info'
      )
      return next
    })
  }

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">불러오는 중...</p>
    </div>
  )
  if (!festival) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">축제 정보를 찾을 수 없습니다.</p>
    </div>
  )

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const [year, month, day] = dateStr.split('-')
    return `${year}년 ${month}월 ${day}일`
  }

  return (
    <div className="bg-white min-h-screen relative">

      {/* 상단 헤더 */}
      <div className="bg-white flex items-center justify-between px-[34px] h-[82px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="cursor-pointer text-gray-900 font-bold">⋮</button>
      </div>

      {/* 포스터 이미지 */}
      <div className="relative w-full h-[280px]">
        {festival.poster
          ? <img
              src={`${BASE_URL}${festival.poster}`}
              alt={festival.school}
              className="w-full h-[280px] object-cover rounded-b-[18px]"
            />
          : <div className="w-full h-[280px] bg-gradient-to-br from-primary-light to-primary flex items-center justify-center rounded-b-[18px]">
              <p className="text-gray-900 font-bold text-lg font-sans">{festival.school}</p>
            </div>
        }
      </div>

      <div className="px-[28px] pt-5">

        {/* 정보 태그 */}
        <div className="mb-2">
          <span className="inline-flex items-center justify-center w-[49px] h-[29px] rounded-[10.86px] bg-primary/40 text-white text-[10.86px] font-bold font-sans">
            정보
          </span>
        </div>

        {/* 축제명 + 즐겨찾기 */}
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-[21.2px] font-bold text-gray-900 leading-[136%] tracking-[-0.01em] font-sans">
            {festival.school}
          </h1>
          <button onClick={handleBookmark} className="cursor-pointer w-[18px] h-[18px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill={bookmarked ? '#000000' : 'none'}>
              <path d="M6.67871 0.560669C6.81355 0.146432 7.39934 0.146432 7.53418 0.560669L8.73242 4.24719C8.85965 4.63853 9.22423 4.90344 9.63574 4.90344H13.5117C13.9475 4.90357 14.1289 5.46168 13.7764 5.7179L10.6406 7.99622C10.3078 8.23807 10.1679 8.66641 10.2949 9.05774L11.4932 12.7443C11.6277 13.1587 11.1534 13.5032 10.8008 13.2472L7.66504 10.9689C7.33208 10.727 6.88081 10.727 6.54785 10.9689L3.41211 13.2472C3.05949 13.5032 2.58518 13.1587 2.71973 12.7443L3.91797 9.05774C4.04498 8.66641 3.90512 8.23807 3.57227 7.99622L0.436523 5.7179C0.0839548 5.46168 0.265371 4.90356 0.701172 4.90344H4.57715C4.98866 4.90344 5.35324 4.63853 5.48047 4.24719L6.67871 0.560669Z" stroke="black" strokeWidth="0.5"/>
            </svg>
          </button>
        </div>

        {/* 날짜 */}
        <p className="text-[14.251px] font-normal text-gray-900 leading-[136%] tracking-[-0.01em] font-sans">
          {formatDate(festival.start_date)} ~ {formatDate(festival.end_date)}
        </p>

        {/* 학교 로고 + 주소 */}
        <div className="flex items-center gap-[17px] mt-[30.71px]">
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-200 shrink-0">
            <img src={ewha_logo} alt="학교 로고" className="w-full h-full object-cover" />
          </div>
          <p className="text-[12px] font-normal leading-[136%] tracking-[-0.01em] text-black/60 font-sans max-w-[140px]">
            {festival.fes_location}
          </p>
        </div>

      </div>
    </div>
  )
}