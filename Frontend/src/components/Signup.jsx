import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleIcon, AppleIcon, FacebookIcon } from "./SocialIcons";
import API from "./api"; // axios instance

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    let tempErrors = {};
    let isValid = true;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Valid email is required.";
      isValid = false;
    }

    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "10-digit phone number is required.";
      isValid = false;
    }

    if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!formData.isAdult) {
      tempErrors.isAdult = "You must confirm that you are 18 or older.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await API.post("/api/accounts/signup/", {
  first_name: formData.firstName || undefined,
  last_name: formData.lastName || undefined,
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
        Object.keys(backendErrors).forEach(key => {
          formattedErrors[key] = backendErrors[key][0]; 
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
      className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center relative"
      style={{ paddingTop: "30px" }}
    >
      {/* OUTER WHITE BOX */}
      <div
        className="bg-white rounded-[4px] relative flex justify-center"
        style={{
          width: "580px",
          height: "964px",
          top: "30px",
        }}
      >
        {/* INNER CONTENT BOX */}
        <div
          className="bg-white rounded-[12px] flex flex-col items-center p-8 relative"
          style={{
            width: "391px",
            height: "901px",
            top: "62px",
          }}
        >
          {/* BACK BUTTON */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-0 left-0 p-2 rounded-full hover:bg-gray-100 transition"
            style={{ top: "-40px", left: "-40px" }}
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

          {/* LOGO + TAGLINE */}
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
              }}
            >
              connect. create. commerce.
            </p>
          </div>

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
              <h4 className="mb-1" style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: "16px", color: "#666666" }}>
                Email
              </h4>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                style={{ width: "350px", height: "56px", borderRadius: "12px", borderWidth: "1px" }}
                className={`px-4 py-2 border focus:ring-1 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* PHONE */}
            <div>
              <h4 className="mb-1" style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: "16px", color: "#666666" }}>
                Phone Number
              </h4>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="10-digit Phone Number"
                style={{ width: "350px", height: "56px", borderRadius: "12px", borderWidth: "1px" }}
                className={`px-4 py-2 border focus:ring-1 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* PASSWORD */}
            {/* PASSWORD */}
<div className="relative">
  <h4 className="mb-1" style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: "16px", color: "#666666" }}>
    Password
  </h4>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Min 6 characters"
    style={{
      width: "350px",
      height: "56px",
      borderRadius: "12px",
      borderWidth: "1px",
      paddingRight: "45px", // space for the eye icon
    }}
    className={`px-4 py-2 border focus:ring-1 ${errors.password ? "border-red-500" : "border-gray-300"}`}
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
      transform: "translateY(-60%)", // vertically center
      color: "#73725E",
    }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

{/* CONFIRM PASSWORD */}
<div className="relative">
  <h4 className="mb-2" style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: "16px", color: "#666666" }}>
    Confirm Password
  </h4>
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Re-enter Password"
    style={{
      width: "350px",
      height: "56px",
      borderRadius: "12px",
      borderWidth: "1px",
      paddingRight: "45px", // space for the eye icon
    }}
    className={`px-4 py-2 border focus:ring-1 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
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
      transform: "translateY(-60%)", // vertically center
      color: "#73725E",
    }}
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
</div>


            {/* CHECKBOX */}
            <div className="flex items-center">
              <input type="checkbox" name="isAdult" checked={formData.isAdult} onChange={handleChange} className="mr-2 h-4 w-4" />
              <label style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: "16px", color: "#73725E" }}>
                I am 18 years or older
              </label>
              {errors.isAdult && <p className="text-red-500 text-sm mt-1">{errors.isAdult}</p>}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              style={{ width: "350px", height: "56px", borderRadius: "4px", backgroundColor: "#8B7D4F", fontFamily: "Poppins", fontWeight: 600, fontSize: "18px" }}
              className="text-white mt-2 transition"
            >
              {loading ? "Creating Account…" : "Sign Up"}
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

          <p className="text-center text-sm mt-6">
            <Link to="/login" className="text-gray-600 hover:underline">
              Already have an account? Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
