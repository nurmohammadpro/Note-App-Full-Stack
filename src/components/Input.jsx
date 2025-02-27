const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 p-2 mb-2 rounded-md border border-gray-100 focus:ring-1 focus:ring-gray-300 focus:outline-none"
      />
    </div>
  );
};

export default Input;
