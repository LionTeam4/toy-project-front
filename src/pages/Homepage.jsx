import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'
import ContentTabs from '../components/ContentTabs'
import ewha_logo from '../assets/ewha_logo.svg'
import { getFestivalList } from "../apis/festival"

const REVIEW_SETS = [
  [
    {
      id: 1,
      festivalName: '이화여대 대동제',
      author: '유저A',
      content: '올해 간 축제 중에 기억에 남았던 축제 다들 꼭 한번은 가보시길 이대축제',
      profileUrl: ewha_logo
    },
    {
      id: 2,
      festivalName: '연세대 아카라카',
      author: '유저B',
      content: '올해 간 축제 중에 기억에 남았던 축제 다들 꼭 한번은 가보시길 이대축제',
      profileUrl: ewha_logo
    },
  ],
  [
    {
      id: 3,
      festivalName: '고려대 입실렌티',
      author: '유저C',
      content: '매년 오고 싶어요! 분위기가 정말 최고였어요.',
      profileUrl: ewha_logo
    },
    {
      id: 4,
      festivalName: '부산대 고리',
      author: '유저D',
      content: '부산까지 갈 가치 있어요. 강력 추천합니다!',
      profileUrl: ewha_logo
    },
  ],
]

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [reviewSetIdx, setReviewSetIdx] = useState(0)
  const [reviews, setReviews] = useState(REVIEW_SETS[0])

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

  const handleRefreshReviews = () => {
    const nextIdx = (reviewSetIdx + 1) % REVIEW_SETS.length
    setReviewSetIdx(nextIdx)
    setReviews(REVIEW_SETS[nextIdx])
  }

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">불러오는 중...</p>
    </div>
  )

  return (
    <div className="w-full max-w-[393px] bg-white min-h-screen relative">

      {/* 상단 토글 + 검색 */}
      <div className="flex items-center justify-between px-[6px] pt-[47px] mb-4">
        <div className="flex gap-[50px]">
          <ContentTabs />
        </div>
        <button
          onClick={() => navigate('/search')}
          className="cursor-pointer absolute top-[45px] right-[29px]"
        >
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#000000" strokeWidth="2" />
            <line x1="14" y1="14" x2="19" y2="19" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 인사말 */}
      <div className="absolute top-[132px] left-[28px] right-[51px]">
        <h1 className="text-[25px] font-bold text-gray-900 leading-[136%] font-sans">
          반가워요 {user?.nickname ?? '멋사'}님<br />어느축제를 가볼까요?
        </h1>
      </div>

      {/* 축제 가로 스크롤 배너 */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide absolute top-[236px] left-[11px] right-0">
        {festivals.map((festival, i) => (
          <div
            key={festival.id}
            onClick={() => navigate(`/festivals/${festival.id}`)}
            className={`relative flex-shrink-0 cursor-pointer rounded-[11px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden w-[152px] h-[214px] min-w-[152px] ${
              i % 2 === 0 ? 'mt-11' : 'mb-11'
            }`}
          >
            {festival.poster
              ? <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${festival.poster}`}
                  alt={festival.school}
                  className="w-full h-full object-cover block"
                />
              : <div className="flex items-center justify-center bg-gradient-to-br from-primary-light to-primary w-full h-full">
                  <p className="text-gray-900 font-bold text-sm text-center px-3 font-sans">{festival.school}</p>
                </div>
            }
            <div className="absolute bottom-0 left-0 right-0 h-[63px] rounded-b-[11px] bg-gradient-to-t from-primary/70 to-transparent" />
          </div>
        ))}
      </div>

      {/* 추천 후기 */}
      <div className="absolute top-[580px] left-[28px] right-[291px]">
        <h2
          onClick={handleRefreshReviews}
          className="text-[20px] font-bold text-gray-900 leading-[136%] cursor-pointer whitespace-nowrap font-sans"
        >
          추천 후기
        </h2>
        <div className="flex flex-col w-[330px]">
          {reviews.map((review, index) => (
            <div key={review.id}>
              <div className="flex gap-3 items-start py-4">
                <span className="text-gray-900 leading-[136%] tracking-[-0.01em] shrink-0 font-inter font-normal text-[33px]">
                  "
                </span>
                <div className="flex items-start gap-[7px]">
                  <div className="w-[33px] h-[33px] rounded-full overflow-hidden shrink-0 bg-gray-200 mt-[2px]">
                    {review.profileUrl && (
                      <img
                        src={review.profileUrl}
                        alt={review.author}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-[9px]">
                    <p className="text-[13px] font-normal text-gray-900 leading-[136%] tracking-[-0.01em] font-sans">
                      {review.content}
                    </p>
                  </div>
                </div>
                <span className="text-gray-900 leading-[136%] tracking-[-0.01em] shrink-0 font-inter font-normal text-[33px]">
                  "
                </span>
              </div>
              {index < reviews.length - 1 && (
                <div className="w-[314px] h-[1px] bg-black opacity-30" />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}