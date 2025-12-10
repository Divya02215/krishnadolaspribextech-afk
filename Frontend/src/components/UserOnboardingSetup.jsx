import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios import
import { GoogleIcon, AppleIcon, FacebookIcon } from "./SocialIcons";

const UserOnboardingSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", username: "" });
  const [usernameStatus, setUsernameStatus] = useState({ isChecking: false, isAvailable: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Simulate username availability check
  useEffect(() => {
    if (!formData.username) return;
    setUsernameStatus({ isChecking: true });
    const timer = setTimeout(() => {
      setUsernameStatus({ isChecking: false, isAvailable: formData.username.length >= 4 });
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.username]);

  // Handle continue button click
  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.username || usernameStatus.isAvailable !== true) {
      return alert("Complete all fields & username must be available.");
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("access_token"); // JWT token from signup/login

      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/complete-profile/",
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // ✅ Send JWT
          }
        }
      );

      if (response.status === 200) {
        navigate("/profile-setup", { state: { onboardingData: formData } });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-start p-6 pt-16">
  {/* OUTER WHITE BOX */}
  <div className="bg-white rounded-[4px] flex justify-center items-start relative" style={{ width: "580px", height: "750px" }}>
    {/* INNER CONTENT BOX */}
    <div className="bg-white rounded-[12px] flex flex-col items-center p-8" style={{ width: "399px", height: "669px",top:"163px" }}>

      {/* BACK BUTTON */}
      <button onClick={() => window.history.back()} className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition">
        {/* SVG Back Icon here */}
      </button>

      {/* LOGO + TAGLINE */}
      <div
  className="self-start mb-8"
  style={{
    width: "117px",
    height: "60px",
    fontFamily: "Poppins",
    fontWeight: 600, // SemiBold
    fontSize: "40px",
    lineHeight: "100%",
    letterSpacing: "0%",
    textTransform: "capitalize",
    color: "rgb(94,91,41)",
    opacity: 1,
    // optional positioning if needed
    // position: "absolute",
    // top: "163px",
    // left: "524px",
  }}
>
  Univa
  <p
    style={{
      fontFamily: "Poppins",
      fontWeight: 500, // Medium
      fontSize: "16px",
      lineHeight: "100%",
      color: "#272612",
      marginTop: "4px",
    }}
  >
  </p>
<p
  style={{
    marginTop:"18px",
    width: "292px",
    height: "30px",
    fontFamily: "Poppins",
    fontWeight: 400, // Regular
    fontSize: "20px",
    lineHeight: "100%",
    letterSpacing: "0%",
    textTransform: "capitalize",
    color: "#272612",
    opacity: 1,
    // optional absolute positioning if needed
    // position: "absolute",
    // top: "233px",
    // left: "524px",
    background: "transparent", // remove if no background needed
  }}
>
  connect. create. commerce.
</p>
</div>

 <h2
  className="mb-2 self-start text-black"
  style={{
    width: "292px",
    height: "30px",
    fontFamily: "Poppins",
    fontWeight: 800, // Regular
    fontSize: "20px",
    lineHeight: "100%",
    letterSpacing: "0%",
    textTransform: "capitalize",
    color: " #272612",
    opacity: 1,
    
    // optional absolute positioning if needed
    // position: "absolute",
    // top: "233px",
    // left: "524px",
  }}
>
  Let’s get you started
</h2>

<p
  className="text-start mb-2"
  style={{
    fontFamily: "Poppins",
    fontWeight: 400, // Regular
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%",
    textTransform: "capitalize",
    color: "#272612",
    opacity: 1,
  }}
>
  Please provide your name and choose a unique username
</p>

<br/>
      {/* FORM */}
     <form className="w-full space-y-4 mb-8" onSubmit={handleContinue}>

<div className="flex gap-8 mt-7"> {/* increased gap from gap-4 to gap-6 */}
  {/* First Name */}
  <div className="flex flex-col w-1/2">
    <label
      className="mb-1"
      style={{
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "100%",
        textTransform: "capitalize",
        width: "85px",
        height: "24px",
        opacity: 1,
      }}
    >
      First Name
    </label>
    <input
      name="firstName"
      placeholder="First Name"
      value={formData.firstName}
      onChange={handleChange}
      className="px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
      style={{
        fontFamily: "Poppins",
        width: "190px",
        height: "56px",
        borderRadius: "12px",
        borderWidth: "1px",
        borderColor: "#66666659",
        backgroundColor: "#FFFFFF",
      }}
    />
  </div>

  {/* Last Name */}
  <div className="flex flex-col w-1/2">
    <label
      className="mb-1"
      style={{
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "100%",
        textTransform: "capitalize",
        width: "85px",
        height: "24px",
        opacity: 1,
      }}
    >
      Last Name
    </label>
    <input
      name="lastName"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={handleChange}
      className="px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
      style={{
        fontFamily: "Poppins",
        width: "190px",
        height: "56px",
        borderRadius: "12px",
        borderWidth: "1px",
        borderColor: "#66666659",
        backgroundColor: "#FFFFFF",
      }}
    />
  </div>
</div>

  {/* Username */}
  <div className="flex flex-col">
    <label
      className="mb-1 text-start"
      style={{
        fontFamily: "Poppins",
        fontWeight: 500, // Medium
        fontSize: "18px",
        lineHeight: "100%",
        textAlign: "start",
        textTransform: "capitalize",
        width: "221px",
        height: "27px",
        opacity: 1,
        // background: "#272612",
      }}
    >
      Pick a unique username
    </label>
    <input
      name="username"
      placeholder="Enter your username"
      value={formData.username}
      onChange={handleChange}
      className="px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
      style={{
        fontFamily: "Poppins",
        fontWeight: 500,
        width: "391px",
        height: "56px",
        borderRadius: "12px",
        borderWidth: "1px",
        borderColor: "#66666659",
        // backgroundColor: "#FFFFFF",
      }}
    />
    {usernameStatus.isChecking && (
      <p className="text-gray-500 text-xs mt-1" style={{ fontFamily: "Poppins" }}>Checking username...</p>
    )}
    {usernameStatus.isAvailable && (
      <p className="text-green-500 text-xs mt-1" style={{ fontFamily: "Poppins" }}>Username available!</p>
    )}
    {usernameStatus.isAvailable === false && formData.username && (
      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "Poppins" }}>Username not available</p>
    )}
  </div>

  {/* Continue Button */}
  <button
    type="submit"
    disabled={loading}
    className={`w-full text-white font-semibold transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
    style={{
      width: "398px",
      height: "50px",
      borderRadius: "12px",
      backgroundColor: "#5E5B29",
      paddingTop: "9px",
      paddingBottom: "9px",
      paddingLeft: "115px",
      paddingRight: "115px",
      fontFamily: "Poppins",
      gap: "10px",
    }}
  >
    {loading ? "Continuing..." : "Continue"}
  </button>
</form>


      {/* SOCIAL LOGIN */}
      <div className="flex justify-center gap-5 mt-8">
        <button className="w-14 h-14 flex items-center justify-center rounded-full hover:shadow-md bg-[#EFEEEB]">
          <GoogleIcon width={26} height={26} />
        </button>
        <button className="w-14 h-14 flex items-center justify-center rounded-full hover:shadow-md bg-[#EFEEEB]">
          <AppleIcon width={26} height={26} />
        </button>
        <button className="w-14 h-14 flex items-center justify-center rounded-full hover:shadow-md bg-[#EFEEEB]">
          <FacebookIcon width={32} height={32} />
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6" style={{ fontFamily: "Poppins" }}>
        Already have an account? <a href="/login" className="font-medium text-gray-800 hover:text-black ml-1 border-b border-gray-800">Login</a>
      </p>
    </div>
  </div>
</div>

  );
};

export default UserOnboardingSetup;
