import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md sm:p-8">
        <h2 className="text-2xl font-bold mb-2 text-emerald-700 text-center">
          Login
        </h2>
        <p className="text-sm mb-6 text-gray-700 text-center">
          Welcome back! Enter your login details below to continue.
        </p>

        {error && <p className="mb-2 text-red-500 text-left">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       focus:border-emerald-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       focus:border-emerald-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg
                       hover:bg-emerald-500 hover:text-white transition font-semibold text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm sm:text-base">
          Don't Have An Account?{" "}
          <Link className="text-emerald-600 underline font-semibold" to="/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;