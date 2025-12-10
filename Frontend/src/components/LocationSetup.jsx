// src/components/LocationSetup.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios import


const showMessage = (msg, isError = false) => {
  const messageOverlay = document.getElementById("message-overlay");
  const messageBox = document.getElementById("message-box");

  if (messageBox && messageOverlay) {
    messageBox.innerText = msg;
    messageBox.className = `text-sm font-medium ${isError ? "text-red-800" : "text-gray-800"}`;
    messageOverlay.classList.remove("hidden");
    setTimeout(() => {
      messageOverlay.classList.add("hidden");
    }, 3000);
  }
};

const LocationSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pincode, setPincode] = useState("");
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);

  const mockPincodeLookup = async (code) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const validCodes = {
      "110001": { lat: 28.6139, lng: 77.209, city: "New Delhi" },
      "400001": { lat: 18.975, lng: 72.8258, city: "Mumbai" },
      "700001": { lat: 22.5726, lng: 88.3639, city: "Kolkata" },
    };
    if (validCodes[code]) return validCodes[code];
    if (code.length === 6 && /^\d+$/.test(code)) return { lat: 20.5937, lng: 78.9629, city: "India (Generic)" };
    return null;
  };

  useEffect(() => {
    if (!location.state) navigate("/setup", { replace: true });
  }, [location.state, navigate]);

  const { userId, profile } = location.state || {};

  const detectLocation = () => {
    setLoading(true);
    setLocationName("");
    if (!navigator.geolocation) {
      showMessage("Geolocation is not supported by your browser.", true);
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });

        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = res.data;
          const cityName =
            data.address.city || data.address.town || data.address.village || data.address.county || "Unknown location";
          setLocationName(cityName);
          showMessage(`Location detected: ${cityName}`, false);
        } catch {
          setLocationName("Unknown location");
          showMessage("Unable to fetch location name.", true);
        }
        setLoading(false);
      },
      () => {
        showMessage("Location access denied or unavailable.", true);
        setLoading(false);
      },
      { timeout: 5000, enableHighAccuracy: true }
    );
  };

  // ===== Axios handlePincodeSubmit =====
  const handlePincodeSubmit = async () => {
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      showMessage("Please enter a valid 6-digit Pincode.", true);
      return;
    }
    setLoading(true);

    try {
      const result = await mockPincodeLookup(pincode);
      if (result) {
        setCoords({ lat: result.lat, lng: result.lng });
        setLocationName(result.city);
        showMessage(`Location set for Pincode: ${result.city}`, false);

        // Backend API call using Axios
        const res = await axios.post("http://127.0.0.1:8000/api/accounts/location/save/", {
          latitude: result.lat,
          longitude: result.lng,
          city: result.city,
        });

        if (res.status === 200) showMessage("Location saved to server successfully!");
      } else {
        showMessage("Pincode lookup failed. Please check the code.", true);
      }
    } catch (err) {
      console.error(err);
      showMessage(err.response?.data?.error || "Error connecting to server.", true);
    }

    setLoading(false);
  };

  // ===== Axios handleSubmit =====
  const handleSubmit = async (skip = false) => {
    if (!skip && coords.lat && coords.lng && locationName) {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/accounts/location/save/", {
          latitude: coords.lat,
          longitude: coords.lng,
          city: locationName,
        });

        if (res.status === 200) showMessage("Location saved to server successfully!");
        else showMessage(res.data?.error || "Failed to save location on server.", true);
      } catch (err) {
        console.error(err);
        showMessage(err.response?.data?.error || "Error connecting to server.", true);
      }
    } else if (skip) {
      showMessage("Skipped location setup.", false);
    }

    setTimeout(() => navigate("/login"), 1500);
  };

  if (!location.state) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-start pt-[60px]">

  {/* Outer Card */}
  <div
    className="bg-white relative flex justify-center items-start shadow-lg"
    style={{
      width: "580px",
      height: "884px",
      borderRadius: "4px",
    }}
  >

    {/* Back Button */}
    <button
      onClick={() => window.history.back()}
      className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition"
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 30C6.7155 30 0 23.2845 0 15C0 6.7155 6.7155 0 15 0C23.2845 0 30 6.7155 30 15C30 23.2845 23.2845 30 15 30ZM17.9985 20.1555L16.4295 21.75L10.935 16.0845C10.6554 15.7927 10.4993 15.4042 10.4993 15C10.4993 14.5958 10.6554 14.2073 10.935 13.9155L16.4295 8.25L18 9.8445L13.02 15L18 20.157L17.9985 20.1555Z"
          fill="#272612"
        />
      </svg>
    </button>

    {/* Inner Card */}
    <div
      className="bg-white flex flex-col items-center mx-auto mt-[60px] p-6"
      style={{
        width: "391.29px",
        height: "567px",
        borderRadius: "12px",
        
        fontFamily: "Poppins",
      }}
    >

      {/* Branding */}
      <div className="self-start mb-4">
        <h1
          className="font-bold text-3xl tracking-wider"
          style={{ color: "rgb(94,91,41)" }}
        >
          Univa
        </h1>

        <p
          style={{
            marginTop: "8px",
            fontSize: "20px",
            fontWeight: 400,
            color: "#272612",
            textTransform: "capitalize",
            lineHeight: "100%",
          }}
        >
          connect. create. commerce.
        </p>
      </div>

      {/* Title */}
      <div className="text-star mb-3">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Find Great Deals Near You!
        </h2>
        <p className=" text-sm leading-tight">
          Share your location to discover exclusive offers, events, and creators
          in your area
        </p>
      </div>

      {/* Pincode Input */}
      <div className="flex flex-col w-full">
        <label className="text-sm mt-1 font-semibold text-start">Postal Code</label>

        <input
          type="text"
          placeholder="Enter Your Postal Code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          maxLength={6}
          className="w-full h-[56px] px-4 border border-gray-300 rounded-[12px] placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
        />

        <button
          onClick={handlePincodeSubmit}
          disabled={loading || !pincode || pincode.length !== 6}
          className="w-full h-[50px] rounded-[12px] text-white font-medium mt-4 transition duration-200 hover:opacity-90"
          style={{ backgroundColor: "#5E5B29" }}
        >
          {loading && pincode ? "Locating..." : "Get Location"}
        </button>
      </div>

      {/* OR Separator */}
      <div className="flex items-center my-4 w-full">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Detect Location */}
      <button
        onClick={detectLocation}
        disabled={loading}
        className="w-full h-[50px] rounded-[12px] border border-gray-300 shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition duration-200 disabled:opacity-50"
      >
        {loading && !pincode ? "Detecting Current Location..." : "Use Current Location"}
      </button>

      {/* Location Detected Box */}
      {coords.lat && coords.lng && (
        <div className="mt-3 p-3 bg-green-50 rounded-[12px] border border-green-200 text-center">
          <p className="text-sm font-semibold text-green-700">✅ Location Detected!</p>
          <p className="text-xs text-green-600">{locationName}</p>

          <button
            onClick={() => handleSubmit(false)}
            className="w-full h-[48px] rounded-[12px] bg-blue-600 text-white font-medium hover:bg-blue-700 transition mt-2"
          >
            Confirm Location & Finish
          </button>
        </div>
      )}

      {/* Skip */}
      <button
        onClick={() => handleSubmit(true)}
        className="text-sm text-gray-500 mt-6 hover:text-gray-800 transition"
      >
        Skip for now
      </button>
    </div>
  </div>
</div>

  );
};

export default LocationSetup;
