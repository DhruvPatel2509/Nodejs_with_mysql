import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api"; // Update with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllUsers = () => api.get("/users");
export const createUser = (userData) => api.post("/users", userData);
export const createAddress = (addressData) =>
  api.post("/addresses", addressData); // Define createAddress function

// Define other API functions for managing users and addresses

export default api;
    