import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import butter from '../assets/butter.svg'
import FestivalCard from '../components/FestivalCard'

const DUMMY_POSTS = [
  { id: 1, name: '이화여자대학교', school: '이화여자대학교', content: '이화여자대학교 대동제 버터떡 판다', posterUrl: butter },
  { id: 2, name: '축제 추천 받음', school: '연세대학교',     content: '5월 22일 축제 추천 받는다',        posterUrl: null },
  { id: 3, name: '이대 라인업',   school: '이화여자대학교', content: '이대 라인업 누구임',               posterUrl: null },
]

export default function PostListPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setPosts(DUMMY_POSTS)
  }, [])

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
          소통
        </p>
        <button onClick={() => navigate('/community/new')} className="cursor-pointer flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.6234 0.334243L1.13799 11.8196C0.966299 11.9909 0.853715 12.2124 0.816615 12.4521L0.0131635 17.6876C-0.0139482 17.8645 0.000950014 18.0452 0.0566523 18.2152C0.112355 18.3852 0.207296 18.5397 0.333795 18.6662C0.460293 18.7927 0.614796 18.8876 0.784799 18.9433C0.954802 18.999 1.13553 19.0139 1.31236 18.9868L6.54904 18.1834C6.78856 18.1466 7.01012 18.0344 7.18154 17.8631L18.6669 6.37779C18.8805 6.16407 19.0006 5.87425 19.0006 5.57206C19.0006 5.26987 18.8805 4.98004 18.6669 4.76633L14.2337 0.333104C14.02 0.119801 13.7304 0 13.4285 0C13.1266 0 12.837 0.119801 12.6234 0.333104M2.50215 16.499L3.01271 13.1667L13.4291 2.75029L16.2497 5.57206L5.83334 15.9884L2.50215 16.499Z" fill="black"/>
            <path d="M10.6221 4.92352L11.8301 3.71436L15.5248 7.40681L14.3157 8.61598L10.6221 4.92352Z" fill="black"/>
          </svg>
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="flex flex-col gap-3 absolute top-[113px] left-[31px]">
        {posts.map((post, index) => (
          <FestivalCard
            key={post.id}
            festival={post}
            index={index}
            type="소통"
            titleField="name"
            subField="content"
            onClick={() => navigate(`/community/${post.id}`)}
          />
        ))}
      </div>

    </div>
  )
}