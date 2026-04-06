import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import List from '../components/List'
import ContentTabs from '../components/ContentTabs'

// 와이어프레임 5.1 축제정보 검색
// - 검색창
// - 필터: 지역 / 날짜 탭
// - 축제 카드 목록 (학교명, 날짜, 장소)

const DUMMY_FESTIVALS = [
  { id: 1, name: '이화여대 대동제', date: '2026-05-14', location: '서울', school: '이화여자대학교' },
  { id: 2, name: '연세대 아카라카', date: '2026-05-21', location: '서울', school: '연세대학교' },
  { id: 3, name: '부산대 고리',     date: '2026-05-10', location: '부산', school: '부산대학교' },
  { id: 4, name: '고려대 입실렌티', date: '2026-05-28', location: '서울', school: '고려대학교' },
]

const REGIONS = ['전체', '서울', '부산', '대구', '경기']
const SORT_OPTIONS = [
  { value: 'date',   label: '날짜순' },
  { value: 'region', label: '지역순' },
]

export default function FestivalListPage() {
  const navigate = useNavigate()

  const [search, setSearch]     = useState('')
  const [region, setRegion]     = useState('전체')
  const [sort, setSort]         = useState('date')
  const [festivals, setFestivals] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    // TODO: API 호출로 교체
    setFestivals(DUMMY_FESTIVALS)
  }, [])

  // 검색어 + 지역 필터 + 정렬 동시 적용
  useEffect(() => {
    let result = [...festivals]

    if (search.trim()) {
      result = result.filter((f) =>
        f.name.includes(search) || f.school.includes(search)
      )
    }
    if (region !== '전체') {
      result = result.filter((f) => f.location === region)
    }
    if (sort === 'date') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else {
      result.sort((a, b) => a.location.localeCompare(b.location))
    }

    setFiltered(result)
  }, [search, region, sort, festivals])

  return (
    <div>
      <h1>축제정보</h1>

      {/* 검색창 */}
      <Input
        placeholder="축제명 또는 학교명 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 지역 필터 */}
      <div>
        {REGIONS.map((r) => (
          <Button key={r} onClick={() => setRegion(r)}>
            {region === r ? `✓ ${r}` : r}
          </Button>
        ))}
      </div>

      {/* 정렬 */}
      <div>
        {SORT_OPTIONS.map((option) => (
          <Button key={option.value} onClick={() => setSort(option.value)}>
            {sort === option.value ? `✓ ${option.label}` : option.label}
          </Button>
        ))}
      </div>

      {/* 축제 목록 */}
      <List
        items={filtered}
        renderItem={(festival) => (
          <Card onClick={() => navigate(`/festivals/${festival.id}`)}>
            <p>{festival.school}</p>
            <p>{festival.name}</p>
            <p>{festival.date} · {festival.location}</p>
          </Card>
        )}
      />
    </div>
  )
}