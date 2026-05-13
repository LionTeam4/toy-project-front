import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignupProfile() {
  const navigate = useNavigate()

  const [nickname, setNickname]     = useState('')
  const [school, setSchool]         = useState('')
  const [gender, setGender]         = useState('')
  const [error, setError]           = useState('')
  const [schoolOpen, setSchoolOpen] = useState(false)
  const [birthOpen, setBirthOpen]   = useState(false)
  const [birth, setBirth]           = useState('')

  const handleNext = () => {
    if (!nickname || !school) {
      setError('닉네임과 학교를 입력해주세요.')
      return
    }
    setError('')
    navigate('/signup/festival')
  }

  const BIRTH_OPTIONS = ['2000년', '2001년', '2002년', '2003년', '2004년', '2005년']

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* 프로필 사진 */}
        <div className="flex justify-center pt-[80px] mb-[50px]">
          <div className="relative flex items-center justify-center w-[142px] h-[142px]">
            {/* 그라데이션 테두리 링 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="142" height="142" viewBox="0 0 142 142" fill="none" className="absolute">
              <circle cx="71" cy="71" r="68.5" stroke="url(#paint0_linear_108_693)" strokeWidth="5"/>
              <defs>
                <linearGradient id="paint0_linear_108_693" x1="58" y1="13.5" x2="142" y2="142" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#33FE88"/>
                  <stop offset="1" stopColor="white"/>
                </linearGradient>
              </defs>
            </svg>
            {/* 카메라 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
              <g transform="translate(8, 0)">
                <path d="M0 3.07389L2.98606 0H9.91171L13.3745 3.14916L0 3.07389Z" fill="#33FE88"/>
              </g>
              <g transform="translate(0, 4)">
                <path d="M27.6399 0H2.10781C0.943697 0 0 0.943698 0 2.10781V21.0655C0 22.2296 0.943697 23.1733 2.10781 23.1733H27.6399C28.804 23.1733 29.7477 22.2296 29.7477 21.0655V2.10781C29.7477 0.943698 28.804 0 27.6399 0Z" fill="#33FE88"/>
                <g transform="translate(7.5, 4)">
                  <path d="M7.38986 13.5251C10.7783 13.5251 13.5251 10.7783 13.5251 7.38986C13.5251 4.00147 10.7783 1.25464 7.38986 1.25464C4.00147 1.25464 1.25464 4.00147 1.25464 7.38986C1.25464 10.7783 4.00147 13.5251 7.38986 13.5251Z" stroke="white" strokeWidth="2.50929" strokeMiterlimit="10"/>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-[38px]">

          {/* 닉네임 */}
          <div>
            <p className="text-[15px] font-semibold leading-[136%] tracking-[-0.01em] text-gray-900 mb-1 font-sans">
              닉네임
            </p>
            <input
              placeholder="15자 이내 영문, 숫자로 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-[318px] h-[55px] rounded-[20px] bg-gray-50 px-4 text-[15px] font-medium leading-[136%] tracking-[-0.01em] text-gray-900 placeholder:text-black/30 outline-none font-sans"
            />
          </div>

          {/* 학교 */}
          <div>
            <p className="text-[15px] font-semibold leading-[136%] tracking-[-0.01em] text-gray-900 mb-1 font-sans">
              학교
            </p>
            <div className="relative">
              <button
                onClick={() => setSchoolOpen((prev) => !prev)}
                className="w-[318px] h-[55px] rounded-[20px] bg-gray-50 px-4 flex items-center justify-between cursor-pointer"
              >
                <span className={`text-[15px] font-medium font-sans ${school ? 'text-gray-900' : 'text-transparent'}`}>
                  {school || '　'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                  <path d="M1 1L7 8" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M13 1L7 8" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              {schoolOpen && (
                <div className="absolute top-[60px] left-0 w-[318px] bg-white rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-10 overflow-hidden">
                  {['이화여자대학교', '연세대학교', '고려대학교', '서강대학교', '성균관대학교'].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSchool(s); setSchoolOpen(false) }}
                      className="w-full px-4 py-3 text-left text-[15px] text-gray-900 hover:bg-gray-50 cursor-pointer font-sans"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <p className="text-[15px] font-semibold leading-[136%] tracking-[-0.01em] text-gray-900 mb-1 font-sans">
              생년월일
            </p>
            <div className="relative">
              <button
                onClick={() => setBirthOpen((prev) => !prev)}
                className="w-[318px] h-[55px] rounded-[20px] bg-gray-50 px-4 flex items-center justify-between cursor-pointer"
              >
                <span className={`text-[15px] font-medium font-sans ${birth ? 'text-gray-900' : 'text-transparent'}`}>
                  {birth || '　'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                  <path d="M1 1L7 8" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M13 1L7 8" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              {birthOpen && (
                <div className="absolute top-[60px] left-0 w-[318px] bg-white rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-10 overflow-hidden">
                  {BIRTH_OPTIONS.map((b) => (
                    <button
                      key={b}
                      onClick={() => { setBirth(b); setBirthOpen(false) }}
                      className="w-full px-4 py-3 text-left text-[15px] text-gray-900 hover:bg-gray-50 cursor-pointer font-sans"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 성별 */}
          <div>
            <p className="text-[15px] font-semibold leading-[136%] tracking-[-0.01em] text-gray-900 mb-2 font-sans">
              성별
            </p>
            <div className="flex gap-2">
              {['여성', '남성', '기타'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`w-[87px] h-[43px] rounded-[18px] text-sm cursor-pointer font-sans ${
                    gender === g
                      ? 'bg-white border border-primary text-gray-900'
                      : 'bg-gray-50 text-gray-900'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

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