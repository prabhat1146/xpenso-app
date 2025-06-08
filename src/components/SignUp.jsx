import React, { useState, useEffect } from "react";
import apiClientJson from "../utils/api/apiClientJson";
import { Link } from "react-router-dom";

const countryCodes = [
  { code: "+1", label: "USA" },
  { code: "+91", label: "India" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "Australia" },
  // add more as needed
];

const Signup = () => {
  const [formData, setFormData] = useState({
    countryCode: "+91", // default country code
    mobile: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Merge country code and mobile, remove leading zero if any
      const normalizedMobile =
        formData.mobile.startsWith("0")
          ? formData.mobile.slice(1)
          : formData.mobile;

      const fullMobile = formData.countryCode + normalizedMobile;

      const payload = {
        ...formData,
        mobile: fullMobile,
      };
      delete payload.countryCode; // remove from payload as mobile includes it now

      const data = await apiClientJson.post("/api/v1/user/sign-up", payload);

      setSuccess("Signup successful!");
      setFormData({
        countryCode: "+91",
        mobile: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-50 to-cyan-100 px-4">
      <div
        className={`max-w-md w-full bg-slate-800 shadow-lg rounded-lg p-10 transform transition-opacity transition-transform duration-700 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          Sign Up
        </h2>

        {error && (
          <p className="bg-red-700 bg-opacity-70 text-red-200 px-4 py-2 mb-6 rounded text-center font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-700 bg-opacity-70 text-green-200 px-4 py-2 mb-6 rounded text-center font-medium">
            {success}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Country code select + mobile input side by side */}
          <div className="flex space-x-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="rounded-md bg-slate-700 border border-slate-600 px-3 py-3 text-slate-200 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              {countryCodes.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label} ({code})
                </option>
              ))}
            </select>

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="flex-grow rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-transform duration-200"
            required
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name (optional)"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-transform duration-200"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-transform duration-200"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-transform duration-200"
            required
          />
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
            Sign Up
          </button>
          <div className="text-white">
            <Link to={"/pages/user/login"}>Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
