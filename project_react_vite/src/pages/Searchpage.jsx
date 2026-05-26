import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ewha from '../assets/ewha.svg'
import sogang from '../assets/sogang.svg'
import skku from '../assets/skku.svg'
import FestivalCard from '../components/FestivalCard'

const DUMMY_FESTIVALS = [
  {
    id: 1,
    name: '이화여대 대동제',
    date: '2026-05-21 ~ 2026-05-24',
    school: '이화여자대학교',
    posterUrl: ewha,
  },
  {
    id: 2,
    name: '서강대 축제',
    date: '2026-05-21 ~ 2026-05-24',
    school: '서강대학교',
    posterUrl: sogang,
  },
  {
    id: 3,
    name: '성균관대 축제',
    date: '2026-05-21 ~ 2026-05-24',
    school: '성균관대학교',
    posterUrl: skku,
  },
]

const TYPE_OPTIONS = ['전체', '소통', '후기', '정보']

export default function SearchPage() {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [results, setResults] = useState([])

  const [recentKeywords, setRecentKeywords] = useState([
    '나야대학교',
    '가야대학교',
    '트와이스',
    '투어스',
    '고려대학교',
  ])

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)

  const handleSearch = () => {
    if (!keyword.trim()) return

    setRecentKeywords((prev) => {
      const deduped = prev.filter((k) => k !== keyword)
      return [keyword, ...deduped].slice(0, 10)
    })

    const filtered = DUMMY_FESTIVALS.filter(
      (festival) =>
        festival.name.includes(keyword) ||
        festival.school.includes(keyword)
    )

    setResults(filtered)
    setHasSearched(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleDeleteRecent = (kw) => {
    setRecentKeywords((prev) => prev.filter((k) => k !== kw))
  }

  const handleDeleteAll = () => {
    setRecentKeywords([])
  }

  const handleRecentClick = (kw) => {
    setKeyword(kw)

    const filtered = DUMMY_FESTIVALS.filter(
      (festival) =>
        festival.name.includes(kw) ||
        festival.school.includes(kw)
    )

    setResults(filtered)
    setHasSearched(true)
  }

  const handleSheetConfirm = () => {
    // TODO: selectedType 기반 필터링 추가 예정
    setIsSheetOpen(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">

      {/* 상단 검색창 */}
      <div className="flex h-[82px] items-center gap-3 px-4">

        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="flex-shrink-0 cursor-pointer"
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path
              d="M6 1L1 6L6 11"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 검색 input */}
        <div
          className="
            flex
            h-[44px]
            flex-1
            items-center
            gap-2
            rounded-full
            border
            border-gray-900
            px-4
          "
        >
          <input
            placeholder="검색어를 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="
              flex-1
              bg-transparent
              text-sm
              outline-none
              placeholder:text-gray-400
              font-sans
            "
          />

          <button
            onClick={handleSearch}
            className="flex-shrink-0 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="7"
                cy="7"
                r="5"
                stroke="#000000"
                strokeWidth="1.5"
              />
              <line
                x1="11"
                y1="11"
                x2="15"
                y2="15"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 검색 전 — 최근 검색어 */}
      {!hasSearched && recentKeywords.length > 0 && (
        <div className="px-4 pt-2">

          <div className="mb-3 flex items-center justify-between">
            <p
              className="
                text-[12px]
                font-bold
                leading-[136%]
                tracking-[-0.01em]
                text-gray-900
                font-sans
              "
            >
              최근 검색어
            </p>

            <button
              onClick={handleDeleteAll}
              className="
                cursor-pointer
                text-[12px]
                font-bold
                leading-[136%]
                tracking-[-0.01em]
                text-black/30
                font-sans
              "
            >
              전체삭제
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {recentKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => handleRecentClick(kw)}
                className="
                  flex
                  h-[43px]
                  cursor-pointer
                  items-center
                  gap-1.5
                  rounded-[18px]
                  bg-gray-50
                  px-4
                "
              >
                <span
                  className="
                    text-[14px]
                    font-medium
                    leading-[136%]
                    tracking-[-0.01em]
                    text-gray-900
                    font-sans
                  "
                >
                  {kw}
                </span>

                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteRecent(kw)
                  }}
                  className="text-xs text-gray-400"
                >
                  x
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 검색 후 — 결과 */}
      {hasSearched && (
        <div className="px-4 pt-2">

          {/* 필터 */}
          <div className="mb-4 flex items-center gap-2">

            <span
              className="
                text-[12px]
                font-bold
                leading-[136%]
                text-gray-900
                font-sans
              "
            >
              최신순 ㅣ
            </span>

            <button
              onClick={() => setIsSheetOpen(true)}
              className="
                flex
                cursor-pointer
                items-center
                gap-1
                rounded-full
                border
                border-gray-200
                px-3
                py-1
                text-[12px]
                text-gray-900
                font-sans
              "
            >
              정보

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M0.5 0.5L4.5 5.5"
                  stroke="black"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5 0.5L5.5 5.5"
                  stroke="black"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* 결과 카드 */}
          <div className="flex flex-col gap-3">

            {results.length === 0 ? (
              <p
                className="
                  mt-10
                  text-center
                  text-sm
                  text-gray-400
                  font-sans
                "
              >
                검색 결과가 없습니다.
              </p>
            ) : (
              results.map((festival, index) => (
                <FestivalCard
                  key={festival.id}
                  festival={festival}
                  index={index}
                  onClick={() =>
                    navigate(`/festivals/${festival.id}`)
                  }
                />
              ))
            )}

          </div>
        </div>
      )}

      {/* 딤 */}
      {isSheetOpen && (
        <div
          onClick={() => setIsSheetOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* 바텀시트 */}
      <div
        className={`
          absolute
          bottom-0
          left-0
          right-0
          z-50
          rounded-t-[20px]
          bg-white
          px-5
          pb-8
          pt-5
          transition-transform
          duration-300
          ease-in-out
          ${
            isSheetOpen
              ? 'translate-y-0'
              : 'translate-y-full'
          }
        `}
      >

        <p
          className="
            mb-4
            text-[14px]
            font-bold
            leading-[136%]
            tracking-[-0.01em]
            text-gray-900
            font-sans
          "
        >
          유형
        </p>

        {/* 유형 선택 */}
        <div className="mb-8 flex gap-2">

          {TYPE_OPTIONS.map((type) => {
            const isSelected = selectedType === type

            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`
                  h-[43px]
                  w-[64px]
                  cursor-pointer
                  rounded-[18px]
                  text-[14px]
                  font-medium
                  leading-[136%]
                  tracking-[-0.01em]
                  text-gray-900
                  transition-colors
                  font-sans
                  ${
                    isSelected
                      ? 'border-2 border-primary bg-primary/10'
                      : 'border-none bg-gray-50'
                  }
                `}
              >
                {type}
              </button>
            )
          })}

        </div>

        {/* 보기 버튼 */}
        <button
          onClick={handleSheetConfirm}
          disabled={!selectedType}
          className={`
            mx-auto
            block
            h-[56px]
            w-[318px]
            rounded-[20px]
            text-[15px]
            font-semibold
            leading-[136%]
            tracking-[-0.01em]
            transition-colors
            font-sans
            ${
              selectedType
                ? 'cursor-pointer bg-primary text-gray-900'
                : 'cursor-not-allowed bg-[#DADADA] text-white'
            }
          `}
        >
          보기
        </button>

      </div>

    </div>
  )
}