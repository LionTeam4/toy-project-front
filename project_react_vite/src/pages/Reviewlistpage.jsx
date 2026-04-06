import { useState, useEffect } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import List from '../components/List'
import ContentTabs from '../components/ContentTabs'

const DUMMY_REVIEWS = [ 
  { id: 1, festivalName: '이화여대 대동제', author: '유저A', content: '라인업이 정말 좋았어요!', rating: 5, likes: 24, createdAt: '2026-04-01' },
  { id: 2, festivalName: '연세대 아카라카', author: '유저B', content: '분위기 최고였습니다.',     rating: 4, likes: 18, createdAt: '2026-04-02' },
  { id: 3, festivalName: '부산대 고리',     author: '유저C', content: '부산까지 간 보람 있었어요.', rating: 5, likes: 9, createdAt: '2026-04-03' },
]

const SORT_OPTIONS = [
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
]

export default function Reviewlistpage() {
    const [reviews, setReview]      = useState([])
    const [keyword, setKeyword]     = useState('')
    const [sort, setSort]           = useState('latest')
    const [filtered, setFiltered]   = useState([])

    useEffect(() => {
        // TODO: API 호출로 교체 
        setReviews(DUMMY_REVIEWS)
    }, [])

    useEffect (() => {
        let result = [...reviews]
        if (keyword.trim()) {
            result = result.filter((r) =>
            r.festivalName.includes(keyword) || r.content.includes(keyword)
            )
        }
        result.sort((a, b) => 
            sort === 'popular'
                ? b.likes - a.likes
                : new Date(b.breateAt) - new Date(a.createdAt)
        )
        setFiltered(result)
    }, [reviews, keyword, sort])

    return (
    <div>
      <ContentTabs />
      <h1>후기</h1>

      <Input
        placeholder="축제명, 후기 내용 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div>
        {SORT_OPTIONS.map((opt) => (
          <Button key={opt.value} onClick={() => setSort(opt.value)}>
            {sort === opt.value ? `✓ ${opt.label}` : opt.label}
          </Button>
        ))}
      </div>

      <List
        items={filtered}
        renderItem={(review) => (
          <Card>
            <p>{review.festivalName}</p>
            <p>{review.content}</p>
            <p>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
            <p>{review.author} · 좋아요 {review.likes}</p>
          </Card>
        )}
      />
    </div>
  )
}
