import axiosInstance from './axiosInstance';

export const getNotifications = async (language) => {
  const response = await axiosInstance.get('/notifications', {
    headers: {
      lang: language,
    },
  });
  return response.data.data;
};

export const markNotificationAsRead = async (id) => {
  await axiosInstance.get(`/notifications-read/${id}`);
};