import axiosInstance from "./axiosInstance";

const RatesAPI = {
  getRates: async (modelId, modelType) => {
    const response = await axiosInstance.get(`/rates/${modelId}/${modelType}`);
    return response.data;
  },
  addRate: async ({ comment, rate, modelId, modelType, images = [] }) => {
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rate", rate);
    formData.append("model_id", modelId);
    formData.append("model_type", modelType);
    if (images.length) {
      images.forEach((image) => formData.append("images[]", image));
    }
    const response = await axiosInstance.post("/save_rate", formData);
    return response.data;
  },
};

export default RatesAPI;
