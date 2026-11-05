// Where your FastAPI server runs. Override with a VITE_API_URL in a .env file if needed.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

// Change this to $ or anything else you like.
export const CURRENCY = "₹";