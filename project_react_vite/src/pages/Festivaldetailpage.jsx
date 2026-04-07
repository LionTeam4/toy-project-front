import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import List from '../components/List'

// 와이어프레임 5.2 정보 게시물
// - 학교명 + 축제명
// - URL 공유 버튼
// - 포스터 이미지 영역
// - 학교 / 날짜 / 장소 정보
// - 라인업 목록
// - 스케줄 On/Off 토글
// - 연결된 후기 목록

const DUMMY_DETAIL = {
  1: {
    id: 1,
    school: '이화여자대학교',
    name: '이화여대 대동제',
    date: '2026-05-14 ~ 2026-05-16',
    location: '이화여자대학교 대강당 앞',
    posterUrl: null, // TODO: 실제 이미지 URL
    lineup: ['아이유', '뉴진스', '르세라핌'],
    schedule: [
      { day: '5/14', events: ['오후 6시 — 아이유'] },
      { day: '5/15', events: ['오후 5시 — 뉴진스', '오후 7시 — 르세라핌'] },
    ],
    // reviews: [
    //   { id: 1, author: '유저A', content: '라인업 너무 좋았어요!', rating: 5 },
    //   { id: 2, author: '유저B', content: '분위기가 최고였습니다.', rating: 4 },
    // ],
  },
  2: {                        // 추가
    id: 2,
    school: '연세대학교',
    name: '연세대 아카라카',
    date: '2026-05-21 ~ 2026-05-23',
    location: '연세대학교 노천극장',
    posterUrl: null,
    lineup: ['뉴진스', 'aespa'],
    schedule: [
      { day: '5/21', events: ['오후 6시 — 뉴진스'] },
      { day: '5/22', events: ['오후 6시 — aespa'] },
    ],
  },
}

export default function FestivalDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [festival, setFestival]         = useState(null)
  const [isLoading, setIsLoading]       = useState(true)
  const [showSchedule, setShowSchedule] = useState(false) // 스케줄 On/Off 토글

  useEffect(() => {
    // TODO: API 호출 — GET /festivals/:id
    const data = DUMMY_DETAIL[Number(id)] ?? null
    setFestival(data)
    setIsLoading(false)
  }, [id])

  const handleShareUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('링크가 복사되었습니다!')
  }

  if (isLoading) return <p>불러오는 중...</p>
  if (!festival) return <p>축제 정보를 찾을 수 없습니다.</p>

  return (
    <div>
      <Button onClick={() => navigate(-1)}>← 뒤로</Button>

      {/* 학교명 + 공유 버튼 */}
      <div>
        <h1>{festival.school}</h1>
        <Button onClick={handleShareUrl}>URL 공유</Button>
      </div>

      {/* 포스터 이미지 */}
      <div>
        {festival.posterUrl
          ? <img src={festival.posterUrl} alt={`${festival.name} 포스터`} />
          : <div>포스터 이미지</div>
        }
      </div>

      {/* 기본 정보 */}
      <section>
        <p>🏫 학교: {festival.school}</p>
        <p>📅 날짜: {festival.date}</p>
        <p>📍 장소: {festival.location}</p>
      </section>

      {/* 라인업 */}
      <section>
        <h2>라인업</h2>
        <ul>
          {festival.lineup.map((artist) => (
            <li key={artist}>{artist}</li>
          ))}
        </ul>
      </section>

      {/* 스케줄 On/Off 토글 */}
      <section>
        <div>
          <span>스케줄</span>
          <Button onClick={() => setShowSchedule((prev) => !prev)}>
            {showSchedule ? 'On' : 'Off'}
          </Button>
        </div>
        {showSchedule && (
          <div>
            {festival.schedule.map((s) => (
              <div key={s.day}>
                <strong>{s.day}</strong>
                <ul>
                  {s.events.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 후기 목록 */}
      <section>
        <h2>소통하기</h2>
        <p>이 축제에 대한 더 많은 이야기와 실시간 정보를 커뮤니티에서 확인하세요!</p>
        
        <Button onClick={() => navigate('/community')}>
            커뮤니티 게시판으로 이동
        </Button>
      </section>
    </div>
  )
};

