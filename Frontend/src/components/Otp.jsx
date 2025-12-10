import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [backendOtp, setBackendOtp] = useState(null); // ✅ For testing
  const [user_id, setUserId] = useState(null);         // ✅ For testing
  const inputRefs = useRef([]);
  const { state } = useLocation(); // { input, type, userId } from Forget page
  const navigate = useNavigate();
     // ✅ Added for storing user_id
  

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1].focus();
  };

    const verifyOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length < 4) return alert("Enter complete OTP");

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/accounts/verify-otp/", {
        otp: finalOtp,
        // assuming backend can identify user from email/phone in state
        email: state.type === "email" ? state.input : undefined,
        phone_number: state.type === "phone" ? state.input : undefined,
      });

      // Save user_id to localStorage
      localStorage.setItem("reset_user_id", res.data.user_id);
      alert("OTP verified successfully!");

      // Navigate to NewPassword page
      navigate("/new-password");
    } catch (err) {
      alert(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setTimeLeft(300);
    try {
      const payload = state.type === "email"
        ? { email: state.input }
        : { phone_number: state.input };

      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/forgot-password/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message || "New OTP sent!");
      setBackendOtp(res.data.otp || null); // ✅ Capture new OTP for testing
      setUserId(res.data.user_id || null);  // ✅ Update userId if backend returns
      console.log("Resent OTP (for testing):", res.data.otp);
    } catch (error) {
      console.error(error.response || error);
      alert("Failed to resend OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-start pt-16 px-4">
      <div className="bg-white rounded-[4px] flex justify-center items-start relative" style={{ width: "580px", height: "600px " }}>
        <button onClick={() => window.history.back()} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15 30C6.7155 30 0 23.2845 0 15C0 6.7155 6.7155 0 15 0C23.2845 0 30 6.7155 30 15C30 23.2845 23.2845 30 15 30ZM15 28.2C18.5009 28.2 21.8583 26.8093 24.3338 24.3338C26.8093 21.8583 28.2 18.5009 28.2 15C28.2 11.4991 26.8093 8.14167 24.3338 5.66619C21.8583 3.19071 18.5009 1.8 15 1.8C11.4991 1.8 8.14167 3.19071 5.66619 5.66619C3.19071 8.14167 1.8 11.4991 1.8 15C1.8 18.5009 3.19071 21.8583 5.66619 24.3338C8.14167 26.8093 11.4991 28.2 15 28.2ZM17.9985 20.1555L16.4295 21.75L10.935 16.0845C10.6554 15.7927 10.4993 15.4042 10.4993 15C10.4993 14.5958 10.6554 14.2073 10.935 13.9155L16.4295 8.25L18 9.8445L13.02 15L18 20.157L17.9985 20.1555Z" fill="#272612"/>
          </svg>
        </button>

        <div className="bg-white rounded-[12px] flex flex-col items-center p-8" style={{ width: "398px", height: "599px", top:"213px" }}>
          <div className="self-start mt-10 text-start">
            <h1 className="text-[rgb(94,91,41)] text-3xl font-bold tracking-wider ">Univa</h1>
            <p className="text-gray-600 font-medium">connect. create. commerce.</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Two-Step Verification</h2>
            <p className="text-sm text-gray-600 mb-2">
              Enter the 4-digit code sent to your {state?.type}
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-between mt-2 w-full">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={value}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-14 h-14 text-center text-xl border-b-2 border-gray-400 focus:border-indigo-600 focus:scale-110 focus:outline-none transition-all duration-200"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={verifyOtp}
            disabled={timeLeft === 0 || loading}
            className="w-full text-white py-3 rounded-lg mt-4 transition-all font-semibold"
            style={{ backgroundColor: "#5E5B29" }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Timer */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Expires in <span className="font-semibold text-red-500">{formatTime()}</span>
          </div>

          {/* Resend OTP */}
          <p className="text-center text-sm text-gray-600 mt-3">
            Didn’t receive the code?{" "}
            <button onClick={resendOtp} className="text-blue-600 font-semibold hover:underline">
              Resend
            </button>
          </p>

          {/* Show backend OTP for testing */}
          {backendOtp && (
            <p className="text-center text-green-600 mt-2 font-semibold">
              OTP (for testing): {backendOtp}
            </p>
          )}

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-600 mt-auto w-full">
            <button onClick={() => navigate("/login")} className="font-semibold hover:underline">
              ← Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
