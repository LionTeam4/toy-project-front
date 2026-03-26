const TextArea = ({placeholder, value, onChange}) => {
  return (
    <textarea
    className="textarea"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    />
  );
};

export default TextArea;