// src/components/Profile.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios import
import { GoogleIcon, AppleIcon, FacebookIcon } from "./SocialIcons";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [profile, setProfile] = useState({ interests: [] });

  const INTEREST_LIST = [
    "Fashion",
    "Shopping",
    "Fitness",
    "Gaming",
    "Travel",
    "Food & Dinning",
    "Tech",
    "Art & Design",
    "Music",
  ];

  const toggleInterest = (interest) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  // 🔥 Updated handleNext with JWT token
  const handleNext = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return alert("You must be logged in!");

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/accounts/update-interests/`,
        {
          interests: profile.interests, // send selected interests
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // JWT token
          },
        }
      );

      navigate("/location-setup", { state: { userId, profile } });

    } catch (error) {
      console.error("Failed to update interests", error);
      alert(
        error.response?.data?.detail || "Error updating interests. Please try again."
      );
    }
  };

  const handleSkip = () => {
    navigate("/location-setup", { state: { userId, profile: { interests: [] } } });
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
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition"
      >
        {/* Back SVG */}
      </button>

      {/* BRANDING */}
      <div className="self-start mb-4">
        <h1
          style={{
            color: "rgb(94,91,41)",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "100%",
          }}
        >
          Univa
        </h1>

        <p
          style={{
            marginTop: "14px",
            width: "292px",
            fontWeight: 400,
            fontSize: "20px",
            textTransform: "capitalize",
            color: "#272612",
            lineHeight: "100%",
            paddingTop:'15px',
            paddingBottom:'15px'
          }}
        >
          connect. create. commerce.
        </p>
      </div>

      {/* HEADER */}
   <h2
  className="w-full text-center"
  style={{
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "26px",
    color: "#272612",
    lineHeight: "100%",
    letterSpacing: "0px",
    textTransform: "capitalize",
    whiteSpace: "nowrap",   // <-- prevents wrapping
    marginBottom: "6px",
  }}
>
  What Are You Interested In?
</h2>

      <p
  className="w-full text-center mb-4"
  style={{
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "16px",
    color: "#272612",
    lineHeight: "100%",
    letterSpacing: "0px",
    textTransform: "capitalize",
    paddingTop:'30px',
    paddingBottom:'20px'
  }}
>
  Select Any 3 Topic That's Interest You To Personalize Your Experience
</p>


     {/* INTEREST GRID */}
<div className="grid grid-cols-3 gap-x-8 gap-y-6 mb-6 w-full justify-items-center">
  {INTEREST_LIST.map((item, index) => {
    const titleCase = item.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

    return (
      <button
        key={index}
        type="button"
        onClick={() => toggleInterest(item)}
        className={`py-3 px-5 rounded-full transition duration-200
          ${
            profile.interests.includes(item)
              ? "bg-[#5E5B29] text-white"
              : "bg-[#EFEEEB] text-gray-700"
          }`}
        style={{
          fontFamily: "Poppins",
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "100%",
          letterSpacing: "0px",
          textAlign: "center",
          textTransform: "capitalize",
          minWidth: "110px", // More breathing space
        }}
      >
        {titleCase}
      </button>
    );
  })}
</div>



{/* CONTINUE BUTTON */}
<button
  onClick={handleNext}
  className="w-full text-white font-semibold transition duration-200 hover:opacity-90"
  style={{
    marginTop: "28px",        // ⬅ added more top spacing
    height: "50px",
    borderRadius: "12px",
    backgroundColor: "#5E5B29",
    fontFamily: "Poppins",
  }}
>
  Go To Home
</button>

{/* SKIP BUTTON */}
<button
  onClick={handleSkip}
  className="text-center text-gray-600"
  style={{
    fontFamily: "Poppins",
    fontSize: "14px",
    marginTop: "18px",         // ⬅ increased spacing above Skip
  }}
>
  Skip
</button>



    </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
