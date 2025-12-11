import React from "react";
import { Toaster } from "react-hot-toast";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Authentication

import Login from "./components/Login";
import Signup from "./components/Signup";
import Forget from "./components/Forget";
import Otp from "./components/Otp";
import NewPassword from "./components/NewPassword";
// import MessagesPage from "./pages/MessagesPage";
// import NotificationsPage from "./pages/NotificationsPage";

import WelcomeScreen from "./components/WelcomeScreen";

// Setup Pages
import ProfileSetup from "./components/Profile";  // Name must match file EXACTLY
import LocationSetup from "./components/LocationSetup";
import ResetSuccess from "./components/ResetSuccess";
import UserOnboardingSetup from "./components/UserOnboardingSetup";

// Main Pages
import HomePages from "./components/HomePages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/location-setup" element={<LocationSetup />} />
        <Route path="/user-onboarding-setup" element={<UserOnboardingSetup />} />
        <Route path="/reset-success" element={<ResetSuccess />} />


        <Route
        
          path="/forgot-password"
          element={
            <Forget
              onOtpSent={(input) => {
                console.log("OTP Sent to:", input);
                window.location.href = "/otp";
              }}
            />
          }
        />

        <Route path="/otp" element={<Otp />} />
        <Route path="/new-password" element={<NewPassword />} />

        {/* Main Feed */}
        <Route path="/home-pages" element={<HomePages />} />
        <Route path="/messages" element={<HomePages page="messages" />} />
        <Route path="/notifications" element={<HomePages page="notifications" />} />
      </Routes>
    </Router>
  );
}

export default App;