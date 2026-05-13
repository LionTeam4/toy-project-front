import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import useAppStore from '../store/useAppStore';
import detail_butter from '../assets/detail_butter.svg'
import profile from '../assets/profile.svg'

const DUMMY_POSTS = {
  1: {
    id: 1,
    title: '이화여대 버터떡',
    school: '이화여자대학교',
    author: '유저A',
    content: '이화여대 축제에 버터떡 파는 부스 어디인가요',
    imageUrl: detail_butter,
    likes: 30,
    createdAt: '2025.03.12',
    type: '소통',
  },
};

const Postpage = () => <PostDetailPage />;

// ── PostDetailPage ────────────────────────────────────────────
export function PostDetailPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showDialog } = useAppStore();

  const [post, setPost]           = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment]     = useState('');

  useEffect(() => {
    const data = DUMMY_POSTS[Number(id)] ?? null;
    setPost(data);
    setIsLoading(false);
  }, [id]);

  const handleDelete = () => {
    showDialog(
      '게시글 삭제',
      '정말 삭제하시겠습니까?',
      () => navigate('/community'),
      () => {}
    );
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">불러오는 중...</p>
    </div>
  );
  if (!post) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm font-sans">게시글을 찾을 수 없습니다.</p>
    </div>
  );

  const isAuthor = user?.nickname === post.author;

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* 상단 헤더 */}
      <div className="bg-white flex items-center justify-between px-[34px] h-[82px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="text-[13.58px] font-bold text-gray-900 leading-[136%] tracking-[-0.01em] font-sans">
          소통
        </p>
        <button onClick={handleDelete} className="cursor-pointer text-gray-900 font-bold">⋮</button>
      </div>

      {/* 이미지 영역 */}
      {post.imageUrl && (
        <div className="w-[393px] h-[300px] overflow-hidden rounded-b-[18px]">
          <img
            src={post.imageUrl}
            alt="게시글 이미지"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      )}

      <div className="px-[34px] pt-4">

        {/* 소통 태그 */}
        <div className="mb-2">
          <span className="inline-flex items-center justify-center w-[49px] h-[29px] rounded-[10.86px] bg-primary/30 text-white text-[10.86px] font-bold leading-[136%] tracking-[-0.01em] font-sans">
            {post.type ?? '소통'}
          </span>
        </div>

        {/* 제목 */}
        <h1 className="text-gray-900 text-[21.2px] font-bold leading-[136%] tracking-[-0.01em] mb-1 font-sans">
          {post.title}
        </h1>

        {/* 날짜 */}
        <p className="text-[13px] font-normal leading-[136%] tracking-[-0.01em] text-black/50 mb-4 font-sans">
          {post.createdAt} 작성
        </p>

        {/* 학교 태그 */}
        <div className="mb-4">
          <span className="border border-gray-900 text-gray-900 text-xs px-3 py-1.5 rounded-full font-sans">
            {post.school}
          </span>
        </div>

        {/* 본문 */}
        <p className="text-gray-900 text-[13px] font-normal leading-[136%] tracking-[-0.01em] mb-6 font-sans">
          {post.content}
        </p>

        {/* 댓글 */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img src={profile} alt="프로필" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 font-sans">아기사자</p>
            <p className="text-sm text-gray-900 mt-0.5 font-sans">
              학문관 12번 부스에파는 버터떡이 맛있어요 맛있어요
            </p>
            <p className="text-xs text-gray-400 mt-1 font-sans">03.27 13:41</p>
          </div>
        </div>

      </div>

      {/* 댓글 입력창 — 하단 고정 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-[393px] bg-white px-[29px] py-3">
          <div className="flex items-center border border-gray-900 rounded-[20px] px-4 gap-2 w-[335px] h-[55px]">
            <input
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 text-sm outline-none placeholder:text-gray-400 bg-transparent font-sans"
            />
            <button className="cursor-pointer flex-shrink-0">
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
  );
}

// ── PostNewPage ───────────────────────────────────────────────
export function PostNewPage() {
  const navigate     = useNavigate();
  const { pathname } = useLocation();
  const fileInputRef = useRef(null);
  const { showToast } = useAppStore();

  const [type, setType]             = useState(pathname.includes('reviews') ? '후기' : '소통');
  const [title, setTitle]           = useState('');
  const [school, setSchool]         = useState('이화여자대학교');
  const [content, setContent]       = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError]           = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }
    showToast('게시글이 성공적으로 등록되었습니다!', 'success');
    navigate('/community');
  };

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).replace(/\. /g, '.').replace('.', '')

  return (
    <div className="bg-white min-h-screen pb-24">

      {/* 상단 헤더 */}
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
          placeholder="이화여대 버터떡"
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
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[14px] font-bold leading-[136%] tracking-[-0.01em] text-gray-900 font-sans">학교 선택</p>
            <button className="text-[28px] font-bold leading-none text-gray-900 cursor-pointer">+</button>
          </div>
          {school && (
            <span className="inline-flex items-center justify-center bg-gray-50 rounded-[18px] w-[96px] h-[35px]">
              <p className="text-[10.86px] font-bold leading-[136%] tracking-[-0.01em] text-center text-gray-900 font-sans">
                {school}
              </p>
            </span>
          )}
        </div>

        {type === '소통' && (
          <div>
            <p className="text-[14px] font-bold leading-[136%] tracking-[-0.01em] text-gray-900 mb-2 font-sans">이미지 추가</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {previewUrl
              ? <img src={previewUrl} alt="미리보기" className="w-[118px] h-[118px] rounded-[10.86px] object-cover" />
              : <button
                  onClick={() => fileInputRef.current.click()}
                  className="w-[118px] h-[118px] rounded-[10.86px] flex items-center justify-center cursor-pointer border border-gray-900"
                >
                  <span className="text-[28px] font-bold leading-[136%] tracking-[-0.01em] text-center text-gray-900">
                    +
                  </span>
                </button>
            }
          </div>
        )}

        {error && <p className="text-red-400 text-xs font-sans">{error}</p>}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-[393px] px-[38px] pb-8 pt-4 bg-white">
          <button
            onClick={handleSubmit}
            className="w-[318px] h-[56px] rounded-[20px] bg-primary cursor-pointer"
          >
            <span className="text-[15px] font-semibold leading-[136%] tracking-[-0.01em] text-center text-gray-900 font-sans">
              업로드
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PostEditPage ──────────────────────────────────────────────
export function PostEditPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { showToast } = useAppStore();

  const [type, setType]       = useState('소통');
  const [title, setTitle]     = useState('');
  const [school, setSchool]   = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const post = DUMMY_POSTS[Number(id)];
    if (post) {
      setTitle(post.title);
      setSchool(post.school);
      setContent(post.content);
      setType(post.type ?? '소통');
    }
  }, [id]);

  const handleSubmit = () => {
    showToast('게시글이 수정되었습니다!', 'success');
    navigate(`/community/${id}`);
  };

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
            <p className="text-sm font-bold text-gray-900 font-sans">학교 선택</p>
            <button className="text-primary font-bold text-lg cursor-pointer leading-none">+</button>
          </div>
          {school && (
            <span className="bg-primary-light text-gray-900 text-xs px-3 py-1 rounded-full font-sans">{school}</span>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="w-full max-w-[393px] px-6 pb-8 pt-4 bg-white">
          <Button onClick={handleSubmit}>업로드</Button>
        </div>
      </div>
    </div>
  );
}

export default Postpage;