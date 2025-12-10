import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Forget = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);         // ✅ Added for showing OTP
  const [userId, setUserId] = useState(null); // store user_id
  const navigate = useNavigate();

  const validateInput = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (emailRegex.test(value)) return "email";
    if (phoneRegex.test(value)) return "phone";
    return false;
  };

  const sendOtp = async () => {
    const type = validateInput(input);
    if (!type) return alert("Please enter a valid Email OR 10-digit Phone number!");

    setLoading(true);
    try {
      const payload = type === "email" ? { email: input } : { phone_number: input };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/forgot-password/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Store OTP & user_id for testing
      setOtp(response.data.otp || null);
      setUserId(response.data.user_id || null);

      console.log("OTP (for testing):", response.data.otp);
      console.log("User ID:", response.data.user_id);

      alert(response.data.message || "OTP sent successfully!");
      
      // Navigate to OTP page with input & type & user_id
      navigate("/otp", { state: { input, type, userId: response.data.user_id } });
    } catch (error) {
      console.error(error.response || error);
      const msg = error.response?.data?.error || "Failed to send OTP. Try again!";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-start pt-16 px-4">
      {/* Outer Card */}
      <div className="bg-white rounded-[4px] flex justify-center items-start relative" style={{ width: "580px", minHeight: "600px" }}>
        <button onClick={() => window.history.back()} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition">
          {/* SVG Back Icon */}
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15 30C6.7155 30 0 23.2845 0 15C0 6.7155 6.7155 0 15 0C23.2845 0 30 6.7155 30 15C30 23.2845 23.2845 30 15 30ZM15 28.2C18.5009 28.2 21.8583 26.8093 24.3338 24.3338C26.8093 21.8583 28.2 18.5009 28.2 15C28.2 11.4991 26.8093 8.14167 24.3338 5.66619C21.8583 3.19071 18.5009 1.8 15 1.8C11.4991 1.8 8.14167 3.19071 5.66619 5.66619C3.19071 8.14167 1.8 11.4991 1.8 15C1.8 18.5009 3.19071 21.8583 5.66619 24.3338C8.14167 26.8093 11.4991 28.2 15 28.2ZM17.9985 20.1555L16.4295 21.75L10.935 16.0845C10.6554 15.7927 10.4993 15.4042 10.4993 15C10.4993 14.5958 10.6554 14.2073 10.935 13.9155L16.4295 8.25L18 9.8445L13.02 15L18 20.157L17.9985 20.1555Z" fill="#272612"/>
          </svg>
        </button>

        {/* Inner Card */}
        <div className="bg-white rounded-[12px] flex flex-col items-center p-8" style={{ width: "391px", minHeight: "567px" }}>
          {/* Branding & Info */}
          <div className="self-start mt-8">
            <h1 className="text-[rgb(94,91,41)] text-3xl font-bold tracking-wider">Univa</h1>
            <p className="text-gray-600 font-medium">connect. create. commerce.</p><br/>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Forgot Password?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email or phone number and we’ll send a link to reset your password.
            </p>
          </div>
          <div className="relative mb-1 w-full">
            <label
      className="mb-1 text-start "
      style={{
        fontFamily: "Poppins",
        fontWeight: 400, // Medium
        fontSize: "16px",
        lineHeight: "100%",
        textAlign: "start",
        textTransform: "capitalize",
        width: "190px",
        height: "24px",
        opacity: 1,
        text:"rgba(102, 102, 102, 1)"

      }}
    >
email or phone number   
 </label>
            <input
              type="text"
              placeholder="Email OR Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Send Reset Link Button */}
          <button
            onClick={sendOtp}
            className="w-full py-3 rounded-lg text-white font-semibold mt-4 hover:opacity-90 transition"
            style={{ backgroundColor: '#5E5B29' }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-6 w-full">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-sm text-gray-500 font-medium">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-600 mt-auto w-full">
            <span onClick={() => navigate("/login")} className="text-sm cursor-pointer hover:underline font-medium">
              ← Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forget;
  