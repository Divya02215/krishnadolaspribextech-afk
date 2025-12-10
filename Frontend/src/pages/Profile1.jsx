// src/pages/Profile.jsx
import React from "react";
import { useParams } from "react-router-dom";

const Profile1 = () => {
  const { username } = useParams();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold">Profile Page</h2>
      <p className="mt-2">Username: <b>{username}</b></p>
    </div>
  );
};

export default Profile1;
