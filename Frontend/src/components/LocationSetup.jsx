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
  const token = localStorage.getItem("access_token");


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
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/accounts/location/save/`, {
          latitude: result.lat,
          longitude: result.lng,
          city: result.city,
        },{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },});

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
  if (!skip && (!coords.lat || !coords.lng || !locationName)) {
    showMessage("Please detect or enter your location before continuing.", true);
    return;
  }

  if (!skip) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/accounts/location/save/`,
        {
          latitude: coords.lat,
          longitude: coords.lng,
          city: locationName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        showMessage("Location saved to server successfully!");
      }
    } catch (err) {
      console.error(err);
      showMessage(err.response?.data?.error || "Error connecting to server.", true);
      return;
    }
  } else {
    showMessage("Skipped location setup.", false);
  }

  setTimeout(() => navigate("/login"), 1500);
};


  if (!location.state) return null;

  return (
     <div
  className="w-full h-screen flex justify-center items-start"
  style={{
    backgroundColor: "#F6F6F6",
    overflowX: "hidden",
  }}
>

  {/* OUTER WHITE BOX */}
  <div className="bg-white rounded-[4px] flex justify-center items-start relative" style={{ width: "580px", height: "884px",top:'70px' }}>
    {/* INNER CONTENT BOX */}
    <div className="w-full min-h-screen flex justify-center items-center"style={{ width: "399px", height: "669px",top:"93px",bottom:'92px',left:'90px',right:'91px' }}>
    <div className="bg-white rounded-[12px] flex flex-col items-center p-5" >

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
     <div className="w-full text-left mb-6">

  {/* UNIVA */}
  <h1
    style={{
      fontFamily: "Poppins",
      fontWeight: 600,
      fontSize: "40px",
      lineHeight: "100%",
      letterSpacing: "0px",
      textTransform: "capitalize",
      color: "rgb(94, 91, 41)",
    }}
  >
    Univa
  </h1>

  {/* SUBTITLE */}
  <p
    style={{
      marginTop: "14px",
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "20px",
      textTransform: "capitalize",
      color: "#272612",
      lineHeight: "100%",
      paddingTop: "15px",
      paddingBottom: "15px",
    }}
  >
    connect. create. commerce.
  </p>

  {/* TITLE BELOW */}
  <h2
    style={{
      fontFamily: "Poppins",
      fontWeight: 600,
      fontSize: "26px",
      lineHeight: "100%",
      letterSpacing: "0px",
      textTransform: "capitalize",
      color: "#272612",
      marginTop: "5px",
      whiteSpace: "nowrap",
    }}
  >
    Find Great Deals Near You!
  </h2>


       <p
  className="text-sm leading-tight"
  style={{
    marginTop: "16px",     // ⬅ space above
    fontFamily: "Poppins",
    color: "#73725E",
  }}
>
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

      {/* Detect Location */}
    <button
  onClick={detectLocation}
  disabled={loading}
  className="w-full h-[50px] rounded-[12px] border border-gray-300 shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
  style={{
    marginTop: "18px", // space between buttons
  }}
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.001 3.05951V0.999512H11.001V3.05951C8.9731 3.28602 7.08251 4.19536 5.63967 5.63821C4.19683 7.08105 3.28749 8.97163 3.06098 10.9995H1.00098V12.9995H3.06098C3.28749 15.0274 4.19683 16.918 5.63967 18.3608C7.08251 19.8037 8.9731 20.713 11.001 20.9395V22.9995H13.001V20.9395C15.0289 20.713 16.9194 19.8037 18.3623 18.3608C19.8051 16.918 20.7145 15.0274 20.941 12.9995H23.001V10.9995H20.941C20.7145 8.97163 19.8051 7.08105 18.3623 5.63821C16.9194 4.19536 15.0289 3.28602 13.001 3.05951ZM12.001 18.9995C8.13098 18.9995 5.00098 15.8695 5.00098 11.9995C5.00098 8.12951 8.13098 4.99951 12.001 4.99951C15.871 4.99951 19.001 8.12951 19.001 11.9995C19.001 15.8695 15.871 18.9995 12.001 18.9995Z"
      fill="#73725E"
    />
    <path
      opacity="0.3"
      d="M12.001 13.9995C13.1055 13.9995 14.001 13.1041 14.001 11.9995C14.001 10.8949 13.1055 9.99951 12.001 9.99951C10.8964 9.99951 10.001 10.8949 10.001 11.9995C10.001 13.1041 10.8964 13.9995 12.001 13.9995Z"
      fill="#73725E"
    />
    <path
      d="M12.001 7.99951C9.79098 7.99951 8.00098 9.78951 8.00098 11.9995C8.00098 14.2095 9.79098 15.9995 12.001 15.9995C14.211 15.9995 16.001 14.2095 16.001 11.9995C16.001 9.78951 14.211 7.99951 12.001 7.99951ZM12.001 13.9995C10.901 13.9995 10.001 13.0995 10.001 11.9995C10.001 10.8995 10.901 9.99951 12.001 9.99951C13.101 9.99951 14.001 10.8995 14.001 11.9995C14.001 13.0995 13.101 13.9995 12.001 13.9995Z"
      fill="#73725E"
    />
  </svg>
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
  </div>
</div>

  );
};

export default LocationSetup;
