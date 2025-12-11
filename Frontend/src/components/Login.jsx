// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundimage from "../Assets/LoginBackgroundimage.webp";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleIcon, AppleIcon, FacebookIcon } from "./SocialIcons";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();  // <-- ADD THIS


  const togglePasswordVisibility = () => setShowPassword(!showPassword);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);

  try {
    const res = await axios.post(
  `${process.env.REACT_APP_API_BASE_URL}/api/accounts/login/`,
  {
    identifier: email,
    password: password,
  }
);


    if (res.data.user) {
      console.log("Login Successful!", res.data.user);
      alert(`Login successful! Welcome ${res.data.user.email}`);

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Navigate to Home Page
      navigate("/home-pages");
      
    } else {
      setError("Unexpected response from server.");
    }
  } catch (err) {
    console.error(err);
    if (err.response && err.response.data) {
      const errors = err.response.data;
      let errMsg = "";
      if (errors.identifier) errMsg += errors.identifier.join(" ") + " ";
      if (errors.password) errMsg += errors.password.join(" ");
      if (errors.message) errMsg += errors.message;
      setError(errMsg.trim() || "Login failed.");
    } else {
      setError("Error connecting to server.");
    }
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div
    className="min-h-screen w-full flex justify-center items-center"
    style={{
    backgroundImage: `
      linear-gradient(rgba(246,246,246,0.3), rgba(246,246,246,0.3)),
      url(${backgroundimage})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  >
    {/* Outer white card – 580 x 884 */}
    <div
      className="bg-white rounded-[4px] relative flex justify-center items-center"
      style={{
        width: "580px",
        height: "884px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Back Button */}
      {/* <button
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
      </button> */}

      {/* Inner content box – 391 x 732 */}
      <div
        className="bg-white rounded-[12px] flex flex-col items-center"
        style={{
          width: "391px",
          height: "732px",
        }}
      >
        {/* Branding */}
        <div className="self-start mb-8 mt-10 px-8">
          <h1
            className="text-[rgb(94,91,41)]"
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "100%",
              textTransform: "capitalize",
            }}
          >
            Univa
          </h1>

          <p
            className="text-gray-600 font-medium"
            style={{
              fontFamily: "Poppins",
              fontSize: "20px",
              textTransform: "capitalize",
              padding: "20px 0px",
              borderRadius: "4px",
            }}
          >
            connect. create. commerce.
          </p>
        </div>

        {/* Welcome */}
        <div className="w-full px-8">
          <h2
            className="font-semibold"
            style={{
              width: "292px",
              height: "30px",
              fontFamily: "Poppins",
              fontSize: "20px",
              lineHeight: "100%",
              textTransform: "capitalize",
              color: "#272612",
              fontWeight: "600",
            }}
          >
            Welcome Back
          </h2>
        </div>


        {/* Form */}
<form
  className="w-full mt-6 space-y-4 px-8"
  onSubmit={handleSubmit}
>
  {error && (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
      {error}
    </div>
  )}

  {/* USERNAME / EMAIL */}
  <div>
    <h4
      style={{
        fontFamily: "Poppins",
        fontSize: "16px",
        fontWeight: 400,
        marginBottom: "6px",
      }}
    >
      Username / Email
    </h4>

    <input
      type="text"
      className="w-full px-4 h-14 placeholder-gray-500"
      style={{
        borderRadius: "12px",
        border: "1px solid #66666659",
        fontFamily: "Poppins",
      }}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  {/* PASSWORD */}
  <div className="relative mt-2">
    <h4
      style={{
        fontFamily: "Poppins",
        fontSize: "16px",
        marginBottom: "6px",
      }}
    >
      Password
    </h4>

    <div className="relative w-full">
  <input
    type={showPassword ? "text" : "password"}
    className="w-full px-4 h-14 pr-12 placeholder-gray-500"
    style={{
      borderRadius: "12px",
      border: "1px solid #66666659",
      fontFamily: "Poppins",
    }}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <button
    type="button"
    onClick={togglePasswordVisibility}
    className="absolute right-4 top-1/2 -translate-y-1/2"
  >
    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
  </button>
</div>

  </div>

  {/* Forgot Password */}
  <div className="text-left">
    <a
      href="/forgot-password"
      style={{
        fontFamily: "Poppins",
        fontSize: "14px",
        textDecoration: "underline",
        color: "#272612",
      }}
    >
      Forgot password?
    </a>
  </div>

  {/* LOGIN BUTTON */}
  <button
    type="submit"
    disabled={isLoading}
    style={{
      background: "#5E5B29",
      border: "0.5px solid #7D7D7D",
      borderRadius: "12px",
      fontFamily: "Poppins",
      fontSize: "18px",
    }}
    className="w-full h-14 text-white mt-2 font-medium"
  >
    {isLoading ? "Logging in..." : "Login"}
  </button>
</form>

{/* Divider */}
<div className="flex w-full items-center my-6 px-8">
  <hr className="flex-grow border-gray-300" />
  <span className="mx-4 text-gray-500 text-sm">OR</span>
  <hr className="flex-grow border-gray-300" />
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

{/* Signup */}
<p className="text-center text-sm text-gray-600 mb-6">
  Don't have an account?{" "}
  <Link
    to="/signup"
    className="font-medium border-b border-gray-800"
  >
    Sign up
  </Link>
</p>

        </div>
      </div>
    </div>
  );
};

export default Login;
