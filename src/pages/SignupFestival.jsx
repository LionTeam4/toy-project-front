import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signup } from '../apis/auth'

export default function SignupFestival() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    username,
    password,
    nickname,
    myschool,
    birth,
    profile,
  } = location.state || {}

  const [likeschool, setLikeschool] = useState('')

  const handleSubmit = async () => {
    try {
      const response = await signup({
        username,
        password,
        nickname,
        profile,
        myschool,
        birth,
        likearea: "서울",
        likeschool,
      })

      console.log("회원가입 성공")
      console.log(response.data)
      navigate('/login')

    } catch(error) {
      console.error("회원가입 실패")
      console.log(error.response)
      console.log(error.response.data)
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col px-[50px] pt-[60px]">

        {/* 제목 */}
        <div className="mb-[40px]">
          <h2 className="text-[25px] font-bold text-gray-900 leading-[136%] font-sans">
            반가워요!<br />관심있는 축제를 선택해주세요
          </h2>
        </div>

        {/* 관심 학교 입력 */}
        <div>
          <p className="text-[15px] font-semibold leading-[136%] tracking-[-0.01em] text-gray-900 mb-1 font-sans">
            관심 학교
          </p>
          <input
            placeholder="관심있는 학교명을 입력해주세요"
            value={likeschool}
            onChange={(e) => setLikeschool(e.target.value)}
            className="w-[318px] h-[55px] rounded-[20px] bg-gray-50 px-4 text-[15px] font-medium leading-[136%] tracking-[-0.01em] text-gray-900 placeholder:text-black/30 outline-none font-sans"
          />
        </div>

        {/* 다음 버튼 — 하단 고정 */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
          <div className="w-full max-w-[393px] px-[38px] pb-8 pt-4 bg-white">
            <button
              onClick={handleSubmit}
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