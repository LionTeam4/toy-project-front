import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { login as loginAPI } from '../apis/auth'
import useAuthStore from '../store/useAuthStore'
import useToastStore from '../store/useToastStore'
import kakao from '../assets/kakao.svg'
import apple from '../assets/apple.svg'

export default function LoginPage() {
  const navigate    = useNavigate()
  const location    = useLocation()
  const { login } = useAuthStore()
  const { showToast } = useToastStore()

  const [email, setEmail]                 = useState('')
  const [emailFocus, setEmailFocus]       = useState(false)
  const [password, setPassword]           = useState('')
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [error, setError]                 = useState('')

  const from = location.state?.from?.pathname ?? '/'

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('아이디와 비밀번호를 입력해주세요.', 'error')
      return
    }

    try {
      const response = await loginAPI({
        username: email,
        password,
      })

      console.log('로그인 성공')
      console.log(response.data)

      const { id, access, refresh, username } = response.data

      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)

      login({
        id,
        username,
      })

      showToast('로그인되었습니다!', 'success')

      navigate('/')
    }

    catch(error){
      console.log(error.response?.data)

      showToast('로그인 실패', 'error')
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col relative">

        {/* 로고 */}
        <div className="flex justify-center pt-[146px] mb-[120px]">
          <h1 className="text-center text-primary text-[50.972px] leading-[120%] font-bold font-a2z">
            wagle
          </h1>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-3 px-[38px] mb-4">

          {/* 아이디 */}
          <div className={`w-full h-[55px] rounded-[20px] bg-gray-50 px-4 flex items-center ${
            emailFocus ? 'border-2 border-primary' : ''
          }`}>
            <input
              type="text"
              placeholder="아이디 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 focus:placeholder:text-transparent outline-none bg-transparent font-sans"
            />
          </div>

          {/* 비밀번호 */}
          <div className={`w-full h-[55px] rounded-[20px] bg-gray-50 px-4 flex items-center ${
            passwordFocus ? 'border-2 border-primary' : ''
          }`}>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 focus:placeholder:text-transparent outline-none bg-transparent font-sans"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center mb-3 font-sans">{error}</p>
        )}

        {/* 로그인 버튼 */}
        <div className="px-[38px] mb-4">
          <button
            onClick={handleLogin}
            className={`w-full h-[55px] rounded-[20px] font-semibold text-[15px] transition-colors cursor-pointer font-sans ${
              email && password
                ? 'bg-primary text-gray-900'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            로그인
          </button>
        </div>

        {/* 비밀번호 찾기 | 회원가입 */}
        <div className="flex items-center justify-center gap-3 px-[96px] mb-[121.16px]">
          <button className="text-xs text-gray-400 font-sans">비밀번호 찾기</button>
          <span className="text-xs text-gray-200">|</span>
          <Link to="/signup" className="text-xs text-gray-400 font-sans">회원가입</Link>
        </div>

        {/* SNS 로그인 */}
        <div className="flex justify-center">
          <div className="w-full max-w-[393px] bg-white pb-10 pt-4 flex flex-col items-center gap-4">
            <p className="text-xs text-gray-400 font-sans">SNS계정으로 간편로그인하세요</p>
            <div className="flex gap-4">
              <button className="cursor-pointer">
                <img
                  src={kakao}
                  alt="카카오 로그인"
                  className="rounded-[23.5px] w-[41px] h-[41.939px]"
                />
              </button>
              <button className="flex items-center justify-center bg-black cursor-pointer rounded-[23.5px] w-[45px] h-[45.841px]">
                <img
                  src={apple}
                  alt="애플 로그인"
                  className="rounded-[17px] w-[34px] h-[33.161px]"
                />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}