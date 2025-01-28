import React, { useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import DateIcon from "assets/Icons/DateIcon";
import "./DatePickerComponent.css";
const DatePickerComponent = ({ addTextPlaceHolder }) => {
  // SELECT DAY DATE
  const [selectedDay, setSelectedDay] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDay(date);
  };

  return (
    <>
      {/* ======== START SEARCH INPUT ========= */}
      <div className="input-date-content">
        <DatePicker
          value={selectedDay}
          onChange={handleDateChange}
          inputPlaceholder={selectedDay ? selectedDay : `${addTextPlaceHolder}`}
          shouldHighlightWeekends
        />
        <div className="icon-date-add">
          <DateIcon />
        </div>
      </div>
      {/* ======== END SEARCH INPUT ========= */}
    </>
  );
};

export default DatePickerComponent;
