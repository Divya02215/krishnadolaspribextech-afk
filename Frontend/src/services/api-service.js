const API_URL = "http://localhost:3000"; // Change to your backend URL

export const sendOtp = async (emailOrPhone) => {
  const res = await fetch(`${API_URL}/send-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email_or_phone: emailOrPhone }),
  });
  return res.json();
};

export const verifyOtp = async (emailOrPhone, otp) => {
  const res = await fetch(`${API_URL}/verify-otp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email_or_phone: emailOrPhone, otp }),
  });
  return res.json();
};

export const resetPassword = async (emailOrPhone, password) => {
  const res = await fetch(`${API_URL}/reset-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email_or_phone: emailOrPhone, password }),
  });
  return res.json();
};
