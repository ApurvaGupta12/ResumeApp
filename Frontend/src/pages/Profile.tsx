import { useEffect, useState } from "react";
import  jwtDecode  from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

interface User {
  fullName: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
        alert("Your session has expired. Please login again.");
        localStorage.clear();
        navigate("/auth/sign-in");
        return;
      }

      try {
        const res = await axiosInstance.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user data", err);
        alert("Your session has expired or is invalid. Please log in again.");
        localStorage.clear();
        navigate("/auth/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/sign-in");
  };

  const handleProjectsClick = () => {
    navigate("/my-resumes");
  };

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>User data not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center space-y-6">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName.toUpperCase()}`}
          alt="avatar"
          className="mx-auto w-28 h-28 rounded-full border-4 border-indigo-300 shadow"
        />
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1">Hello, {user.fullName}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleProjectsClick}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300 shadow"
          >
            My Projects
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300 shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
