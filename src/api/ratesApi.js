import axiosInstance from "./axiosInstance"; // your configured axios

const RatesAPI = {
  // Save new rate
  saveRate: async ({ comment, rate, model_id, model_type, images }) => {
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rate", rate);
    formData.append("model_id", model_id);
    formData.append("model_type", model_type);

    if (images && images.length > 0) {
      images.forEach((img, idx) => {
        formData.append(`images[${idx}]`, img);
      });
    }

    const response = await axiosInstance.post("/save_rate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Get rates by model
  getRates: async (id, type) => {
    const response = await axiosInstance.get(`/rates/${id}/${type}`);
    return response.data;
  },
};

export default RatesAPI;
