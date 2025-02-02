import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "api/axiosInstance";
import { useLanguage } from "Components/Languages/LanguageContext";

const PrivateRoute = ({ children }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  if (!isAuthenticated()) {
    toast.warning(currentLanguage === "ar" ? "تحتاج إلي تسجيل الدخول أولا" : "You need to log in first!");
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;


