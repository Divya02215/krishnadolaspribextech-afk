// src/components/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // http://localhost:8000
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
