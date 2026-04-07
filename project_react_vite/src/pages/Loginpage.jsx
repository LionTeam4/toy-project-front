import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'

// 와이어프레임 2.1 로그인
// - 이메일 입력
// - 비밀번호 입력
// - 로그인 버튼
// - 회원가입 링크
export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  // 로그인 후 원래 가려던 경로로 복귀, 없으면 홈
  const from = location.state?.from?.pathname ?? '/'

  const handleLogin = () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }
    setError('')
    // TODO: 로그인 API 호출 후 login() 실행
    login({ email, nickname: '테스트유저', isOnboardingCompleted: true })
    navigate(from, { replace: true })
  }

  return (
    <div>
      <h1>로그인</h1>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <Button onClick={handleLogin}>로그인</Button>
      <p>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  )
}