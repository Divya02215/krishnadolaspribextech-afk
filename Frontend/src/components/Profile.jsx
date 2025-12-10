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
    "Music",
    "Sports",
    "Travel",
    "Tech",
    "Gaming",
    "Fitness",
    "Food",
    "Art",
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
        "http://127.0.0.1:8000/api/accounts/update-interests/",
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
   <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-start p-6 pt-16">

  {/* OUTER WHITE BOX */}
  <div
    className="bg-white rounded-[4px] flex justify-center items-start relative"
    style={{ width: "580px", height: "750px" }}
  >

    {/* INNER CONTENT BOX */}
    <div
      className="bg-white rounded-[12px] flex flex-col items-center p-8"
      style={{
        width: "391px",
        height: "567px",
        fontFamily: "Poppins",
      }}
    >

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
          }}
        >
          connect. create. commerce.
        </p>
      </div>

      {/* HEADER */}
      <h2
        className="self-start"
        style={{
          fontWeight: 800,
          fontSize: "20px",
          color: "#272612",
          marginBottom: "6px",
          lineHeight: "100%",
        }}
      >
        What are you interested in?
      </h2>

      <p
        className="self-start mb-4"
        style={{
          fontWeight: 400,
          fontSize: "15px",
          color: "#272612",
          lineHeight: "120%",
        }}
      >
        Select up to 3 topics that interest you to personalize your experience
      </p>

      {/* INTEREST GRID */}
      <div className="grid grid-cols-3 gap-3 mb-6 w-full">
        {INTEREST_LIST.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => toggleInterest(item)}
            className={`py-2 px-3 rounded-full border text-sm font-medium transition duration-200 w-full
              ${
                profile.interests.includes(item)
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-[#EFEEEB] text-gray-700 hover:bg-gray-200"
              }`}
            style={{
              fontFamily: "Poppins",
              borderColor: "#D1D1D1",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* CONTINUE BUTTON */}
      <button
        onClick={handleNext}
        className="w-full text-white font-semibold transition duration-200 hover:opacity-90 mb-4"
        style={{
          height: "50px",
          borderRadius: "12px",
          backgroundColor: "#5E5B29",
          fontFamily: "Poppins",
        }}
      >
        Continue
      </button>

      {/* SOCIAL LOGIN */}
      <div className="flex justify-center gap-5 mb-4">
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

      {/* SKIP BUTTON */}
      <button
        onClick={handleSkip}
        className="w-1/2 py-2 rounded-md text-gray-600 hover:bg-gray-100"
        style={{ fontFamily: "Poppins" }}
      >
        Skip
      </button>

    </div>
  </div>
</div>

  );
};

export default Profile;
