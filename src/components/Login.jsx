import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import apiClientJson from "../utils/api/apiClientJson";
import { useAuth } from "../context/AuthContext";
import FullScreenLoader from "./FullScreenLoader";
import Alert from "./Alert";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    countryCode: "+91",
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const fullMobile = `${formData.countryCode}${formData.mobile}`;

      const payload = {
        mobile: fullMobile,
        password: formData.password,
      };

      const { data } = await apiClientJson.post("/api/v1/auth/login", payload);

      //   localStorage.setItem("accessToken", data?.data?.accessToken);
      //   localStorage.setItem("refreshToken", data?.data?.refreshToken);
      //   localStorage.setItem("Token", data?.data?.refreshToken);
        console.log(data)
      login(
        data?.data?.accessToken,
        data?.data?.refreshToken,
        data?.data?.user
      );
      //   <Navigate to={"/pages/user/in/dashboard"} replace/>
      setLoading(false);
      navigate("/pages/user/in/dashboard", { replace: true });
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || err.message || "Login failed";
      setError(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-50 to-cyan-100 px-4">
        {loading && <FullScreenLoader/>}
       
      <div
        className={`max-w-md w-full bg-slate-800 shadow-lg rounded-lg p-10 transform transition-opacity transition-transform duration-700 ease-out
          ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          ExpenseApp Login
        </h2>

        {error && (
          <p className="bg-red-700 bg-opacity-70 text-red-200 px-4 py-2 mb-6 rounded text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="w-1/3 rounded-md bg-slate-700 border border-slate-600 px-3 py-3 text-slate-200
              focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              {/* Add more countries as needed */}
            </select>

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-2/3 rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-transform duration-200"
              required
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-transform duration-200"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md shadow-md
              transition transform hover:scale-105 hover:shadow-xl duration-300"
          >
            Login
          </button>

          <div className="text-white flex flex-col gap-1">
            <Link to={"/pages/user/sign-up"}>Not have an account? Sign Up</Link>
            <div className="flex flex-row justify-between">
              <Link to={"/pages/user/forgot-password"}>Forgot password</Link>
              <Link to={"/pages/user/recover-account"}>Recover account</Link>
            </div>
          </div>
        </form>
      </div>
       {/* <Alert/> */}
    </div>
  );
};

export default Login;
