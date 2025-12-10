import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

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

    if (!userId) {
      setError("User ID missing. Please verify OTP again.");
      return;
    }

    if (pass !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/reset-password/",
        {
          user_id: userId, // Will always be present for testing
          new_password: pass,
          confirm_password: confirm,
        },
        { headers: { "Content-Type": "application/json" } }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-start pt-16 px-4">

  <div
    className="bg-white rounded-[4px] flex justify-center items-start relative"
    style={{
      width: "580px",
      height: "884px",
    }}
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

    {/* Inner White Box */}
    <div
      className="bg-white rounded-[12px] flex flex-col p-8 relative"
      style={{
        width: "391px",
        height: "567px",
      }}
    >
      
      {/* Branding */}
      <div className="self-start mt-12">
        <h1 className="text-[rgb(94,91,41)] text-3xl font-bold tracking-wider">Univa</h1>
        <p className="text-gray-600 font-medium">connect. create. commerce.</p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Set a New Password
        </h2>

        <p className="text-sm text-gray-600">
          Your new password must be different from the previous one.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      {/* Password */}
      <div className="relative mt-6">
      <label className="mb-5 text-sm font-medium">New Password</label>

        <input
          type={showPass ? "text" : "password"}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
          placeholder="New Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <span
          className="absolute right-3 top-3 mt-7 cursor-pointer text-gray-600"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative mt-3">
       <label className="mb-1 text-sm font-medium">Confirm New Password</label>

        <input
          type={showConfirm ? "text" : "password"}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <span
          className="absolute right-3 top-3 mt-7 cursor-pointer text-gray-600"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Save Password Button */}
      <button
        onClick={savePassword}
        disabled={loading || !pass || !confirm}
        className={`w-full text-white py-3 rounded-lg mt-4 transition ${
          loading || !pass || !confirm ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
        style={{ backgroundColor: "rgba(94, 91, 41, 1)" }}
      >
        {loading ? "Saving..." : "Reset Password"}
      </button>

      {/* Back to Login */}
      <p className="text-center text-sm text-gray-600 mt-6">
        <button
          onClick={() => navigate("/login")}
          className="font-semibold hover:underline"
        >
          ← Back to Login
        </button>
      </p>

    </div>
  </div>
</div>

  );
};

export default NewPassword;
