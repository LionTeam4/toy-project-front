// src/pages/Mypage.jsx
import useAuth from '../hooks/useAuth';

export default function Mypage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>마이페이지</h1>
      <p>안녕하세요, <strong>{user?.nickname || '사용자'}</strong>님!</p>
      <p>이메일: {user?.email || '정보 없음'}</p>
      {/* 여기에 내가 쓴 글 목록 등을 추가할 수 있습니다. */}
    </div>
  );
}