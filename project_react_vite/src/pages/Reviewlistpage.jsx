import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import review_ewha from '../assets/review_ewha.svg'
import useToastStore from '../store/useToastStore'

const DUMMY_REVIEWS = [
  { id: 1, festivalName: '이화여자대학교', author: '유저A', content: '재미있음', likes: 24, createdAt: '2026-04-01', rating: 5, profileUrl: review_ewha },
  { id: 2, festivalName: '이화여자대학교', author: '유저B', content: '재미많음', likes: 18, createdAt: '2026-04-02', rating: 4, profileUrl: review_ewha },
  { id: 3, festivalName: '이화여자대학교', author: '유저C', content: '볼거 늘거 많음', likes: 9,  createdAt: '2026-04-03', rating: 5, profileUrl: review_ewha },
]

export default function Reviewlistpage() {
  const navigate = useNavigate()
  const { showToast } = useToastStore()
  const [reviews, setReviews]     = useState([])
  const [bookmarks, setBookmarks] = useState({})

  useEffect(() => {
    setReviews(DUMMY_REVIEWS)
  }, [])

  const handleBookmark = (e, reviewId) => {
    e.stopPropagation()
    setBookmarks((prev) => {
      const isBookmarked = prev[reviewId]
      showToast(
        isBookmarked ? '즐겨찾기가 해제되었습니다.' : '즐겨찾기에 추가되었습니다!',
        isBookmarked ? 'info' : 'success'
      )
      return { ...prev, [reviewId]: !isBookmarked }
    })
  }

  return (
    <div className="bg-white min-h-screen relative">

      {/* 상단 헤더 */}
      <div className="bg-white flex items-center justify-between px-[34px] h-[84px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="text-[13.58px] font-bold text-gray-900 leading-[136%] tracking-[-0.01em] font-sans">
          후기
        </p>
        <button
          onClick={() => navigate('/reviews/new')}
          className="cursor-pointer flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.6234 0.334243L1.13799 11.8196C0.966299 11.9909 0.853715 12.2124 0.816615 12.4521L0.0131635 17.6876C-0.0139482 17.8645 0.000950014 18.0452 0.0566523 18.2152C0.112355 18.3852 0.207296 18.5397 0.333795 18.6662C0.460293 18.7927 0.614796 18.8876 0.784799 18.9433C0.954802 18.999 1.13553 19.0139 1.31236 18.9868L6.54904 18.1834C6.78856 18.1466 7.01012 18.0344 7.18154 17.8631L18.6669 6.37779C18.8805 6.16407 19.0006 5.87425 19.0006 5.57206C19.0006 5.26987 18.8805 4.98004 18.6669 4.76633L14.2337 0.333104C14.02 0.119801 13.7304 0 13.4285 0C13.1266 0 12.837 0.119801 12.6234 0.333104M2.50215 16.499L3.01271 13.1667L13.4291 2.75029L16.2497 5.57206L5.83334 15.9884L2.50215 16.499Z" fill="black"/>
            <path d="M10.6221 4.92352L11.8301 3.71436L15.5248 7.40681L14.3157 8.61598L10.6221 4.92352Z" fill="black"/>
          </svg>
        </button>
      </div>

      {/* 후기 목록 */}
      <div className="flex flex-col gap-3 absolute top-[113px] left-[31px]">
        {reviews.map((review) => (
          <div
            key={review.id}
            onClick={() => navigate(`/reviews/${review.id}`)}
            className="relative bg-white w-[332px] h-[121px] rounded-[10.86px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer"
          >
            {/* 후기 태그 */}
            <div className="px-4 pt-3">
              <span className="inline-flex items-center justify-center w-[49px] h-[29px] rounded-[10.858px] bg-primary/40 text-white text-[10.86px] font-bold font-sans">
                후기
              </span>
            </div>

            {/* 별 아이콘 */}
            <button
              className="absolute top-[24px] right-[22px] cursor-pointer"
              onClick={(e) => handleBookmark(e, review.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 14" fill={bookmarks[review.id] ? '#33FE88' : 'none'}>
                <path d="M6.91602 0.637817C6.976 0.453855 7.23689 0.453856 7.29688 0.637817L8.49414 4.32434C8.65479 4.81877 9.11587 5.15344 9.63574 5.15344H13.5117C13.7054 5.15357 13.7856 5.4019 13.6289 5.51575L10.4932 7.79309C10.0726 8.09861 9.89711 8.64053 10.0576 9.13489L11.2549 12.8214C11.3148 13.0057 11.104 13.1589 10.9473 13.045L7.81152 10.7667C7.39103 10.4614 6.82186 10.4614 6.40137 10.7667L3.26562 13.045C3.10888 13.1589 2.89814 13.0057 2.95801 12.8214L4.15527 9.13489C4.31578 8.64053 4.14024 8.09861 3.71973 7.79309L0.583984 5.51575C0.427279 5.40189 0.507533 5.15356 0.701172 5.15344H4.57715C5.09702 5.15344 5.5581 4.81877 5.71875 4.32434L6.91602 0.637817Z"
                  stroke={bookmarks[review.id] ? '#33FE88' : '#D2D2D2'}
                  strokeWidth="1"
                />
              </svg>
            </button>

            {/* 내용 + 프로필 */}
            <div className="px-4 pt-[21px] pb-3">
              <div className="flex-1">
                <p className="text-[14px] font-bold leading-[136%] tracking-[-0.01em] text-gray-900 font-sans">
                  {review.festivalName}
                </p>
                <p className="text-[11px] font-normal leading-[136%] tracking-[-0.01em] text-gray-900 mt-0.5 font-sans">
                  {review.content}
                </p>
              </div>
            </div>

            {/* 프로필 이미지 */}
            {review.profileUrl && (
              <div className="absolute top-[32px] right-[43px] w-[69px] h-[69px] rounded-full overflow-hidden">
                <img src={review.profileUrl} alt={review.author} className="w-full h-full object-cover" />
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  )
}