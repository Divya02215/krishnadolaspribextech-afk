import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// AUTH
import Login from "./components/Login";
import Signup from "./components/Signup";
import Forget from "./components/Forget";
import Otp from "./components/Otp";
import NewPassword from "./components/NewPassword";
import WelcomeScreen from "./components/WelcomeScreen";

import ProfileSetup from "./components/Profile";
import LocationSetup from "./components/LocationSetup";
import ResetSuccess from "./components/ResetSuccess";
import UserOnboardingSetup from "./components/UserOnboardingSetup";
import Dob from "./components/Dob";

// LAYOUT
import HomePages from "./components/HomePages";

// CENTER PAGES
import Feed from "./components/Feed";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Ecommerce from "./pages/Ecommerce";
import Deals from "./pages/Deals";

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/location-setup" element={<LocationSetup />} />
        <Route path="/user-onboarding-setup" element={<UserOnboardingSetup />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="/dob" element={<Dob />} />

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

        {/* MAIN APP (LAYOUT + CENTER SWAP) */}
        <Route path="/home-pages" element={<HomePages />}>
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="deals" element={<Deals />} />
          <Route path="create" element={<Create />} />
          <Route path="explore" element={<Explore />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
