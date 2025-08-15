import axiosInstance from "./axiosInstance";

const BookingAPI = {
  // Get details of a specific booking
  getBookingDetails: async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  },

  // Trigger payment for a specific trip
  tripPay: async (tripId) => {
    const response = await axiosInstance.get(`/trip-pay/${tripId}`);
    return response.data;
  },

  // Trigger payment for a specific effectiveness booking
  effectivenePay: async (effectiveneId) => {
    const response = await axiosInstance.get(
      `/effectivene-pay/${effectiveneId}`
    );
    return response.data;
  },

  // Trigger payment for a specific gift booking
  giftPay: async (giftId) => {
    const response = await axiosInstance.get(`/gift-pay/${giftId}`);
    return response.data;
  },

  // Get a list of all bookings
  getBookings: async (language) => {
    const response = await axiosInstance.get("/bookings", {
      headers: {
        language: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  // tripe dates
  bookCalender: async (id) => {
    const response = await axiosInstance.get(
      `/trip-calendar/${id}`
    );
    return response.data;
  },
  // Book a trip
  bookTrip: async ({
    tripId,
    bookingDate,
    peopleNumber,
    childrenNumber,
    paymentWay,
    time,
    bookingDay,
    language
  }) => {
    const response = await axiosInstance.post("/booking-trip", {
      trip_id: tripId,
      booking_date: bookingDate,
      people_number: peopleNumber,
      children_number: childrenNumber,
      payment_way: paymentWay,
      booking_time: time,
      booking_day: bookingDay,
      headers: {
        language: language,
      },
    });
    return response.data;
  },

  // Book a gift
  bookGift: async ({
    giftId,
    paymentWay,
    quantity,
    deliveryWay,
    deliveryAddress,
    number,
    location
  }) => {
    const response = await axiosInstance.post("/booking-gift", {
      gift_id: giftId,
      payment_way: paymentWay,
      quantity,
      delivery_way: deliveryWay,
      delivery_address: deliveryAddress,
      delivery_number: number,
      location
    });
    return response.data;
  },

  // Book an effectiveness package
  bookEffectivene: async ({ effectiveneId, paymentWay }) => {
    const response = await axiosInstance.post("/booking-effectivene", {
      effectivene_id: effectiveneId,
      payment_way: paymentWay,
    });
    return response.data;
  },

  // Cancel a booking
  cancelBooking: async (orderId) => {
    const response = await axiosInstance.get(`/cancel/${orderId}`);
    return response.data;
  },


  // get payment status
  getPaymentStatus: async (url,id) => {
    const response = await axiosInstance.get(`/${url}/${id}`);
    return response.data;
  },
};

export default BookingAPI;
