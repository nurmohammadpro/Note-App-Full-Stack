import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to the Note App
      </h1>
      <p className="text-gray-500 mb-8">
        Save you important notes anytime & access from anywhere
      </p>
      <div className="flex gap-4">
        <Button title="Login" type="submit" onClick={handleLogin} />
        <Button title="Register" type="submit" onClick={handleRegister} />
      </div>
    </div>
  );
};

export default Homepage;
