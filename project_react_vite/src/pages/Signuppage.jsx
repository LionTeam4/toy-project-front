import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'

// 와이어프레임 1.회원가입
// step 1 (1.1): 이메일 / 비밀번호 입력
// step 2 (1.2): 닉네임 / 학교 입력
// step 3 (1.3): 관심 축제 지역 선택 (온보딩 첫 단계)
// → 완료 후 /onboarding/interests 대신 바로 메인으로 이동
//   (관심 선택을 회원가입 내에서 처리하는 와이어프레임 구조)

const REGIONS = ['서울', '경기', '인천', '부산', '대구', '광주', '대전']

export default function SignupPage() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  // step 1
  const [email, setEmail]                   = useState('')
  const [password, setPassword]             = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // step 2
  const [nickname, setNickname] = useState('')
  const [school, setSchool]     = useState('')

  // step 3 — 관심 지역 다중 선택
  const [selectedRegions, setSelectedRegions] = useState([])

  const [error, setError] = useState('')

  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    )
  }

  const handleStep1Next = () => {
    if (!email || !password || !passwordConfirm) {
      setError('모든 항목을 입력해주세요.')
      return
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    setError('')
    setStep(2)
  }

  const handleStep2Next = () => {
    if (!nickname || !school) {
      setError('닉네임과 학교를 입력해주세요.')
      return
    }
    setError('')
    setStep(3)
  }

  const handleSubmit = () => {
    if (selectedRegions.length === 0) {
      setError('관심 지역을 1개 이상 선택해주세요.')
      return
    }
    setError('')
    // TODO: 회원가입 API 호출
    console.log({ email, password, nickname, school, selectedRegions })
    navigate('/')
  }

  return (
    <div>
      <h1>회원가입</h1>

      {/* step 1: 계정 정보 */}
      {step === 1 && (
        <div>
          <h2>계정 정보</h2>
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
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {error && <p>{error}</p>}
          <Button onClick={handleStep1Next}>다음</Button>
          <p>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </div>
      )}

      {/* step 2: 프로필 정보 (와이어프레임 1.2)*/}
      {step === 2 && (
        <div>
          <h2>프로필 정보</h2>
          <Input
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            placeholder="학교 이름"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
          {error && <p>{error}</p>}
          <Button onClick={() => { setError(''); setStep(1) }}>이전</Button>
          <Button onClick={handleStep2Next}>다음</Button>
        </div>
      )}

      {/* step 3: 관심 지역 선택 (와이어프레임 1.3) */}
      {step === 3 && (
        <div>
          <h2>관심 축제 지역 선택</h2>
          <p>관심 있는 지역을 선택해주세요</p>
          <div>
            {REGIONS.map((region) => (
              <Button key={region} onClick={() => toggleRegion(region)}>
                {selectedRegions.includes(region) ? `✓ ${region}` : region}
              </Button>
            ))}
          </div>
          {error && <p>{error}</p>}
          <Button onClick={() => { setError(''); setStep(2) }}>이전</Button>
          <Button onClick={handleSubmit}>가입 완료</Button>
        </div>
      )}
    </div>
  )
}