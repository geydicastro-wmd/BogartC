import axios from "axios";

const api = axios.create({
  baseURL: "/api", // 👈 CLAVE
});

export default api;