import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import apiClientJson from "../utils/api/apiClientJson";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const location=useLocation();

  const { identifier, countryCode } = location?.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const payload = identifier?.includes("@")
        ? { email: identifier, newPassword,confirmNewPassword:confirmPassword }
        : { mobile: countryCode + identifier, newPassword,confirmNewPassword:confirmPassword };

        const res = await apiClientJson.post(
            "/api/v1/auth/reset-password",
            payload
        );
        
        
        console.log(res)
        setSuccess(res?.data?.message || "Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
    } catch (err) {
        // console.log(err)
      setError(err?.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="max-w-md w-full bg-slate-800 shadow-xl rounded-2xl p-8">
        <h3 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Set New Password
        </h3>

        {error && (
          <p className="bg-red-700 bg-opacity-70 text-red-200 px-4 py-2 mb-4 rounded text-center font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-700 bg-opacity-70 text-green-200 px-4 py-2 mb-4 rounded text-center font-medium">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-md bg-slate-700 border border-slate-600 pl-10 pr-12 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md bg-slate-700 border border-slate-600 pl-10 pr-12 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md shadow-md transition transform hover:scale-105 hover:shadow-xl duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
