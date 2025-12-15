import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleIcon, AppleIcon, FacebookIcon } from "./SocialIcons";
import API from "./api"; // axios instance
import backgroundimage from "../Assets/LoginBackgroundimage.webp";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    isAdult: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') setShowPassword(prev => !prev);
    if (field === 'confirmPassword') setShowConfirmPassword(prev => !prev);
  };

  const validate = () => {
    let isValid = true;
    let errorMessages = [];

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errorMessages.push("Please enter a valid email address.");
      isValid = false;
    }

    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      errorMessages.push("Please enter a valid 10-digit phone number.");
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      errorMessages.push("Password must be at least 6 characters.");
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errorMessages.push("Passwords do not match.");
      isValid = false;
    }

    if (!formData.isAdult) {
      errorMessages.push("You must confirm that you are 18 or older.");
      isValid = false;
    }

    if (!isValid) {
      alert(errorMessages.join('\n'));
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await API.post(`${process.env.REACT_APP_API_BASE_URL}/api/accounts/signup/`, {
        email: formData.email,
        phone_number: formData.phoneNumber,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        is_adult: formData.isAdult,
      });

      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
      }
      navigate('/user-onboarding-setup', { state: { userId: res.data.user.id } });
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      const backendErrors = err.response?.data;
      let formattedErrors = {};

      if (backendErrors) {
        Object.keys(backendErrors).forEach((key) => {
          switch (key) {
            case 'email':
              formattedErrors.email = backendErrors[key][0];
              break;
            case 'phone_number':
              formattedErrors.phoneNumber = backendErrors[key][0];
              break;
            case 'password':
              formattedErrors.password = backendErrors[key][0];
              break;
            case 'confirm_password':
              formattedErrors.confirmPassword = backendErrors[key][0];
              break;
            case 'is_adult':
              formattedErrors.isAdult = backendErrors[key][0];
              break;
            default:
              formattedErrors.general = backendErrors[key][0];
          }
        });
      } else {
        formattedErrors.general = "Registration failed. Try again.";
      }
      setErrors(formattedErrors);
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
      {/* OUTER WHITE BOX */}
      <div
        className="bg-white rounded-[4px] relative flex justify-center"
        style={{
          width: "580px",
          height: "964px",
          top: "30px",
          borderRadius:'4px'
        }}
      >
        {/* INNER BOX */}
        <div
          className="bg-white rounded-[12px] flex flex-col items-center p-8 relative"
          style={{
            width: "391px",
            height: "901px",
            top: "62px",
          }}
        >
          {/* LOGO */}
          <div className="self-start mb-4" style={{ marginTop: "10px" }}>
            <h1
              className="font-semibold"
              style={{
                fontFamily: "Poppins",
                fontSize: "40px",
                color: "#5E5B29",
                textTransform: "capitalize",
                lineHeight: "100%",
              }}
            >
              Univa
            </h1>
            <p
              style={{
                fontFamily: "Poppins",
                fontSize: "20px",
                color: "#272612",
                lineHeight: "100%",
                marginTop: "8px",
                textTransform: "capitalize",
                paddingTop: "15px",
                paddingBottom: "25px",
              }}
            >
              Connect. Create. Commerce.
            </p>
          </div>

          {/* TITLE */}
          <h2
            className="mb-6 self-start"
            style={{
              fontFamily: "Poppins",
              fontSize: "26px",
              fontWeight: 600,
              color: "#272612",
              textTransform: "capitalize",
              lineHeight: "100%",
            }}
          >
            Create Your Account
          </h2>

          {/* FORM */}
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div>
              <h4 className="mb-1 text-[#666]" style={{ fontFamily: "Poppins" }}>
                Email
              </h4>
              <input
                type="email"
                name="email"
                style={{
                  width: "350px",
                  height: "56px",
                  borderRadius: "12px",
                  borderWidth: "1px",
                }}
                placeholder=""
                className="px-4 py-2 border border-gray-300 focus:ring-1"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* PHONE NUMBER */}
            <div>
              <h4 className="mb-1 text-[#666]" style={{ fontFamily: "Poppins" }}>
                Phone Number
              </h4>
              <input
                type="tel"
                name="phoneNumber"
                style={{
                  width: "350px",
                  height: "56px",
                  borderRadius: "12px",
                  borderWidth: "1px",
                }}
                className="px-4 py-2 border border-gray-300 focus:ring-1"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <h4 className="mb-1 text-[#666]" style={{ fontFamily: "Poppins" }}>
                Password
              </h4>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                style={{
                  width: "350px",
                  height: "56px",
                  borderRadius: "12px",
                  borderWidth: "1px",
                  paddingRight: "45px",
                }}
                className="px-4 py-2 border border-gray-300 focus:ring-1"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute"
                style={{
                  top: "70%",
                  right: "1px",
                  transform: "translateY(-60%)",
                  color: "#73725E",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <h4 className="mb-1 text-[#666]" style={{ fontFamily: "Poppins" }}>
                Confirm Password
              </h4>

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                style={{
                  width: "350px",
                  height: "56px",
                  borderRadius: "12px",
                  borderWidth: "1px",
                  paddingRight: "45px",
                }}
                className="px-4 py-2 border border-gray-300 focus:ring-1"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute"
                style={{
                  top: "70%",
                  right: "1px",
                  transform: "translateY(-60%)",
                  color: "#73725E",
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* CHECKBOX */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAdult"
                checked={formData.isAdult}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
              />
              <label
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  color: "#73725E",
                }}
              >
                I am 18 or older
              </label>
            </div>

            {/* SIGN UP BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "350px",
                height: "56px",
                borderRadius: "12px",
                backgroundColor: "#8B7D4F",
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "18px",
              }}
              className="text-white mt-2"
            >
              {loading ? "Creating Account…" : "Sign Up"}
            </button>
          </form>

          {/* SOCIAL BUTTONS */}
          <div className="flex justify-center gap-10 mt-10">
            <button className="w-14 h-14 bg-[#EFEEEB] rounded-full flex items-center justify-center hover:shadow-md">
              <GoogleIcon width={26} height={26} />
            </button>

            <button className="w-14 h-14 bg-[#EFEEEB] rounded-full flex items-center justify-center hover:shadow-md">
              <AppleIcon width={26} height={26} />
            </button>

            <button className="w-14 h-14 bg-[#EFEEEB] rounded-full flex items-center justify-center hover:shadow-md">
              <FacebookIcon width={32} height={32} />
            </button>
          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-sm mt-6 flex justify-center items-center gap-2">
            <Link to="/login" className="text-gray-600 hover:underline flex items-center gap-2">
              <svg
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
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;