import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Spanlinks from "./Spanlinks";
import { LuEye, LuEyeClosed } from "react-icons/lu";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });
      console.log("✅ User data saved in Firestore!");

      navigate("/login");
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";
      if (err.code === "auth/email-already-in-use")
        errorMessage = "Email is already in use!";
      if (err.code === "auth/weak-password")
        errorMessage = "Password should be at least 6 characters!";
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
      <h2 className="text-4xl font-bold mb-12">Register Now</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[400px] rounded-md bg-gray-50 p-8 justify-center space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-4 mb-4 rounded-md border border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none"
          required
        />
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
          onClick={togglePasswordVisibility}
          disabled={loading}
          className="mt-4 bg-gray-700 text-white rounded-md p-2 cursor-pointer transition-all ease-in-out duration-300 focus:bg-gray-950"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-gray-500 mt-4">
        Already have an account? Please <Spanlinks text="Login" to="/login" />{" "}
        here.
      </p>
    </div>
  );
}

export default Register;
