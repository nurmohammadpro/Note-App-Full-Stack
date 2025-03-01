import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import InnerLogo from "../assets/InnerLogo.png";
import UnresigteredUser from "../assets/unreguser.svg";
import RegisteredUser from "../assets/reguser.svg";
import Button from "./Button";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated:", user.uid); // Debugging
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            console.log("User data found:", userDocSnap.data()); // Debugging
            setUserData(userDocSnap.data());
          } else {
            setUserData(null);
            console.log("User data not found in Firestore");
          }
        } catch (error) {
          setUserData(null);
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
        console.log("No user is logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogOut = async () => {
    try {
      console.log("Before logout: userData =", userData);
      console.log("Before logout: auth.currentUser =", auth.currentUser);
      await signOut(auth);
      setUserData(null);
      navigate("/");
      console.log("After logout: userData =", userData);
      console.log("After logout: auth.currentUser =", auth.currentUser);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="h-18 bg-gray-200 shadow-md shadow-gray-400">
      <div className="absolute top-1 left-0 right-0 flex items-center justify-between py-2 w-full max-w-[1280px] mx-auto">
        <div>
          {location.pathname === "/dashboard" ? (
            <img src={InnerLogo} alt="" width={48} />
          ) : (
            <Link to="/">
              <img src={InnerLogo} alt="" width={48} />
            </Link>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : userData ? (
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-2">
              <h2 className="text-2xl font-bold text-gray-700">
                Welcome, {userData.name}
              </h2>
              <img src={RegisteredUser} alt="" width={32} />
              <Button title="Logout" type="submit" onClick={handleLogOut} />
            </div>
          </div>
        ) : (
          <img src={UnresigteredUser} alt="" width={32} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
