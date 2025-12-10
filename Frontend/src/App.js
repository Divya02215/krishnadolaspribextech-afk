import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomeScreen from "./components/WelcomeScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileSetup from "./components/Profile";
import Homepages from "./components/HomePages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/home-pages" element={<Homepages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
