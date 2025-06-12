import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import globalApi from "../../utils/api/globalApi";

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        middleName: user.middleName || "",
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

    const suburl = "/api/v1/user/update-user-settings";
    const payload = formData;
    globalApi
      .post(suburl, payload)
      .then((res) => {
        if (res.success) {
          setSuccess(res?.data?.message);
        } else {
          if (res?.error === "Invalid or expired token.") {
            setError("You are not logged in.");
          } else {
            setError(res?.error);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    setSuccess("")
    setError("")
  },[formData])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Settings</h1>

      {error && (
        <div className="mb-6 p-4 text-red-800 bg-red-100 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 text-green-800 bg-green-100 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Profile Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-md border px-4 py-3"
              required
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
              className="rounded-md border px-4 py-3"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-md border px-4 py-3"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mt-6 w-full rounded-md border px-4 py-3"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            contentEditable={false}
            disabled={true}
            className="mt-4 w-full rounded-md border px-4 py-3 cursor-not-allowed"
            required
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Change Password
          </h2>

          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full pr-12 rounded-md border px-4 py-3"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((p) => !p)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showCurrentPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="relative mt-4">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full pr-12 rounded-md border px-4 py-3"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((p) => !p)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="relative mt-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full pr-12 rounded-md border px-4 py-3"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </section>

        {/* <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Preferences
          </h2>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="receiveEmails"
              checked={formData.receiveEmails}
              onChange={handleChange}
              className="form-checkbox h-5 w-5"
            />
            <span>Receive promotional emails</span>
          </label>
          <label className="flex items-center space-x-3 mt-4">
            <input
              type="checkbox"
              name="darkMode"
              checked={formData.darkMode}
              onChange={handleChange}
              className="form-checkbox h-5 w-5"
            />
            <span>Enable dark mode</span>
          </label>
        </section> */}

        <div className="pt-6 border-t flex justify-end">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-cyan-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
