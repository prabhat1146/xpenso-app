import React, { useState, useEffect } from "react";
import { auth } from "../auth/firebase/firebase"; // your firebase.js path
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import apiClientJson from "../utils/api/apiClientJson";
import { Link } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";

const countryCodes = [
  { code: "+1", label: "USA" },
  { code: "+91", label: "India" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "Australia" },
];

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    countryCode: "+91",
    mobile: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setupRecaptcha = () => {
    if (!auth) {
      console.error("Firebase auth not initialized");
      return;
    }

    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal",
            callback: (response) => {
              console.log("reCAPTCHA solved", response);
            },
          }
        );
      } catch (err) {
        console.error("Recaptcha setup failed:", err);
      }
    }
  };

  const sendOTP = async () => {
    setError("");
    setSuccess("");
    try {
      console.log("failed1");
      setupRecaptcha();

      console.log("failed2");

      const phone = formData?.countryCode + formData.mobile.replace(/^0+/, "");
      const appVerifier = window?.recaptchaVerifier;

      console.log(phone, window.recaptchaVerifier, auth);

      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      console.log(result);
      setConfirmationResult(result);
      setShowOTP(true);
      setSuccess("OTP sent successfully!");
    } catch (err) {
      setError("Failed to send OTP: " + err.message);
    }
  };

  const verifyOTPAndSignup = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await confirmationResult?.confirm(otp); // Firebase OTP verify

      const fullMobile =
        formData.countryCode + formData.mobile.replace(/^0+/, "");
      const payload = { ...formData, mobile: fullMobile };
      delete payload.countryCode;

      await apiClientJson.post("/api/v1/auth/sign-up", payload);

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
      setOtp("");
      setShowOTP(false);
    } catch (err) {
      setError("OTP verification or signup failed: " + err.message);
      console.log(err);
    }
    setLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (showOTP) {
      verifyOTPAndSignup();
    } else {
      sendOTP();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-blue-50 to-cyan-100 px-4">
      {loading && <FullScreenLoader />}
      <div
        className={`max-w-full w-full md:w-3/4 lg:w-1/2 bg-slate-800 shadow-lg rounded-lg p-10 transform transition-opacity transition-transform duration-700 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          Sign Up
        </h2>

        {error && (
          <p className="bg-red-700 text-red-100 px-4 py-2 mb-6 rounded text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-700 text-green-100 px-4 py-2 mb-6 rounded text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-3 md:space-y-0">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="rounded-md bg-slate-700 border border-slate-600 px-3 py-3 text-slate-200 w-full md:w-3/4"
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
              className="rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200 w-full"
              required
            />
          </div>

          {showOTP && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200"
              required
            />
          )}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border px-5 py-3 text-slate-200"
            required
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name (optional)"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border px-5 py-3 text-slate-200"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border px-5 py-3 text-slate-200"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border px-5 py-3 text-slate-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md bg-slate-700 border px-5 py-3 text-slate-200"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md shadow-md transition transform hover:scale-105 hover:shadow-xl duration-300"
          >
            {showOTP ? "Verify OTP & Sign Up" : "Send OTP"}
          </button>

          <div
            className="my-8 text-center flex justify-self-center"
            id="recaptcha-container"
          ></div>
          <div className="text-white text-center">
            <Link to="/pages/user/login" className="underline text-cyan-300">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
