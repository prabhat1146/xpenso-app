import React, { useState } from "react";
import apiClientJson from "../utils/api/apiClientJson"; // Your global API client

const ForgotPassword = () => {
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default India
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!mobile.match(/^\d{6,15}$/)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    const fullMobile = countryCode + mobile;

    try {
      setLoading(true);
      await apiClientJson.post("/api/v1/user/forgot-password", { mobile: fullMobile });
      setSuccess("If this mobile is registered, a reset link or OTP has been sent.");
      setMobile("");
    } catch (err) {
      setError(err.message || "Failed to send reset request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-50 to-cyan-100 px-4">
      <div className="max-w-md w-full bg-slate-800 shadow-lg rounded-lg p-10">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          Forgot Password
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-2">
            <select
              className="rounded-md bg-slate-700 border border-slate-600 px-3 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              {/* Add more country codes as needed */}
            </select>

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="flex-1 rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
              pattern="[0-9]{6,15}"
              title="Enter valid mobile number"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md shadow-md
              transition transform hover:scale-105 hover:shadow-xl duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
