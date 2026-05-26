const TextArea = ({placeholder, value, onChange}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-[#F6F6F6] border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm text-[#191919] placeholder:text-[#A8A8A8] outline-none focus:border-[#33FE88] transition-colors resize-none min-h-[120px]"
    />
  );
};

export default TextArea;