import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import List from '../components/List'

// 와이어프레임 4.1 통합검색
// - 상단 검색창
// - 필터: 지역 / 날짜 / 학교 탭
// - 최근검색어 목록
// - 전체 결과 리스트

const DUMMY_FESTIVALS = [
  { id: 1, name: '이화여대 대동제', date: '2026-05-14', location: '서울', school: '이화여자대학교', lineup: ['아이유', '르세라핌'] },
  { id: 2, name: '연세대 아카라카', date: '2026-05-21', location: '서울', school: '연세대학교', lineup: ['뉴진스', '에스파'] },
  { id: 3, name: '부산대 고리',     date: '2026-05-10', location: '부산', school: '부산대학교', lineup: ['아이브', '케플러'] },
]

const REGIONS = ['전체', '서울', '부산', '대구', '경기', '인천']

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [keyword, setKeyword]         = useState(searchParams.get('q') ?? '')
  const [region, setRegion]           = useState('전체')
  const [dateFilter, setDateFilter]    = useState('')
  const [schoolFilter, setSchoolFilter] = useState('')
  const [results, setResults]         = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [recentKeywords, setRecentKeywords] = useState([]) // 최근 검색어

  // 검색 실행
  const handleSearch = () => {
    if (!keyword.trim()) return

    // URL 쿼리스트링에 반영 (뒤로가기 시 검색 상태 복원)
    setSearchParams({ q: keyword, region })

    // 최근 검색어 저장 (중복 제거, 최대 5개)
    setRecentKeywords((prev) => {
      const filtered = prev.filter((k) => k !== keyword)
      return [keyword, ...filtered].slice(0, 5)
    })

    // TODO: API 호출로 교체 — GET /search?q=keyword&region=region
    const filtered = DUMMY_FESTIVALS.filter((f) => {
      const matchKeyword = f.name.includes(keyword) || f.school.includes(keyword)
      const matchRegion  = region === '전체' || f.location === region
      const matchSchool  = !schoolFilter.trim() || f.school.includes(schoolFilter)
      const matchDate    = !dateFilter.trim()   || f.date.startsWith(dateFilter)
      return matchKeyword && matchRegion
    })

    setResults(filtered)
    setHasSearched(true)
  }

  const handleSerach = () => runSearch(keyword)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleRecentClick = (k) => {
    setKeyword(k)
    runSearch(k)
  }

  const handleDeleteRecent = (k) => {
    setRecentKeywords((prev) => prev.filter((item) => item !== k))
  }

  // URL에 검색어 있으면 페이지 진입 시 자동 검색
  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setKeyword(q)
      handleSearch()
    }
  }, []) // eslint-disable-line

  return (
    <div>
      <h1>검색</h1>

      {/* 검색창 */}
      <div>
        <Input
          placeholder="축제명, 학교명으로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch}>검색</Button>
      </div>

      {/* 지역 필터 */}
      <div>
        {REGIONS.map((r) => (
          <Button key={r} onClick={() => setRegion(r)}>
            {region === r ? `✓ ${r}` : r}
          </Button>
        ))}
      </div>

      {/* 최근 검색어 — 검색 전에만 노출 */}
      {!hasSearched && recentKeywords.length > 0 && (
        <section>
          <h2>최근 검색어</h2>
          {recentKeywords.map((k) => (
            <div key={k}>
              <button onClick={() => handleRecentClick(k)}>{k}</button>
              <button onClick={() => handleDeleteRecent(k)}>✕</button>
            </div>
          ))}
        </section>
      )}

      {/* 검색 결과 */}
      {hasSearched && (
        <section>
          <p>검색 결과 {results.length}건</p>
          <List
            items={results}
            renderItem={(festival) => (
              <Card onClick={() => navigate(`/festivals/${festival.id}`)}>
                <p>{festival.name}</p>
                <p>{festival.date} · {festival.location}</p>
                <p>{festival.school}</p>
              </Card>
            )}
          />
        </section>
      )}
    </div>
  )
}