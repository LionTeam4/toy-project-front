import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import List from '../components/List'
import useAuth from '../hooks/useAuth'

// 와이어프레임 3.1 홈
// - 인사말 + "어느 축제를 기대하나요?" 문구
// - 관심 축제 추천 카드 리스트
// - 추천 후기 리스트
// - 소통 섹션 바로가기

const DUMMY_FESTIVALS = [
  { id: 1, name: '이화여대 대동제', date: '2026-05-14', location: '서울' },
  { id: 2, name: '연세대 아카라카', date: '2026-05-21', location: '서울' },
]

const REVIEW_SETS = [
  [
    { id: 1, festivalName: '이화여대 대동제', author: '유저A', content: '라인업이 정말 좋았어요!' },
    { id: 2, festivalName: '연세대 아카라카', author: '유저B', content: '분위기 최고였습니다.' },
  ],
  [
    { id: 3, festivalName: '고려대 입실렌티', author: '유저C', content: '매년 오고 싶어요!' },
    { id: 4, festivalName: '부산대 고리',     author: '유저D', content: '부산까지 갈 가치 있어요.' }
  ],
]

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [festivals, setFestivals] = useState([])
  const [reviews, setReviews]     = useState([])
  const [reviewSetIdx, setReviewSetIdx] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: API 호출로 교체
    setFestivals(DUMMY_FESTIVALS)
    setReviews(REVIEW_SETS[0])
    setIsLoading(false)
  }, [])

  // 추천 후기 타이틀 클릭 → 다음 세트로 업데이트
  const handleRefreshReviews = () => {
    const nextIdx = (reviewSetIdx + 1) % REVIEW_SETS.length
    setReviewSetIdx(nextIdx)
    setReviews(REVIEW_SETS[nextIdx])
    // TODO: API 호출로 교체 — GET /reviews/recommended
  }

  if (isLoading) return <p>불러오는 중...</p>

  return (
    <div>
      {/* 인사말 */}
      <h1>반가워요 {user?.nickname}님,<br />어느 축제를 기대하나요? 🎉</h1>

      {/* 축제 추천 */}
      <section>
        <h2>축제</h2>
        <List
          items={festivals}
          renderItem={(festival) => (
            <Card onClick={() => navigate(`/festivals/${festival.id}`)}>
              {festival.posterUrl
                ? <img src={festival.posterUrl} alt={festival.name} />
                : <div>포스터</div>
              }
              <p>{festival.name}</p>
              <p>{festival.date} · {festival.location}</p>
            </Card>
          )}
        />
        <Button onClick={() => navigate('/festivals')}>축제 전체 보기</Button>
      </section>

      {/* 추천 후기 */}
      <section>
        <h2
          onClick={handleRefreshReviews}
          style={{ cursor: 'pointer' }}
        >
          추천 후기 🔄
        </h2>
        <List
          items={reviews}
          renderItem={(review) => (
            <Card>
              <p>{review.festivalName}</p>
              <p>{review.content}</p>
              <p>{review.author}</p>
            </Card>
          )}
        />
      </section>

      {/* 소통 바로가기 */}
      <section>
        <h2>소통</h2>
        <Button onClick={() => navigate('/community')}>소통 전체 보기</Button>
      </section>
    </div>
  )
}