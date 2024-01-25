import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized error, e.g., redirect to login
            console.log("User is not authorized");
          } else {
            // Handle other errors
            console.error("Error fetching user profile:", response.statusText);
          }
          return;
        }

        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        // Handle unexpected errors
        console.error("Unexpected error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center p-2">
      <Link to="/" className="logo font-bold">
        My Blog
      </Link>
      <nav className="flex gap-[15px]">
        {username && (
          <>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to="/create"
            >
              Create new Post
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </>
        )}

        {!username && (
          <>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              to="/login"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
