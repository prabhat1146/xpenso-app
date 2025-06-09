import React, { useState, useEffect } from "react";

const Settings = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    receiveEmails: false,
    darkMode: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        receiveEmails: user.receiveEmails || false,
        darkMode: user.darkMode || false,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await onUpdate(formData);
      setSuccess("Settings updated successfully.");
    } catch (err) {
      setError("Failed to update settings.");
    }
  };

  if (!user) return <div className="text-center py-12">Loading user data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Settings</h1>

      {error && <div className="mb-6 p-4 text-red-800 bg-red-100 rounded">{error}</div>}
      {success && <div className="mb-6 p-4 text-green-800 bg-green-100 rounded">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Profile Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mt-6 w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-6 w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </section>

        {/* Change Password */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Change Password</h2>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-4 w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="mt-4 w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Preferences</h2>
          <label className="inline-flex items-center space-x-3">
            <input
              type="checkbox"
              name="receiveEmails"
              checked={formData.receiveEmails}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-cyan-600"
            />
            <span className="text-gray-700">Receive promotional emails</span>
          </label>

          <label className="inline-flex items-center space-x-3 mt-4">
            <input
              type="checkbox"
              name="darkMode"
              checked={formData.darkMode}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-cyan-600"
            />
            <span className="text-gray-700">Enable dark mode</span>
          </label>
        </section>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-300 transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
