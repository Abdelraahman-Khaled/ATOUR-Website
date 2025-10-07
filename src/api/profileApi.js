import axiosInstance from "./axiosInstance";

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
};

export default ProfileAPI;
