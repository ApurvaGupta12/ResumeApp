import { useEffect, useState } from "react"; 
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const selectedRole = localStorage.getItem("selectedRole");
    if (selectedRole) {
      setRole(selectedRole.toLowerCase());
    }
  }, []);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/api/v1/auth/login", form);

    const token = response.data.token;
    console.log("Received token from login:", token);

    // Store token
    localStorage.setItem("token", token);

    // Get user profile
    const profileRes = await axios.get("http://localhost:8080/api/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = profileRes.data;
    localStorage.setItem("user", JSON.stringify(user));

    // Role check based on selection
    const selectedRole = localStorage.getItem("selectedRole");
    if (selectedRole && selectedRole !== user.role) {
      alert(`You selected ${selectedRole}, but your role is ${user.role}`);
      return;
    }

    alert("Login successful!");
    
    // Navigate based on role
    if (user.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else {
       navigate("/home");
    }

    //  Force reload to re-init app state (Navbar/ProtectedRoute)
    setTimeout(() => {
      window.location.reload();
    }, 100);

  } catch (error) {
    console.error("Login failed", error);
    alert("Invalid email or password");
  }
};

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-lg text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-lg text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Sign in
          </button>
        </form>

        {/* Signup Redirect */}
        {/* Signup Redirect */}
      {role !== "admin" && (
        <p className="mt-8 text-center text-base text-gray-600">
          Don't have an account?{" "}
          <a
            href="/auth/sign-up"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up here
          </a>
        </p>
      )}
      </div>
    </div>
  );
}

