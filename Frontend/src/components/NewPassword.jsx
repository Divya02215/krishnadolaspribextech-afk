import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { GoogleIcon, AppleIcon, FacebookIcon } from "./SocialIcons";


const NewPassword = () => {
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [userId, setUserId] = useState(null); // For testing

  const navigate = useNavigate();

  // ✅ For testing: mock user_id
  useEffect(() => {
    // Replace 1 with a real user ID from your DB if needed
    setUserId(1);
  }, []);

  const savePassword = async () => {
  setError("");

  if (!pass || !confirm) {
    setError("Please fill both fields.");
    return;
  }

  if (pass !== confirm) {
    setError("Passwords do not match.");
    return;
  }

  const reset_token = localStorage.getItem("reset_token");
  if (!reset_token) {
    setError("Reset token missing. Please verify OTP again.");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/accounts/reset-password/`,
      {
        reset_token,
        new_password: pass,
        confirm_password: confirm,
      }
    );
    alert(res.data.message || "Password reset successful!");
    navigate("/reset-success");
  } catch (err) {
    console.error(err.response || err);
    setError(err.response?.data?.error || "Failed to reset password.");
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

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 30C6.7155 30 0 23.2845 0 15C0 6.7155 6.7155 0 15 0C23.2845 0 30 6.7155 30 15C30 23.2845 23.2845 30 15 30ZM15 28.2C18.5009 28.2 21.8583 26.8093 24.3338 24.3338C26.8093 21.8583 28.2 18.5009 28.2 15C28.2 11.4991 26.8093 8.14167 24.3338 5.66619C21.8583 3.19071 18.5009 1.8 15 1.8C11.4991 1.8 8.14167 3.19071 5.66619 5.66619C3.19071 8.14167 1.8 11.4991 1.8 15C1.8 18.5009 3.19071 21.8583 5.66619 24.3338C8.14167 26.8093 11.4991 28.2 15 28.2ZM17.9985 20.1555L16.4295 21.75L10.935 16.0845C10.6554 15.7927 10.4993 15.4042 10.4993 15C10.4993 14.5958 10.6554 14.2073 10.935 13.9155L16.4295 8.25L18 9.8445L13.02 15L18 20.157L17.9985 20.1555Z"
                fill="#272612"
              />
            </svg>
          </button>

          {/* Inner Card */}
          <div className="bg-white rounded-[12px] flex flex-col items-center p-8" style={{ width: "398px", minHeight: "484px", marginTop: "111px" }}>

            {/* Branding */}
            <div className="self-start mt-12">
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

              <h2 className="font-poppins font-semibold text-[26px] leading-[100%] tracking-[0px] text-gray-800 mb-4 mt-6">
                Set a New Password
              </h2>

              <p className="font-poppins font-normal text-[18px] leading-[100%] tracking-[0px] text-[#73725E] mb-6 max-w-[360px]">
                Your new password must be different from the previous one.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}

            {/* New Password */}
            <div className="relative w-full mt-3">
              <label
                className="mb-1 font-normal text-[16px] leading-[100%] tracking-[0px] capitalize text-[#666666]"
                style={{ fontFamily: 'Poppins' }}
              >
                New Password
              </label>


              <div className="relative w-full">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
                  placeholder="New Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ color: "#666666" }}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative w-full mt-3">
              <label
                className="mb-1 font-normal text-[16px] leading-[100%] tracking-[0px] capitalize text-[#666666]"
                style={{ fontFamily: 'Poppins' }}
              >
                Confirm New Password
              </label>


              <div className="relative w-full">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ color: "#666666" }}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Save Password Button */}
            <button
              onClick={savePassword}
              disabled={loading || !pass || !confirm}
              className={`w-full text-white py-3 rounded-lg mt-4 transition ${loading || !pass || !confirm ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                }`}
              style={{ backgroundColor: "#5E5B29" }}
            >
              {loading ? "Saving..." : "Reset Password"}
            </button>

            {/* OR Block */}
            <div className="flex items-center my-8 w-full">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-12 mb-10">
              <button className="w-14 h-14 bg-[#EFEEEB] rounded-full flex justify-center items-center hover:shadow-md">
                <GoogleIcon width={26} height={26} />
              </button>
              <button className="w-14 h-14 bg-[#EFEEEB] rounded-full flex justify-center items-center hover:shadow-md">
                <AppleIcon width={26} height={26} />
              </button>
              <button className="w-14 h-14 bg-[#EFEEEB] rounded-full flex justify-center items-center hover:shadow-md">
                <FacebookIcon width={32} height={32} />
              </button>
            </div>

            {/* Back to Login */}
            <p className="w-full mt-auto text-center">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center font-poppins font-normal text-[16px] leading-[100%] tracking-[0px] text-[#73725E] hover:underline"
              >
                <svg
                  className="mr-4"
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.75 6.75L0.75 6.75M0.75 6.75L6.75 0.75M0.75 6.75L6.75 12.75"
                    stroke="#73725E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Login
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>

  );
};

export default NewPassword;
