import React, { useEffect, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import DateIcon from "assets/Icons/DateIcon";
import "./DatePickerComponent.css";
import { useParams } from "react-router-dom";
import BookingAPI from "api/bookingApi";

const DatePickerComponent = ({ addTextPlaceHolder, setSelectedDay, selectedDay }) => {
  const [error, setError] = useState(null);
  const [dates, setDates] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTripCalendar = async () => {
      try {
        const response = await BookingAPI.bookCalender(id);
        setDates(response.data);
      } catch (err) {
        console.error("Error fetching calendar data:", err);
        setError("Failed to load calendar data. Please try again later.");
      }
    };
    fetchTripCalendar();
  }, [id]);

  const availableDates = dates
    .filter(item => item.status === "available")
    .map(item => {
      const [year, month, day] = item.date.split("-").map(Number);
      return { year, month, day };
    });

  const notAvailableDates = dates
    .filter(item => item.status === "not_available")
    .map(item => {
      const [year, month, day] = item.date.split("-").map(Number);
      return { year, month, day };
    });

  const handleDateChange = (date) => {
    setSelectedDay(date);
  };

  const formatPlaceholder = () => {
    if (!selectedDay) return addTextPlaceHolder;
    return `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`;
  };

  return (
    <>
      <div className="input-date-content">
        <DatePicker
          value={selectedDay}
          onChange={handleDateChange}
          inputPlaceholder={formatPlaceholder()}
          shouldHighlightWeekends
          locale="en"
          minimumDate={availableDates[0]}
          maximumDate={availableDates[availableDates.length - 1]}
          disabledDays={notAvailableDates}
          customDaysClassName={notAvailableDates.map(date => ({
            ...date,
            className: "not-available-date"
          }))}
        />
        <div className="icon-date-add">
          <DateIcon />
        </div>
      </div>
      {error && <p className="text-danger mt-2">{error}</p>}
    </>
  );
};

export default DatePickerComponent;
