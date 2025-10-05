import React, { useState } from "react";
import { Mail, KeyRound } from "lucide-react";
import apiClientJson from "../../utils/api/apiClientJson";
import globalApi from "../../utils/api/globalApi";


const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setMessage({ type: "", text: "" });
    try {
      setLoading(true);
      const subUrl="/api/v1/email/send-email-otp"
      const res=await globalApi.post(subUrl, { email });
      console.log(res)
      setOtpSent(true);
      setMessage({ type: "success", text: "OTP sent to your email." });
    } catch (err) {
      console.log(err)
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to send OTP." });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setMessage({ type: "", text: "" });
    try {
      setLoading(true);
      await globalApi.post("/api/v1/email/verify-email-otp", { email,  otp });
      setMessage({ type: "success", text: "Email verified successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "OTP verification failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Verify Email</h2>

        {message.text && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={otpSent}
              required
            />
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>

          {!otpSent ? (
            <button
              onClick={sendOtp}
              disabled={loading || !email}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <KeyRound className="absolute left-3 top-3.5 text-gray-400" size={20} />
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading || !otp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
