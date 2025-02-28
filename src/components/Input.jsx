const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-2 mb-2 rounded-md border border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none ${className}`}
      />
    </div>
  );
};

export default Input;
