import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const navigate = useNavigate()

  const [email, setEmail]                     = useState('')
  const [password, setPassword]               = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError]                     = useState('')

  const handleNext = () => {
    if (!email || !password || !passwordConfirm) {
      setError('모든 항목을 입력해주세요.')
      return
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    setError('')
    navigate('/signup/profile')
  }

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col px-[38px] pt-[66px]">

        <div className="mb-[81px]">
          <h2 className="text-[25px] font-bold text-gray-900 leading-[136%] font-sans">
            반가워요!<br />회원가입을 진행해볼까요?
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <input
            placeholder="이름"
            className="w-[318px] h-[55px] rounded-[20px] bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none font-sans"
          />
          <div className="w-[318px] h-[55px] rounded-[20px] bg-gray-50 px-4 flex items-center gap-2">
            <input
              placeholder="아이디"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent font-sans"
            />
            <button className="text-gray-900 text-[15px] font-semibold leading-[136%] tracking-[-0.01em] flex-shrink-0 cursor-pointer font-sans">
              중복확인
            </button>
          </div>
          <p className="text-[13px] font-semibold leading-[136%] tracking-[-0.01em] text-black/60 font-sans">
            6~12자 영문, 숫자로 입력해주세요
          </p>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[318px] h-[55px] rounded-[20px] bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none font-sans"
          />
          <input
            type="password"
            placeholder="비밀번호확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-[318px] h-[55px] rounded-[20px] bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none font-sans"
          />
          <p className="text-[13px] font-semibold leading-[136%] tracking-[-0.01em] text-black/60 font-sans">
            비밀번호는 영문 대소문자, 숫자, 특수문자(!,@#$%)를 혼합하여 8~20자로 입력해주세요
          </p>
          {error && <p className="text-red-400 text-xs font-sans">{error}</p>}
        </div>

        {/* 다음 버튼 — 하단 고정 */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
          <div className="w-full max-w-[393px] px-[38px] pb-8 pt-4 bg-white">
            <button
              onClick={handleNext}
              className="w-[318px] h-[56px] rounded-[20px] bg-primary cursor-pointer"
            >
              <span className="text-[15px] font-semibold leading-[136%] text-center text-gray-900 font-sans">
                다음
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}