import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

const getCurrentLanguage = () => localStorage.getItem("language") || "en";

const translate = {
  "emailAlreadyUsed": {
    "en": "The email is already in use",
    "ar": "البريد الإلكتروني مُستخدم من قبل",
    "fr": "L'e-mail est déjà utilisé",
    "de": "Die E-Mail wird bereits verwendet",
    "es": "El correo electrónico ya está en uso",
    "tr": "E-posta zaten kullanımda",
    "ru": "Электронная почта уже используется",
    "zh": "该电子邮件已被使用",
    "ko": "이 이메일은 이미 사용 중입니다",
    "pt": "O e-mail já está em uso",
    "ur": "ای میل پہلے سے استعمال میں ہے",
    "ja": "このメールは既に使用されています"
  }
}
const ProfileAPI = {
  getProfile: async () => {
    const response = await axiosInstance.get("/profile");
    return response.data;
  },
  getNationality: async () => {
    const response = await axiosInstance.get("/nationalities");
    return response.data;
  },
  updateProfile: async (
    firstName,
    image,
    nationality_id,
    phone,
    birthdate,
    gender
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", firstName);
      if (nationality_id) {
        formData.append("nationality_id", nationality_id);
      }
      if (phone) {
        formData.append("phone", phone);
      }
      if (image) {
        formData.append("image", image); // Append image file
      }
      if (birthdate) {
        formData.append("birthdate", birthdate);
      }
      if (gender) {
        formData.append("gender", gender);
      }

      const response = await axiosInstance.post("/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Specify multipart for FormData
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in updateProfile:", error.response || error.message);
      throw error; // Rethrow for further handling
    }
  },
  sendCode: async (username) => {
    const response = await axiosInstance.post("/send-code", { username });
    return response.data;
  },
  updateEmail: async (email, code) => {

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("code", code);
      const response = await axiosInstance.post("/update-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      return response.data;
    } catch (error) {
      if (error.response?.data?.errors?.email?.[0] === "قيمة الحقل البريد الالكتروني مُستخدمة من قبل") {
        toast.error(translate.emailAlreadyUsed[getCurrentLanguage()]);
      }
      console.error("Error in updateEmail:", error.response.data.errors.email || error.message);
      throw error;
    }
  },
};

export default ProfileAPI;
