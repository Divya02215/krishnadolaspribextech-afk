// src/components/PasswordResetSuccess.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetSuccess = () => {
  const [showTick, setShowTick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowTick(true), 2000); // 2 sec me tick
    return () => clearTimeout(timer);
  }, []);

  const handleGoToHome = () => {
    navigate("/login");
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
      {/* Logo */}
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
      </div>

    {/* Success Icon */}
<div className="mt-6 flex justify-center items-center">
  <img
    src={require("../Assets/Checkmark.gif")} // adjust the path according to your folder structure
    alt="Success"
    className="w-36 h-36 object-contain"
  />
</div>



    {/* Title */}
<h2
  className="font-poppins font-semibold text-[26px] leading-[100%] tracking-[0%] text-center text-gray-800 mb-4"
>
  Password Reset Successfully!
</h2>


      {/* Description */}
      <p className="text-sm text-gray-500 mb-10 mt-8 leading-6">
        Your password has been reset successfully. <br />
        You can now login with your new password.
      </p>

      {/* Button */}
      <button
        onClick={() => (window.location.href = "/login")}
        className="w-full text-white py-3 rounded-lg mt-4 hover:opacity-90 transition"
        style={{ backgroundColor: "#8B7D4F" }}
      >
        Go To Login
      </button>
    </div>
  </div>
</div>
</div>

  );
};

export default ResetSuccess;
