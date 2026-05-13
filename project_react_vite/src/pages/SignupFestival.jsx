import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SCHOOLS = {
  'ㄱ': ['가야대학교', '가야대학교'],
  'ㄴ': ['나야대학교', '나야대학교', '나야대학교', '나야대학교', '나야대학교'],
}

export default function SignupFestival() {
  const navigate = useNavigate()
  const [selectedSchools, setSelectedSchools] = useState([])

  const toggleSchool = (key) => {
    setSelectedSchools((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    )
  }

  const handleSubmit = () => {
    navigate('/login')
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

        {/* 학교 검색창 */}
        <div className="relative flex items-center border-b-2 border-primary pb-2 mb-6">
          <input
            placeholder="학교명을 검색하세요"
            className="flex-1 text-[15px] font-medium leading-[136%] tracking-[-0.01em] placeholder:text-black/60 outline-none bg-transparent font-sans"
          />
          <button className="cursor-pointer flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="7" stroke="#000000" strokeWidth="2"/>
              <line x1="14" y1="14" x2="19" y2="19" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* 학교 목록 */}
        <div className="flex flex-col gap-4">
          {Object.entries(SCHOOLS).map(([consonant, schools]) => (
            <div key={consonant}>
              <p className="text-xs text-gray-400 mb-2 font-sans">{consonant}</p>
              <div className="flex flex-wrap gap-2">
                {schools.map((school, i) => {
                  const key = `${consonant}-${i}`
                  return (
                    <button
                      key={key}
                      onClick={() => toggleSchool(key)}
                      className={`w-[96px] h-[43px] rounded-[18px] text-sm cursor-pointer font-sans ${
                        selectedSchools.includes(key)
                          ? 'border-2 border-primary text-gray-900 bg-primary/10'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      {school}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
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