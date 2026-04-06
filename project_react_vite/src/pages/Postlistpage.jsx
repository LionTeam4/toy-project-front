import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'
import List from '../components/List'
import ContentTabs from '../components/ContentTabs'

// 와이어프레임 6.1 소통 검색
// - 검색창
// - 필터: 인기순 / 최신순
// - 게시글 목록 (제목, 학교, 내용 미리보기, 좋아요)
// 와이어프레임 6.2 소통 게시물 목록은 별도 Postpage

const DUMMY_POSTS = [
  { id: 1, title: '이화 대동제 같이 갈 사람!', school: '이화여자대학교', content: '5월 14일 같이 갈 분 구해요', likes: 30, createdAt: '2026-04-01' },
  { id: 2, title: '연대 아카라카 후기',         school: '연세대학교',     content: '라인업 진짜 대박이었어요', likes: 12, createdAt: '2026-04-02' },
  { id: 3, title: '부산대 고리 날짜 확정!',      school: '부산대학교',     content: '5월 10일로 확정됐습니다', likes: 5,  createdAt: '2026-04-03' },
]

const SORT_OPTIONS = [
  { value: 'latest',  label: '최신순' },
  { value: 'popular', label: '인기순' },
]

export default function PostListPage() {
  const navigate = useNavigate()

  const [posts, setPosts]       = useState([])
  const [keyword, setKeyword]   = useState('')
  const [sort, setSort]         = useState('latest')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    // TODO: API 호출로 교체 — GET /community/posts
    setPosts(DUMMY_POSTS)
  }, [])

  useEffect(() => {
    let result = [...posts]

    if (keyword.trim()) {
      result = result.filter((p) =>
        p.title.includes(keyword) || p.content.includes(keyword)
      )
    }

    if (sort === 'popular') {
      result.sort((a, b) => b.likes - a.likes)
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    setFiltered(result)
  }, [posts, keyword, sort])

  return (
    <div>
      <h1>소통</h1>

      {/* 검색창 */}
      <Input
        placeholder="게시글 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* 정렬 필터 */}
      <div>
        {SORT_OPTIONS.map((option) => (
          <Button key={option.value} onClick={() => setSort(option.value)}>
            {sort === option.value ? `✓ ${option.label}` : option.label}
          </Button>
        ))}
      </div>

      {/* 글쓰기 버튼 */}
      <Button onClick={() => navigate('/community/new')}>글쓰기</Button>

      {/* 게시글 목록 */}
      <List
        items={filtered}
        renderItem={(post) => (
          <Card onClick={() => navigate(`/community/posts/${post.id}`)}>
            <p>{post.school}</p>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>좋아요 {post.likes}</p>
          </Card>
        )}
      />
    </div>
  )
}