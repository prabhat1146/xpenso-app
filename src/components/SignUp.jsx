// ...imports remain unchanged

import { Link } from "react-router-dom";
import apiClientJson from "../utils/api/apiClientJson";
import { useEffect, useState } from "react";
import FullScreenLoader from "./FullScreenLoader";

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

  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [verifiedMobile, setVerifiedMobile] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  

  const countryCodes = [
  { code: "+1", label: "United States" },
  { code: "+7", label: "Russia" },
  { code: "+20", label: "Egypt" },
  { code: "+27", label: "South Africa" },
  { code: "+30", label: "Greece" },
  { code: "+31", label: "Netherlands" },
  { code: "+32", label: "Belgium" },
  { code: "+33", label: "France" },
  { code: "+34", label: "Spain" },
  { code: "+36", label: "Hungary" },
  { code: "+39", label: "Italy" },
  { code: "+40", label: "Romania" },
  { code: "+41", label: "Switzerland" },
  { code: "+43", label: "Austria" },
  { code: "+44", label: "United Kingdom" },
  { code: "+45", label: "Denmark" },
  { code: "+46", label: "Sweden" },
  { code: "+47", label: "Norway" },
  { code: "+48", label: "Poland" },
  { code: "+49", label: "Germany" },
  { code: "+51", label: "Peru" },
  { code: "+52", label: "Mexico" },
  { code: "+53", label: "Cuba" },
  { code: "+54", label: "Argentina" },
  { code: "+55", label: "Brazil" },
  { code: "+56", label: "Chile" },
  { code: "+57", label: "Colombia" },
  { code: "+58", label: "Venezuela" },
  { code: "+60", label: "Malaysia" },
  { code: "+61", label: "Australia" },
  { code: "+62", label: "Indonesia" },
  { code: "+63", label: "Philippines" },
  { code: "+64", label: "New Zealand" },
  { code: "+65", label: "Singapore" },
  { code: "+66", label: "Thailand" },
  { code: "+81", label: "Japan" },
  { code: "+82", label: "South Korea" },
  { code: "+84", label: "Vietnam" },
  { code: "+86", label: "China" },
  { code: "+90", label: "Turkey" },
  { code: "+91", label: "India" },
  { code: "+92", label: "Pakistan" },
  { code: "+93", label: "Afghanistan" },
  { code: "+94", label: "Sri Lanka" },
  { code: "+95", label: "Myanmar" },
  { code: "+98", label: "Iran" },
  { code: "+212", label: "Morocco" },
  { code: "+213", label: "Algeria" },
  { code: "+216", label: "Tunisia" },
  { code: "+218", label: "Libya" },
  { code: "+220", label: "Gambia" },
  { code: "+221", label: "Senegal" },
  { code: "+222", label: "Mauritania" },
  { code: "+223", label: "Mali" },
  { code: "+224", label: "Guinea" },
  { code: "+225", label: "Ivory Coast" },
  { code: "+226", label: "Burkina Faso" },
  { code: "+227", label: "Niger" },
  { code: "+228", label: "Togo" },
  { code: "+229", label: "Benin" },
  { code: "+230", label: "Mauritius" },
  { code: "+231", label: "Liberia" },
  { code: "+232", label: "Sierra Leone" },
  { code: "+233", label: "Ghana" },
  { code: "+234", label: "Nigeria" },
  { code: "+235", label: "Chad" },
  { code: "+236", label: "Central African Republic" },
  { code: "+237", label: "Cameroon" },
  { code: "+238", label: "Cape Verde" },
  { code: "+239", label: "São Tomé and Príncipe" },
  { code: "+240", label: "Equatorial Guinea" },
  { code: "+241", label: "Gabon" },
  { code: "+242", label: "Republic of the Congo" },
  { code: "+243", label: "Democratic Republic of the Congo" },
  { code: "+244", label: "Angola" },
  { code: "+245", label: "Guinea-Bissau" },
  { code: "+246", label: "British Indian Ocean Territory" },
  { code: "+247", label: "Ascension Island" },
  { code: "+248", label: "Seychelles" },
  { code: "+249", label: "Sudan" },
  { code: "+250", label: "Rwanda" },
  { code: "+251", label: "Ethiopia" },
  { code: "+252", label: "Somalia" },
  { code: "+253", label: "Djibouti" },
  { code: "+254", label: "Kenya" },
  { code: "+255", label: "Tanzania" },
  { code: "+256", label: "Uganda" },
  { code: "+257", label: "Burundi" },
  { code: "+258", label: "Mozambique" },
  { code: "+260", label: "Zambia" },
  { code: "+261", label: "Madagascar" },
  { code: "+262", label: "Réunion" },
  { code: "+263", label: "Zimbabwe" },
  { code: "+264", label: "Namibia" },
  { code: "+265", label: "Malawi" },
  { code: "+266", label: "Lesotho" },
  { code: "+267", label: "Botswana" },
  { code: "+268", label: "Eswatini" },
  { code: "+269", label: "Comoros" },
  { code: "+290", label: "Saint Helena" },
  { code: "+291", label: "Eritrea" },
  { code: "+297", label: "Aruba" },
  { code: "+298", label: "Faroe Islands" },
  { code: "+299", label: "Greenland" }
];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalSignup = async () => {
    setError("");
    setSuccess("");
    try {
      if(!verifiedEmail && !verifiedMobile){
        return setError("Kindly verify atleast one")
      }

      setShowOTP(false);
      setSuccess("SignUp successfull. \nKindly login now.");
    } catch (err) {
      setError("Failed to send OTP: " + (err.response?.data?.message || err.message));
    }
  };

  const verifyMobileOTP = async () => {
    setError("");
    setSuccess("");
    try {
      const fullMobile = formData.countryCode + formData.mobile.replace(/^0+/, "");
      await apiClientJson.post("/api/v1/moile/verify-mobile-otp", {
        mobile: fullMobile,
        otp: mobileOtp,
      });
      setVerifiedMobile(true);
      setSuccess("✅ Mobile number verified.");
    } catch (err) {
      setError("Mobile OTP verification failed: " + (err.response?.data?.message || err.message));
    }
  };

  

  const verifyEmailOTP = async () => {
    setError("");
    setSuccess("");
    try {
      const payload= {
        email: formData.email,
        otp: emailOtp,
      }
      // console.log(payload)
      await apiClientJson.post("/api/v1/email/verify-email-otp",payload);
      setVerifiedEmail(true);
      setSuccess("✅ Email verified.");
    } catch (err) {
      setError("Email OTP verification failed: " + (err.response?.data?.message || err.message));
    }
  };

  // sendOTP
  const sendOTP = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      

      const fullMobile = formData.countryCode + formData.mobile.replace(/^0+/, "");
      const payload = { ...formData, mobile: fullMobile };
      delete payload.countryCode;

      await apiClientJson.post("/api/v1/auth/sign-up", payload);

      setSuccess("OTP sent to both mobile and email.");
      setFormData({
        ...formData,
        countryCode: "+91",
        firstName: "",
        middleName: "",
        lastName: "",
        password: "",
      });
      setMobileOtp("");
      setEmailOtp("");
      setShowOTP(true);
      setVerifiedEmail(false);
      setVerifiedMobile(false);
    } catch (err) {
      setError("Sending OTP failed: " + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (showOTP) {
      handleFinalSignup();
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
        <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Sign Up</h2>

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

          {showOTP && (
            <>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="mobileOtp"
                  placeholder="Enter Mobile OTP"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  className="flex-1 rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200"
                  required
                />
                <button
                  type="button"
                  onClick={verifyMobileOTP}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
                >
                   {verifiedMobile?"Verified":"Verify Mobile OTP"}
                </button>
              </div>

              <div className="flex gap-3 mt-3">
                <input
                  type="text"
                  name="emailOtp"
                  placeholder="Enter Email OTP"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="flex-1 rounded-md bg-slate-700 border border-slate-600 px-5 py-3 text-slate-200"
                  required
                />
                <button
                  type="button"
                  onClick={verifyEmailOTP}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md"
                >
                   {verifiedEmail?"Verified":"Verify Email OTP"}
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md shadow-md transition transform hover:scale-105 hover:shadow-xl duration-300 mt-4"
          >
            {showOTP ? "Complete Signup" : "Send OTPs"}
          </button>

          <div className="text-white text-center">
            <Link to="/pages/user/login" className="underline text-cyan-300">
              Already have an account? Login
            </Link>
            <Link to="/pages/verification/email" className="underline text-cyan-300">
              Verify Eamil
            </Link>
            <Link to="/pages/verification/mobile" className="underline text-cyan-300">
              Verify Mobile
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
