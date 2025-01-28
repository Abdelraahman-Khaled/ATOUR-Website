import axiosInstance from "./axiosInstance";

const FavouritesAPI = {
  getFavourites: async () => {
    const response = await axiosInstance.get("/favourite");
    return response.data;
  },
  toggleFavourite: async (modelType, modelId) => {
    const response = await axiosInstance.get(`/save-favourite/${modelType}/${modelId}`);
    return response.data;
  },
  removeFromFavourite: async (modelType, modelId) => {
    const response = await axiosInstance.get(`/remove-favourite/${modelType}/${modelId}`);
    return response.data;
  },
};

export default FavouritesAPI;
