const Card = ({children, onClick}) => {
  return (
    <div 
      className={`bg-white rounded-2xl p-4 shadow-sm ${onClick ? 'cursor-pointer active:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
      >
        {children}
      </div>
  );
};

export default Card;