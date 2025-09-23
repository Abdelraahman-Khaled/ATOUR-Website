import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext(null);

export const useBooking = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  const value = {
    selectedDate,
    setSelectedDate,
    numberOfPeople,
    setNumberOfPeople,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};