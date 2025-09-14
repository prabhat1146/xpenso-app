import React, { useEffect, useState } from "react";
import apiClientJson from "../utils/api/apiClientJson"; // Your global API client
import { Navigate, useNavigate } from "react-router-dom";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidMobile = (mobile) => /^\d{6,15}$/.test(mobile);


const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState(""); // can be email or mobile
  const [countryCode, setCountryCode] = useState("+91"); // Default India
  const [otp, setOtp] = useState(""); // store OTP entered by user
  const [step, setStep] = useState(1); // 1 = enter email/mobile, 2 = enter OTP
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeout, setTimeoutValue] = useState(1)

  const navigate = useNavigate();

  // Send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    let payload = {};
    if (isValidEmail(identifier)) {
      payload = { email: identifier };
    } else if (isValidMobile(identifier)) {
      payload = { mobile: countryCode + identifier };
    } else {
      setError("Please enter a valid email or mobile number.");
      return;
    }

    try {
      setLoading(true);
      const res = await apiClientJson.post(
        "/api/v1/auth/forgot-password",
        payload
      );

      setSuccess(
        res?.data?.message ||
          "If this account exists, a reset link or OTP has been sent."
      );
      setStep(2); // move to OTP step
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to send reset request. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const payload = isValidEmail(identifier)
        ? { email: identifier, otp }
        : { mobile: countryCode + identifier, otp };

      // console.log(payload)
      const res = await apiClientJson.post(
        "/api/v1/email/verify-email-otp",
        payload
      );

      setSuccess(res?.data?.message || "OTP verified successfully.");
      setStep(3); // maybe move to reset password form
      setTimeoutValue(15);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show country code if input looks like mobile
  const showCountryCode =
    step === 1 && (isValidMobile(identifier) || /^\d*$/.test(identifier));

  useEffect(() => {
    if (timeout <= 0 & step===3) {
      // Navigate after countdown ends
      navigate("/pages/user/reset-password", {
        state: { identifier, countryCode },
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeoutValue((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [timeout, navigate, identifier, countryCode,step]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
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

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-2">
              {showCountryCode && (
                <select
                  className="w-28 rounded-md bg-slate-700 border border-slate-600 px-3 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+91">+91 (India)</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                </select>
              )}

              <input
                type="text"
                name="identifier"
                placeholder="Enter Email or Mobile Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="flex-1 rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md shadow-md transition transform hover:scale-105 hover:shadow-xl duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow-md transition transform hover:scale-105 hover:shadow-xl duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* Step 3: Reset password form can go here */}
        {step === 3 && (
          <div className="text-center text-cyan-300 font-medium">
            OTP verified ✅ Now you can reset your password.
            <p className="my-4 text-sm text-white">Page will be redirected within {timeout} seconds.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
