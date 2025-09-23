import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ProfileSelector from "../components/ProfileSelector";

const Register = () => {
  const [name, setName] = useState("");
  const [profilePic, setprofilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full 
                      max-w-md 
                      sm:max-w-lg 
                      md:max-w-xl 
                      lg:max-w-2xl 
                      xl:max-w-3xl 
                      bg-white 
                      p-6 sm:p-8 md:p-10 
                      rounded-lg shadow-lg 
                      transition-all duration-300">

        <h2 className="text-3xl font-bold mb-2 text-emerald-700 text-center">
          Register
        </h2>
        <p className="text-sm mb-6 text-gray-700 text-center">
          Join Us Today By Entering Your Details Below.
        </p>

        <div className="mb-4 flex justify-center">
          <ProfileSelector image={profilePic} setImage={setprofilePic} />
        </div>

        {error && <p className="mb-2 text-red-500 text-left">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-emerald-500
                         focus:border-emerald-500 transition"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-emerald-500
                         focus:border-emerald-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-emerald-500
                         focus:border-emerald-500 transition"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-emerald-500
                         focus:border-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg
                       hover:bg-emerald-500 hover:text-white transition
                       font-semibold text-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm sm:text-base">
          Already Have An Account?{" "}
          <Link
            className="text-emerald-600 underline font-semibold"
            to="/login"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;