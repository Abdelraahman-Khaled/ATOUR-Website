import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const API_BASE_URL = "https://admin.atour.sa/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

// Attach token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    const currentLanguage = localStorage.getItem("language") || "en";
    let message = currentLanguage === "ar" ? "حدث خطأ" : "An error occurred";

    // Handle network errors (no response from server)
    if (!error.response) {
      message =
        currentLanguage === "ar"
          ? "خطأ في الاتصال بالخادم"
          : "Network Error: Could not connect to server";
      toast.error(message);
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Extract error message from different response formats
    const errorMessage =
      data.message ||
      (data.error ? data.error.message || data.error : null) ||
      (typeof data === "string" ? data : null);

    // Handle different status codes
    switch (status) {
      case 400: // Bad Request
        message = currentLanguage === "ar" ? "طلب غير صالح" : "Bad Request";
        if (errorMessage) {
          message = errorMessage;
        }
        toast.error(message);
        break;

      case 401: // Unauthorized
        message =
          currentLanguage === "ar"
            ? "حدث خطأ في المصادقة"
            : "Authentication Error";

        if (errorMessage === "unauthorized") {
          message =
            currentLanguage === "ar" ? "تسجيل الدخول غير صالح" : "Unauthorized";
        }

        // Show toast first
        toast.error(message);

        // Check if the request URL contains authentication-related endpoints
        const url = error.config.url;
        const isAuthRoute =
          url &&
          (url.includes("/login") ||
            url.includes("/register") ||
            url.includes("/send-otp") ||
            url.includes("/verify-otp") ||
            url.includes("/reset") ||
            url.includes("/check-code") ||
            url.includes("/confirm-reset"));

        // Only clear token and redirect for non-auth routes
        if (!isAuthRoute) {
          localStorage.removeItem("access_token");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000); // Wait 2 seconds before redirecting
        }
        break;

      case 403: // Forbidden
        message =
          currentLanguage === "ar" ? "غير مصرح لك بالوصول" : "Access Forbidden";
        toast.error(message);
        break;

      case 404: // Not Found
        message =
          currentLanguage === "ar"
            ? "لم يتم العثور على المورد المطلوب"
            : "Resource Not Found";
        toast.error(message);
        break;

      case 422: // Validation Error
        message =
          currentLanguage === "ar"
            ? "خطأ في التحقق من البيانات"
            : "Validation Error";

        // Handle validation errors (typically array of errors)
        if (data.errors && typeof data.errors === "object") {
          const firstError = Object.values(data.errors)[0];
          if (Array.isArray(firstError) && firstError.length > 0) {
            message = firstError[0];
          }
        } else if (errorMessage) {
          message = errorMessage;
        }

        toast.error(message);
        break;

      case 429: // Too Many Requests
        message =
          currentLanguage === "ar"
            ? "طلبات كثيرة جدًا، يرجى المحاولة لاحقًا"
            : "Too Many Requests, please try again later";
        toast.error(message);
        break;

      case 500: // Server Error
        message = currentLanguage === "ar" ? "خطأ في الخادم" : "Server Error";
        toast.error(message);
        break;

      case 503: // Service Unavailable
        message =
          currentLanguage === "ar"
            ? "الخدمة غير متوفرة حاليًا"
            : "Service Unavailable";
        toast.error(message);
        break;

      default:
        // Generic error handler
        if (errorMessage) {
          message = errorMessage;
        }
        toast.error(message);
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
