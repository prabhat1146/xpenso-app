import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithPhoneNumber ,RecaptchaVerifier} from "firebase/auth";
import axios from "axios";

export default function VerifyOTP() {
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };

  const sendOTP = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) return;

    try {
      const result = await confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();

      const res = await axios.post("http://localhost:5000/verify-token", {
        idToken,
      });

      alert("Backend Response: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Phone OTP Login</h2>

        <div className="space-y-4">
          <input
            type="tel"
            placeholder="Phone (+91XXXXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendOTP}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Send OTP
          </button>

          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={verifyOTP}
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </div>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
