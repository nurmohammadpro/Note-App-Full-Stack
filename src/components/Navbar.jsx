import InnerLogo from "../assets/InnerLogo.png";
import Button from "./Button";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        console.log("auth.currentUser:", user); // Check if user is authenticated
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          console.log("userDocRef:", userDocRef); // Check document reference
          const userDocSnap = await getDoc(userDocRef);
          console.log("userDocSnap:", userDocSnap); // Check document snapshot

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex items-center justify-between py-8 w-full max-w-[1280px] mx-auto">
      <div>
        <img src={InnerLogo} alt="" width={48} />
      </div>

      <div>
        <Button title="Logout" type="submit" onClick={handleLogOut} />
      </div>
    </div>
  );
};

export default Navbar;
