// ── PostDetailPage ────────────────────────────────────────────
// 와이어프레임 6.2 소통 게시물 상세
// - 제목 / 학교 / 작성자 / 날짜
// - 이미지 (있는 경우)
// - 본문 내용
// - 좋아요 버튼
// - 본인 글: 수정 / 삭제 버튼

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import useAuth from '../hooks/useAuth';

const DUMMY_POSTS = {
  1: {
    id: 1,
    title: '이화 대동제 같이 갈 사람!',
    school: '이화여자대학교',
    author: '유저A',
    content: '5월 14일 이화여대 대동제 같이 갈 분 구해요! 라인업도 좋고 분위기도 최고일 것 같아서요.',
    imageUrl: null,
    likes: 30,
    createdAt: '2026-04-01',
  },
};

// ── 메인 컴포넌트 (파일의 대표) ────────────────────
const Postpage = () => {
  const { id } = useParams();
  
  // URL에 id가 있으면 '상세보기', 없으면 '글쓰기' 등을 보여주도록 분기 처리를 하거나
  // 현재 구조상 이 파일은 "상세보기" 역할을 주로 수행하므로 PostDetailPage를 반환합니다.
  return <PostDetailPage />;
};

// ── PostDetailPage ────────────────────────────────────────────
export function PostDetailPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost]       = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes]     = useState(0);
  const [liked, setLiked]     = useState(false);

  useEffect(() => {
    const data = DUMMY_POSTS[Number(id)] ?? null;
    setPost(data);
    if (data) setLikes(data.likes);
    setIsLoading(false);
  }, [id]);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => liked ? prev - 1 : prev + 1);
  };

  const handleDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    navigate('/community');
  };

  if (isLoading) return <p>불러오는 중...</p>;
  if (!post)     return <p>게시글을 찾을 수 없습니다.</p>;

  const isAuthor = user?.nickname === post.author;

  return (
    <div>
      <Button onClick={() => navigate(-1)}>← 뒤로</Button>
      <div>
        <p>{post.school}</p>
        <h1>{post.title}</h1>
        <p>{post.author} · {post.createdAt}</p>
      </div>
      {post.imageUrl && <img src={post.imageUrl} alt="게시글 이미지" />}
      <p>{post.content}</p>
      <Button onClick={handleLike}>
        {liked ? '♥' : '♡'} {likes}
      </Button>
      {isAuthor && (
        <div>
          <Button onClick={() => navigate(`/community/${id}/edit`)}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </div>
      )}
    </div>
  );
}

// ── PostNewPage ───────────────────────────────────────────────
export function PostNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [school, setSchool] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }
    // 게시물 등록 로직(과제용 시뮬레이션)
    console.log("등록될 데이터:", { title, school, content });
    alert('게시글이 성공적으로 등록되었습니다!')
    
    navigate('/community');
  };

  return (
    <div>
      <h1>글쓰기</h1>
      <Input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="학교 이름" value={school} onChange={(e) => setSchool(e.target.value)} />
      <TextArea placeholder="내용을 입력해주세요" value={content} onChange={(e) => setContent(e.target.value)} />
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
      <Button onClick={() => fileInputRef.current.click()}>사진 첨부</Button>
      {previewUrl && <img src={previewUrl} alt="미리보기" width={200} />}
      {error && <p>{error}</p>}
      <Button onClick={() => navigate(-1)}>취소</Button>
      <Button onClick={handleSubmit}>등록</Button>
    </div>
  );
}

// ── PostEditPage ──────────────────────────────────────────────
export function PostEditPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [school, setSchool] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const post = DUMMY_POSTS[Number(id)];
    if (post) {
      setTitle(post.title);
      setSchool(post.school);
      setContent(post.content);
    }
  }, [id]);

  return (
    <div>
      <h1>게시글 수정</h1>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input value={school} onChange={(e) => setSchool(e.target.value)} />
      <TextArea value={content} onChange={(e) => setContent(e.target.value)} />
      <Button onClick={() => navigate(-1)}>취소</Button>
      <Button onClick={() => navigate(`/community/${id}`)}>수정 완료</Button>
    </div>
  );
}

// ⭐ 마지막에 파일의 대표인 Postpage를 내보냅니다.
export default Postpage;