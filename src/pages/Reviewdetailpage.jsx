import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import review_ewha from '../assets/review_ewha.svg'

const DUMMY_REVIEWS = {
  1: {
    id: 1,
    festivalName: '이화여자대학교',
    school: '이화여자대학교',
    author: '유저A',
    content: '생각보다 재미있음\n맛있는거 많음',
    createdAt: '2025.03.12',
    type: '후기',
  },
  2: {
    id: 2,
    festivalName: '이화여자대학교',
    school: '이화여자대학교',
    author: '유저B',
    content: '재미많음',
    createdAt: '2026-04-02',
    type: '후기',
  },
  3: {
    id: 3,
    festivalName: '이화여자대학교',
    school: '이화여자대학교',
    author: '유저C',
    content: '볼거 늘거 많음',
    createdAt: '2026-04-03',
    type: '후기',
  },
}

export default function Reviewdetailpage() {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [review, setReview]       = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [comment, setComment]     = useState('')

  useEffect(() => {
    const data = DUMMY_REVIEWS[Number(id)] ?? null
    setReview(data)
    setIsLoading(false)
  }, [id])

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">불러오는 중...</p>
    </div>
  )
  if (!review) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">후기를 찾을 수 없습니다.</p>
    </div>
  )

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* 상단 헤더 */}
      <div className="bg-white flex items-center justify-between px-[34px] h-[82px]">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="w-[7px]" />
        {/* 세로 ... */}
        <button className="cursor-pointer flex flex-col gap-[3px] items-center">
          <span className="w-1 h-1 rounded-full bg-gray-900 block" />
          <span className="w-1 h-1 rounded-full bg-gray-900 block" />
          <span className="w-1 h-1 rounded-full bg-gray-900 block" />
        </button>
      </div>

      <div className="px-[32px] pt-[5px]">

        {/* 후기 태그 + 프로필 */}
        <div className="flex items-center gap-3 mb-[12px]">
          <span className="inline-flex items-center justify-center w-[49px] h-[29px] rounded-[10.858px] bg-primary/40 text-white text-[10.86px] font-bold font-sans">
            후기
          </span>
          <div className="w-[34px] h-[34px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src={review_ewha}
              alt="프로필"
              className="w-[34px] h-[34px] object-cover"
            />
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-gray-900 text-[21.2px] font-bold leading-[136%] tracking-[-0.01em] mb-[4.29px] font-sans">
          {review.festivalName}
        </h1>

        {/* 날짜 */}
        <p className="text-[13px] font-normal leading-[136%] tracking-[-0.01em] text-black/50 mb-[24.71px] font-sans">
          {review.createdAt} 작성
        </p>

        {/* 학교 태그 */}
        <div className="mb-[15px]">
          <span className="border border-gray-900 text-gray-900 text-xs px-3 py-1.5 rounded-full font-sans">
            {review.school}
          </span>
        </div>

        {/* 본문 */}
        <p className="text-gray-900 text-[13px] font-normal leading-[136%] tracking-[-0.01em] mb-6 whitespace-pre-line font-sans">
          {review.content}
        </p>

      </div>

      {/* 댓글 입력창 — 하단 고정 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-[393px] bg-white px-[29px] py-3">
          <div className="flex items-center border border-gray-900 rounded-[20px] px-4 gap-2 w-[335px] h-[55px]">
            <input
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 text-sm outline-none placeholder:text-gray-400 bg-transparent font-sans"
            />
            <button className="cursor-pointer flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                <path d="M1.27173 5.82764L10.4959 10.8063" stroke="black" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M20.3054 1.073L15.7139 20.6525" stroke="black" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M0.700195 5.64868L19.6696 0.700135" stroke="black" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M10.7507 10.6284L15.3017 20.3445" stroke="black" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M10.7507 10.628L19.5684 1.07352" stroke="black" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}