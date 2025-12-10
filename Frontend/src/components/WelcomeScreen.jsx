import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white relative overflow-hidden">
      <div className="z-10 w-full max-w-sm text-center">
        
        <h1 className="text-5xl font-bold mb-4">Univa</h1>

        <button
          onClick={() => navigate("/signup")}
          className="bg-yellow-600 p-3 w-full rounded-lg"
        >
          <UserPlus className="inline mr-2" />
          Sign Up
        </button>

        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-gray-700 p-3 w-full rounded-lg"
        >
          <LogIn className="inline mr-2" />
          Login
        </button>
      </div>
    </div>
  );
}
