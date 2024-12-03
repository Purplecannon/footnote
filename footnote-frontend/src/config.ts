declare global {
  interface Window {
    API_BASE_URL?: string;
  }
}

// export const API_BASE_URL = window.API_BASE_URL || "http://localhost:3000";
export const API_BASE_URL =
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://footnote.us/api") || window.API_BASE_URL;

console.log(`Using API_BASE_URL ${API_BASE_URL}`);

const config = {
  API_BASE_URL,
};

export default config;
