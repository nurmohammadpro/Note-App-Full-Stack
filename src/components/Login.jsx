import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Spanlinks from "./Spanlinks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      )
        errorMessage = "Invalid email or password!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center py-10 w-full max-w-[1280px] mx-auto">
      <h2 className="text-4xl font-bold mb-12">Login Here</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[400px] rounded-md bg-gray-50 p-8 justify-center space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 mb-4 rounded-md border border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 mb-4 rounded-md border border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none"
            required
          />
          {showPassword ? (
            <LuEye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <LuEyeClosed
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-gray-700 text-white rounded-md p-2 cursor-pointer transition-all ease-in-out duration-300 focus:bg-gray-950"
        >
          {loading ? "Loging In..." : "Login"}
        </button>
      </form>
      <p className="text-gray-500 mt-4">
        Don't have an account? Please{" "}
        <Spanlinks text="Register" to="/register" /> here.
      </p>
    </div>
  );
};

export default Login;
