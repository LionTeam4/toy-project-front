import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import useToastStore from '../store/useToastStore'
import useDialogStore from '../store/useDialogStore'
import profile from '../assets/profile.svg'
import { getCommunityDetail, createComment, createCommunityPost, updateCommunityPost, deleteCommunityPost } from '../apis/community'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const Postpage = () => <PostDetailPage />

// ── PostDetailPage ────────────────────────────────────────────
export function PostDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showDialog } = useDialogStore()
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()

  const [comment, setComment]           = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMenu, setShowMenu]         = useState(false)

  const { data: post, isLoading } = useQuery({
    queryKey: ['communityPost', id],
    queryFn: async () => {
      const response = await getCommunityDetail(id)
      return response.data
    },
  })

  const handleDelete = () => {
    showDialog(
      '게시글 삭제',
      '정말 삭제하시겠습니까?',
      async () => {
        try {
          await deleteCommunityPost(id)
          showToast('게시글이 삭제되었습니다.', 'success')
          navigate('/community')
        } catch (error) {
          console.error('게시글 삭제 실패', error)
          showToast('게시글 삭제 실패', 'error')
        }
      },
      () => {}
    )
  }

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return
    try {
      setIsSubmitting(true)
      const response = await createComment({
        post: Number(id),
        contents: comment,
      })

      // 캐시 무효화해서 최신 댓글 반영
      queryClient.invalidateQueries({ queryKey: ['communityPost', id] })

      showToast('댓글이 등록되었습니다!', 'success')
      setComment('')
    } catch (error) {
      console.error('댓글 작성 실패', error)
      showToast('댓글 등록에 실패했습니다.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">불러오는 중...</p>
    </div>
  )
  if (!post) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">게시글을 찾을 수 없습니다.</p>
    </div>
  )

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* 상단 헤더 */}
      <div className="bg-white flex items-center justify-between px-[34px] h-[82px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="text-[13.58px] font-bold text-gray-900 leading-[136%] tracking-[-0.01em] font-sans">소통</p>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="cursor-pointer text-gray-900 font-bold">⋮</button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg border w-[120px] overflow-hidden z-50">
              <button
                onClick={() => navigate(`/community/edit/${id}`)}
                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50"
              >
                수정하기
              </button>
              <button
                onClick={() => { setShowMenu(false); handleDelete() }}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-50"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 이미지 영역 */}
      {post.image && (
        <div className="w-[393px] h-[300px] overflow-hidden rounded-b-[18px]">
          <img
            src={`${BASE_URL}${post.image}`}
            alt="게시글 이미지"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      )}

      <div className="px-[34px] pt-4">
        <div className="mb-2">
          <span className="inline-flex items-center justify-center w-[49px] h-[29px] rounded-[10.86px] bg-primary/30 text-white text-[10.86px] font-bold leading-[136%] tracking-[-0.01em] font-sans">
            소통
          </span>
        </div>
        <h1 className="text-gray-900 text-[21.2px] font-bold leading-[136%] tracking-[-0.01em] mb-1 font-sans">{post.title}</h1>
        <p className="text-[13px] font-normal leading-[136%] tracking-[-0.01em] text-black/50 mb-4 font-sans">{post.created?.slice(0, 10)} 작성</p>
        <div className="mb-4">
          <span className="border border-gray-900 text-gray-900 text-xs px-3 py-1.5 rounded-full font-sans">{post.school}</span>
        </div>
        <p className="text-gray-900 text-[13px] font-normal leading-[136%] tracking-[-0.01em] mb-6 font-sans">{post.contents}</p>

        {post.comments?.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3 mb-6">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img src={profile} alt="프로필" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm text-gray-900 mt-0.5 font-sans">{comment.contents}</p>
              <p className="text-xs text-gray-400 mt-1">{comment.created?.slice(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-[393px] bg-white px-[29px] py-3">
          <div className="flex items-center border border-gray-900 rounded-[20px] px-4 gap-2 w-[335px] h-[55px]">
            <input
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 text-sm outline-none placeholder:text-gray-400 bg-transparent font-sans"
            />
            <button onClick={handleCommentSubmit} disabled={isSubmitting} className="cursor-pointer flex-shrink-0">
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

// ── PostNewPage ───────────────────────────────────────────────
export function PostNewPage() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()
  const fileInputRef = useRef(null)
  const { showToast } = useToastStore()

  const [type, setType]             = useState(pathname.includes('reviews') ? '후기' : '소통')
  const [title, setTitle]           = useState('')
  const [school, setSchool]         = useState('이화여자대학교')
  const schools = ['이화여자대학교', '연세대학교', '고려대학교', '서강대학교']
  const [content, setContent]       = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [error, setError]           = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해주세요.')
      return
    }
    try {
      const response = await createCommunityPost({ title, school, contents: content })
      showToast('게시글이 등록되었습니다!', 'success')
      navigate('/community')
    } catch (error) {
      console.error('게시글 작성 실패', error)
      showToast('게시글 등록 실패', 'error')
    }
  }

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).replace(/\. /g, '.').replace('.', '')

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="px-[34px] pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="cursor-pointer mb-4">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-[13px] font-medium text-gray-900 outline-none cursor-pointer bg-white rounded-[18px] px-3 leading-[136%] tracking-[-0.01em] block w-[58px] h-[29px] border border-gray-900 font-sans"
        >
          <option value="소통">소통</option>
          <option value="후기">후기</option>
        </select>
      </div>

      <div className="px-[34px] flex flex-col gap-4">
        <input
          placeholder="제목 작성하기"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-[21.2px] font-bold text-gray-900 outline-none placeholder:text-gray-900 w-full font-sans"
        />
        <p className="text-[13px] font-normal text-black/50 -mt-2 font-sans">{today}</p>
        <div className="border-t border-gray-100" />
        <div className="flex gap-2 items-start">
          <textarea
            placeholder="ㅣ 클릭해서 작성하기"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 text-[12px] font-normal leading-[136%] tracking-[-0.01em] text-gray-900 outline-none placeholder:text-gray-900 resize-none min-h-[200px] w-full font-sans"
          />
        </div>
        <div>
          <p className="text-[14px] font-bold leading-[136%] tracking-[-0.01em] text-gray-900 mb-2 font-sans">학교 선택</p>
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full h-[45px] border border-gray-300 rounded-[12px] px-4 text-sm outline-none font-sans"
          >
            {schools.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {type === '소통' && (
          <div>
            <p className="text-[14px] font-bold leading-[136%] tracking-[-0.01em] text-gray-900 mb-2 font-sans">이미지 추가</p>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {previewUrl
              ? <img src={previewUrl} alt="미리보기" className="w-[118px] h-[118px] rounded-[10.86px] object-cover" />
              : <button
                  onClick={() => fileInputRef.current.click()}
                  className="w-[118px] h-[118px] rounded-[10.86px] flex items-center justify-center cursor-pointer border border-gray-900"
                >
                  <span className="text-[28px] font-bold leading-[136%] tracking-[-0.01em] text-center text-gray-900">+</span>
                </button>
            }
          </div>
        )}
        {error && <p className="text-red-400 text-xs font-sans">{error}</p>}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-[393px] px-[38px] pb-8 pt-4 bg-white">
          <button onClick={handleSubmit} className="w-[318px] h-[56px] rounded-[20px] bg-primary cursor-pointer">
            <span className="text-[15px] font-semibold leading-[136%] tracking-[-0.01em] text-center text-gray-900 font-sans">업로드</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── PostEditPage ──────────────────────────────────────────────
export function PostEditPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { showToast } = useToastStore()

  const [type, setType]       = useState('소통')
  const [title, setTitle]     = useState('')
  const [school, setSchool]   = useState('')
  const [content, setContent] = useState('')

  const { data: postData, isLoading } = useQuery({
    queryKey: ['communityPost', id],
    queryFn: async () => {
      const response = await getCommunityDetail(id)
      return response.data
    },
  })

  // 데이터 로드되면 폼에 세팅
  useEffect(() => {
    if (postData) {
      setTitle(postData.title)
      setSchool(postData.school)
      setContent(postData.contents)
      setType('소통')
    }
  }, [postData])

  const handleSubmit = async () => {
    try {
      await updateCommunityPost(id, { title, school, contents: content })
      showToast('게시글이 수정되었습니다!', 'success')
      navigate('/community/')
    } catch (error) {
      console.error('게시글 수정 실패', error)
      showToast('게시글 수정 실패', 'error')
    }
  }

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">불러오는 중...</p>
    </div>
  )

  return (
    <div className="bg-white min-h-screen">
      <div className="px-[34px] h-[82px] flex items-center justify-between border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-[13.58px] font-bold text-gray-900 outline-none cursor-pointer bg-white border border-gray-200 rounded-full px-3 py-1 leading-[136%] tracking-[-0.01em] font-sans"
        >
          <option value="소통">소통</option>
          <option value="후기">후기</option>
        </select>
        <div className="w-[7px]" />
      </div>

      <div className="px-[34px] pt-5 flex flex-col gap-5">
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-[21.2px] font-bold text-gray-900 outline-none border-b border-gray-100 pb-3 w-full leading-[136%] tracking-[-0.01em] font-sans"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-[13px] font-normal text-gray-600 outline-none resize-none min-h-[120px] w-full leading-[136%] tracking-[-0.01em] font-sans"
        />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[14px] font-bold leading-[136%] tracking-[-0.01em] text-gray-900 font-sans">학교 선택</p>
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option value="이화여자대학교">이화여자대학교</option>
              <option value="연세대학교">연세대학교</option>
              <option value="고려대학교">고려대학교</option>
              <option value="서강대학교">서강대학교</option>
            </select>
          </div>
          {school && (
            <span className="inline-flex items-center justify-center bg-gray-50 rounded-[18px] w-auto px-4 h-[35px]">
              <p className="text-[10.86px] font-bold text-center text-gray-900 font-sans">{school}</p>
            </span>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
          <div className="w-full max-w-[393px] px-6 pb-8 pt-4 bg-white">
            <Button onClick={handleSubmit}>업로드</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Postpage