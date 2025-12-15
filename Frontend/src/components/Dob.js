import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => 2025 - i);

const Dob = () => {
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");

    const [openDropdown, setOpenDropdown] = useState(null);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
const location = useLocation();

// assuming userId and profile were passed from previous screen
const { userId, profile } = location.state || {};

/* ===========================
     AGE CALCULATION (18+)
  =========================== */
  const isAge18OrAbove = () => {
    const birthDate = new Date(
      Number(year),
      months.indexOf(month),
      Number(day)
    );

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age >= 18;
  };


    // Function to save DOB to backend
 const saveDobToDatabase = async () => {
  // ✅ AGE VALIDATION (MISSING PART)
  if (!isAge18OrAbove()) {
    alert("You must be at least 18 years old to continue.");
    return;
  }

  const dob = `${year}-${String(months.indexOf(month) + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Session expired. Please login again.");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/accounts/save-dob/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dob }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData?.error || "Failed to save DOB");
    }

    await response.json();

    navigate("/location-setup", {
      state: { userId, profile },
    });

  } catch (error) {
    alert(error.message || "Something went wrong. Please try again.");
  }
};




    const handleSkip = () => {
  navigate("/location-setup", { state: { userId, profile } });
};


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isDobSelected = month && day && year;

    return (
        <div
            className="w-full h-screen flex justify-center items-start"
            style={{ backgroundColor: "#F6F6F6" }}
        >
            {/* Outer Card */}
            <div className="w-full h-screen flex justify-center items-center">
                <div
                    className="bg-white rounded-[4px] flex justify-center items-start"
                    style={{ width: "580px", minHeight: "884px" }}
                >
                    {/* Inner Card */}
                    <div
                        className="bg-white flex flex-col items-center p-8"
                        style={{ width: "398px", minHeight: "484px", marginTop: "111px" }}
                    >
                        {/* Logo */}
                        <div className="mt-8 w-full text-start">
                            <h1 className="font-poppins font-semibold text-[40px] text-[#5E5B29]" style={{ marginLeft: '20px' }}>
                                Univa
                            </h1>

                            <p className="font-poppins text-[20px] text-gray-600 mt-6" style={{ marginLeft: '20px' }}>
                                Connect. Create. Commerce.
                            </p>
                        </div>

                        {/* Title */}
                        <h2
                            className="font-poppins font-semibold text-[26px] leading-[100%] tracking-[0%] text-gray-800 mt-10 text-start whitespace-nowrap"
                        >
                            What’s Your Date Of Birth?
                        </h2>

                      {/* Description */}
<div className="mt-4 max-w-[380px] mx-auto text-start">
  <p
    className="font-poppins font-normal text-[14px] text-[#7D7D7D]"
    style={{
      lineHeight: "135%",
      letterSpacing: "0px",
    }}
  >
    This Won’t Be Public. It Helps Us Personalize Your Experience
    <br />
    And Ensure You Meet Our Age Requirement.
  </p>
</div>


                        {/* DOB DROPDOWNS */}
                        <div className="flex gap-4 mt-10 justify-center" ref={dropdownRef}>
                            {/* Month */}
                            <Dropdown
                                label={month || "Month"}
                                open={openDropdown === "month"}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === "month" ? null : "month")
                                }
                            >
                                <div className="max-h-40 overflow-y-scroll hide-scrollbar">
                                    {months.map((m) => (
                                        <DropdownItem
                                            key={m}
                                            onClick={() => {
                                                setMonth(m);
                                                setOpenDropdown(null);
                                            }}
                                        >
                                            <span>{m}</span>
                                        </DropdownItem>
                                    ))}
                                </div>
                            </Dropdown>

                            {/* Day */}
                            <Dropdown
                                label={day || "Day"}
                                open={openDropdown === "day"}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === "day" ? null : "day")
                                }
                            >
                                <div className="max-h-40 overflow-y-scroll hide-scrollbar">
                                    {days.map((d) => (
                                        <DropdownItem
                                            key={d}
                                            onClick={() => {
                                                setDay(d);
                                                setOpenDropdown(null);
                                            }}
                                        >
                                            <span>{d}</span>
                                        </DropdownItem>
                                    ))}
                                </div>
                            </Dropdown>

                            {/* Year */}
                            <Dropdown
                                label={year || "Year"}
                                open={openDropdown === "year"}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === "year" ? null : "year")
                                }
                            >
                                <div className="max-h-40 overflow-y-scroll hide-scrollbar">
                                    {years.map((y) => (
                                        <DropdownItem
                                            key={y}
                                            onClick={() => {
                                                setYear(y);
                                                setOpenDropdown(null);
                                            }}
                                        >
                                            <span>{y}</span>
                                        </DropdownItem>
                                    ))}
                                </div>
                            </Dropdown>
                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={!isDobSelected}
                            onClick={saveDobToDatabase}
                            className="w-full text-white py-3 rounded-lg mt-10 transition"
                            style={{
                                backgroundColor: isDobSelected ? "#8B7D4F" : "#C9C6B8",
                                cursor: isDobSelected ? "pointer" : "not-allowed",
                            }}
                        >
                            Go To Home
                        </button>

                        {/* SKIP */}
                        <button
                            onClick={handleSkip}
                            className="text-gray-600 mt-5 text-sm"
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ===========================
   Reusable Dropdown Components
=========================== */

const Dropdown = ({ label, open, onToggle, children }) => {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex justify-between items-center px-4 h-[44px] w-[110px] border border-gray-300 rounded-lg bg-white text-sm text-gray-700"
            >
                {label}
                <span className="ml-2">⌄</span>
            </button>

            {open && (
                <div className="absolute top-[50px] left-0 w-[110px] bg-white border border-gray-200 rounded-lg shadow-lg max-h-[180px] overflow-y-auto z-50">
                    {children}
                </div>
            )}
        </div>
    );
};

const DropdownItem = ({ children, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
            {children}
        </div>
    );
};

export default Dob;