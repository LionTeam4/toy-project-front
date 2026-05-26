export default function FestivalCard({
  festival,
  index = 0,
  onClick,
  type = '정보',
  titleField = 'school',   // 추가
  subField = 'date',       // 추가
}) {
  return (
    <div
      onClick={onClick}
      className="
        relative
        h-[121px]
        w-[332px]
        cursor-pointer
        rounded-[10.86px]
        bg-white
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
        transition-opacity
        active:opacity-80
      "
    >
      {/* 뱃지 */}
      <div className="pl-4 pt-4">
        <span className="inline-flex h-[29px] w-[49px] items-center justify-center rounded-[10.86px] bg-primary/30 text-[10.86px] font-bold leading-[136%] tracking-[-0.01em] text-white font-sans">
          {type}
        </span>
      </div>

      {/* 타이틀 + 서브 */}
      <div className="ml-4 mt-[21px] flex flex-col gap-[2px]">
        <p className="text-[14px] font-bold leading-[136%] tracking-[-0.01em] text-gray-900 font-sans">
          {festival[titleField]}
        </p>
        <p className="mt-[5px] text-[11px] font-normal leading-[136%] tracking-[-0.01em] text-gray-900 font-sans">
          {festival[subField]}
        </p>
      </div>

      {/* 포스터 */}
      <div className="absolute right-[16px] top-[18px] h-[86px] w-[84px] overflow-hidden rounded-[11px] bg-gray-200">
        {festival.poster && (
          <img src={festival.poster} alt={festival.name} className="h-full w-full object-cover" />
        )}
        <div className="absolute right-[6px] top-[6px] z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 14" fill="none">
            <path
              d="M6.44071 0.483629C6.65025 -0.161288 7.56264 -0.161289 7.77219 0.483628L8.96991 4.16985C9.06362 4.45827 9.33239 4.65354 9.63565 4.65354H13.5116C14.1897 4.65354 14.4716 5.52127 13.923 5.91985L10.7873 8.19806C10.542 8.37631 10.4393 8.69227 10.533 8.98069L11.7308 12.6669C11.9403 13.3118 11.2022 13.8481 10.6536 13.4495L7.51789 11.1713C7.27255 10.9931 6.94034 10.9931 6.695 11.1713L3.55931 13.4495C3.01071 13.8481 2.27257 13.3118 2.48212 12.6669L3.67984 8.98069C3.77356 8.69227 3.6709 8.37631 3.42555 8.19806L0.289867 5.91985C-0.258733 5.52127 0.0232093 4.65354 0.701316 4.65354H4.57724C4.8805 4.65354 5.14927 4.45827 5.24298 4.16985L6.44071 0.483629Z"
              fill={index === 0 ? 'white' : 'none'}
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}