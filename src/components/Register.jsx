import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import Button from "./Button";
import Spanlinks from "./Spanlinks";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-[1280px] bg-gray-50">
      <div className=" rounded-md w-full">
        <h1>Join us Now!</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Button type="submit" text="Register" />
          <p>
            Already have an account? Please{" "}
            <Spanlinks text="Login" to="/login" /> here.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
