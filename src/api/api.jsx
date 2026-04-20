import axios from "axios";

const api = axios.create({
  baseURL: "https://cmsfe3xc5.bookcdn.net:8443", // ✅ REAL API
});

export default api;