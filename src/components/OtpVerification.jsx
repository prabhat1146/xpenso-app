import React, { useState, useEffect, useRef } from "react";
import apiClientJson from "../utils/api/apiClientJson";

const OtpVerification = ({ mobile, onVerified }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    setMounted(true);
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Remove non-digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (index < 3 && value) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setError("Please enter the full 4-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      await apiClientJson.post("/api/v1/user/verify-otp", {
        mobile,
        otp: enteredOtp,
      });

      setSuccess("OTP verified successfully!");
      onVerified?.();
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-50 to-cyan-100 px-4">
      <div
        className={`max-w-md w-full bg-slate-800 shadow-lg rounded-lg p-10 transform transition-opacity duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Verify OTP
        </h2>

        {error && (
          <p className="bg-red-700 bg-opacity-70 text-red-200 px-4 py-2 mb-4 rounded text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-700 bg-opacity-70 text-green-200 px-4 py-2 mb-4 rounded text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between space-x-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-14 h-14 text-2xl text-center rounded bg-slate-700 border border-slate-600 text-slate-100
                  focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-transform duration-200"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md shadow-md
              transition transform hover:scale-105 hover:shadow-xl duration-300 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
