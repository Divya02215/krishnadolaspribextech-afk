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
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);


  // Handle form input changes
  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Simulate username availability check
 useEffect(() => {
  if (!formData.username) {
    setUsernameStatus({ isChecking: false, isAvailable: null });
    setUsernameSuggestions([]);
    return;
  }

  setUsernameStatus({ isChecking: true, isAvailable: null });

  const timer = setTimeout(() => {
    const available = formData.username.length >= 4; // replace with real API call later
    setUsernameStatus({ isChecking: false, isAvailable: available });

    if (available) {
      setUsernameSuggestions(
        generateSuggestions(formData.username, formData.firstName)
      );
    } else {
      setUsernameSuggestions([]);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [formData.username, formData.firstName]);


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
        `${process.env.REACT_APP_API_BASE_URL}/api/accounts/complete-profile/`,
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

  const generateSuggestions = (base, firstName) => {
  const cleanBase = base.trim().toLowerCase();
  const cleanFirst = firstName.trim().toLowerCase();

  const suggestions = [
    `${cleanBase}_shop`,
    `${cleanBase}_store`,
    `${cleanBase}123`,
    `${cleanFirst ? cleanFirst + "_" : ""}${cleanBase}`,
    `${cleanBase}_official`,
  ];

  // unique, non-empty, first 3
  return [...new Set(suggestions.filter(Boolean))].slice(0, 3);
};



  return (
   <div
  className="w-full h-screen flex justify-center items-start"
  style={{
    backgroundColor: "#F6F6F6",
    overflowX: "hidden",
  }}
>
  {/* OUTER WHITE BOX */}
  <div className="bg-white rounded-[4px] flex justify-center items-start relative" style={{ width: "580px", height: "884px",top:'70px' }}>
    {/* INNER CONTENT BOX */}
    <div className="w-full min-h-screen flex justify-center items-center"style={{ width: "399px", height: "669px",top:"93px",bottom:'92px',left:'90px',right:'91px' }}>
    <div className="bg-white rounded-[12px] flex flex-col items-center p-5" >

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
    fontWeight: 800,
    fontSize: "20px",
    lineHeight: "100%",
    letterSpacing: "0%",
    textTransform: "capitalize",
    color: "#272612",
    opacity: 1,

    paddingTop: "20px",      // 🔥 added
    paddingBottom: "20px",   // 🔥 added
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
    color: "#7D7D7D",
    opacity: 1,
    paddingTop: "20px",      // 🔥 added
  }}
>
  Please provide your name and choose a unique username
</p>


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
  <p
    className="text-green-500 text-xs mt-1 flex items-center gap-1"
    style={{
      fontFamily: "Poppins",
      paddingTop: "6px",
      paddingBottom: "2px",
    }}
  >
    {/* SVG Icon */}
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.9998 20.1603C7.48784 20.1603 3.83984 16.5123 3.83984 12.0003C3.83984 7.48833 7.48784 3.84033 11.9998 3.84033C16.5118 3.84033 20.1598 7.48833 20.1598 12.0003C20.1598 16.5123 16.5118 20.1603 11.9998 20.1603ZM11.9998 4.80033C8.01584 4.80033 4.79984 8.01633 4.79984 12.0003C4.79984 15.9843 8.01584 19.2003 11.9998 19.2003C15.9838 19.2003 19.1998 15.9843 19.1998 12.0003C19.1998 8.01633 15.9838 4.80033 11.9998 4.80033Z" fill="#22C55E"/>
      <path d="M11.0412 15.5522L6.86523 11.3762L7.53723 10.7042L11.0412 14.2082L16.4652 8.78418L17.1372 9.45618L11.0412 15.5522Z" fill="#22C55E"/>
    </svg>

    Available
  </p>
)}

    {usernameStatus.isAvailable === false && formData.username && (
      <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "Poppins" }}>Username not available</p>
    )}
  </div>

  {usernameStatus.isAvailable && usernameSuggestions.length > 0 && (
  <div className="mt-3">
    <p
      className="text-sm mb-2"
      style={{ fontFamily: "Poppins", color: "#272612" }}
    >
      Suggestions:
    </p>
    <div className="flex flex-wrap gap-2">
      {usernameSuggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, username: s }))
          }
          className="px-4 py-2 rounded-full text-sm"
          style={{
            fontFamily: "Poppins",
            backgroundColor: "#EFEEEB",
            color: "#272612",
          }}
        >
          {s}
        </button>
      ))}
    </div>
  </div>
)}


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
    </div>
    </div>
  </div>
</div>

  );
};

export default UserOnboardingSetup;
