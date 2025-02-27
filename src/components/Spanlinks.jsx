import { Link } from "react-router-dom";

const Spanlinks = ({ text, path }) => {
  return (
    <div>
      <Link to={path}>{text}</Link>
    </div>
  );
};

export default Spanlinks;
