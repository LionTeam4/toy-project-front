const Button = ({children, onClick, variant = 'primary'}) => {
  const styles = {
    primary: 'bg-[#33FE88] text-[#191919] font-semibold w-full py-3 rounded-xl active:opacity-80',
    outline: 'border border-[#E0E0E0] text-[#191919] bg-white font-medium px-4 py-1.5 rounded-lg active:opacity-70',
    text: 'text-[#606060] font-medium px-0 py-1 underline-offset-2',
  }
  return (
    <button  
      className={`${styles[variant]} cursor-pointer transition-opacity text-sm`}
      onClick={onClick}
    >
      {children}
    </button>
  )
};

export default Button;