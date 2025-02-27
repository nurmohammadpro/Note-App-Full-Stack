const Button = ({ title, type, onClick }) => {
  return (
    <div>
      <button type={type} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
