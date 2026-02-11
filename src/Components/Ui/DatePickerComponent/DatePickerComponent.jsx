import React, { useEffect, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import DateIcon from "assets/Icons/DateIcon";
import "./DatePickerComponent.css";
import { useParams } from "react-router-dom";
import BookingAPI from "api/bookingApi";

const DatePickerComponent = ({ addTextPlaceHolder, setSelectedDay, selectedDay, disabled }) => {
  const [error, setError] = useState(null);
  const [dates, setDates] = useState([]);
  const { id } = useParams();

  // ... (keep useEffect and other logic same, just updating the return and props)

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

  // ✅ Convert API dates to calendar format
  const parseDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return { year, month, day };
  };

  // ✅ Available dates
  const availableDates = dates
    .filter(item => item.status === "available")
    .map(item => parseDate(item.date));

  // ✅ Disabled dates (full + not available)
  const disabledDates = dates
    .filter(item => item.status !== "available")
    .map(item => parseDate(item.date));

  const handleDateChange = (date) => {
    setSelectedDay(date);
  };

  const formatPlaceholder = () => {
    if (!selectedDay) return addTextPlaceHolder;
    return `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`;
  };

  return (
    <>
      <div
        className={`input-date-content ${disabled ? 'disabled-date-picker' : ''}`}
        style={disabled ? { pointerEvents: 'none', opacity: 0.7 } : {}}
      >
        <DatePicker
          value={selectedDay}
          onChange={handleDateChange}
          inputPlaceholder={formatPlaceholder()}
          locale="en"
          minimumDate={availableDates[0]} // ✅ calendar starts from first available date
          maximumDate={availableDates[availableDates.length - 1]}
          disabledDays={disabledDates} // ✅ disable full + not available
          customDaysClassName={disabledDates.map(date => ({
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
