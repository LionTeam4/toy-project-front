const Input = ({type = "text", placeholder, value, onChange, onKeyDown}) => {
  return (
    <input 
      type={type}
      placeholder={placeholder} 
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="w-full bg-[#F6F6F6] border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm text-[#191919] placeholder: text-[#A8A8A8] outline-none focus:border-[#33FE88] transition-colors"
    />
  );
};

export default Input;