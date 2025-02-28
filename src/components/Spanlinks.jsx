import { Link } from "react-router-dom";

const Spanlinks = ({ text, to }) => {
  return (
    <span className="text-gray-600 font-bold transition-all ease-in-out duration-200 hover:underline">
      <Link to={to}>{text}</Link>
    </span>
  );
};

export default Spanlinks;
