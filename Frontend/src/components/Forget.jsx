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
        `${process.env.REACT_APP_API_BASE_URL}/api/accounts/forgot-password/`,
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
    <div
      className="w-full h-screen flex justify-center items-start"
      style={{
        backgroundColor: "#F6F6F6",
        overflowX: "hidden",
      }}
    >
      {/* Outer Card */}
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className="bg-white rounded-[4px] flex justify-center items-start relative"
          style={{ width: "580px", minHeight: "884px" }}
        >

          <button onClick={() => window.history.back()} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition">
            {/* SVG Back Icon */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15 30C6.7155 30 0 23.2845 0 15C0 6.7155 6.7155 0 15 0C23.2845 0 30 6.7155 30 15C30 23.2845 23.2845 30 15 30ZM15 28.2C18.5009 28.2 21.8583 26.8093 24.3338 24.3338C26.8093 21.8583 28.2 18.5009 28.2 15C28.2 11.4991 26.8093 8.14167 24.3338 5.66619C21.8583 3.19071 18.5009 1.8 15 1.8C11.4991 1.8 8.14167 3.19071 5.66619 5.66619C3.19071 8.14167 1.8 11.4991 1.8 15C1.8 18.5009 3.19071 21.8583 5.66619 24.3338C8.14167 26.8093 11.4991 28.2 15 28.2ZM17.9985 20.1555L16.4295 21.75L10.935 16.0845C10.6554 15.7927 10.4993 15.4042 10.4993 15C10.4993 14.5958 10.6554 14.2073 10.935 13.9155L16.4295 8.25L18 9.8445L13.02 15L18 20.157L17.9985 20.1555Z" fill="#272612" />
            </svg>
          </button>

          {/* Inner Card */}
          <div className="bg-white rounded-[12px] flex flex-col items-center p-8" style={{ width: "398px", minHeight: "484px", marginTop: "111px" }}>
            {/* Branding & Info */}
            <div className="self-start mt-8">
              <h1
                className="font-poppins font-semibold text-[40px] leading-[100%] tracking-[0px] text-[rgb(94,91,41)]"
              >
                Univa
              </h1>

              <p
                className="font-poppins font-normal text-[20px] leading-[100%] tracking-[0px] text-gray-600 mb-4 mt-6"
              >
                Connect. Create. Commerce.
              </p>

              <h2
                className="font-poppins font-semibold text-[26px] leading-[100%] tracking-[0px] text-gray-800 mb-4 mt-6"
              >
                Forgot Password?
              </h2>


              <p
                className="font-poppins font-normal text-[18px] leading-[100%] tracking-[0px] text-[#73725E] mb-6 max-w-[360px]"
              >
                Enter Your Email or Phone Number and We’ll Send a Link to Reset Your Password.
              </p>



            </div>
            <div className="relative mb-1 w-full">
              <label
                className="font-poppins font-normal text-[16px] leading-[100%] tracking-[0px] text-[#666666] mb-1 block"
              >
                Email Or Phone Number
              </label>

              <input
                type="text"
                placeholder="You@Example.com"
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

            {/* Back to Login */}
            <p
              className="font-poppins font-normal text-[16px] leading-[100%] tracking-[0px] text-center text-[#666666] mt-8 w-full"
            >
              <span
                onClick={() => navigate('/login')}
                className="cursor-pointer hover:underline"
              >
                ← Back to Login
              </span>
            </p>


          </div>
        </div>
      </div>
    </div>

  );
};

export default Forget;
