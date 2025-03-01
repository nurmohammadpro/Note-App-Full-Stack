const Button = ({ title, type, onClick }) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="bg-gray-700 text-white focus:bg-gray-950 px-4 py-2 rounded-md cursor-pointer"
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
