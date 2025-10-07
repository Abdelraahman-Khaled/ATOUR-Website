import React from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import DateIcon from "assets/Icons/DateIcon";
import "./DatePickerComponent.css";

const SimpleDatePickerComponent = ({ addTextPlaceHolder, value, onChange }) => {

  const formatPlaceholder = () => {
    if (!value) return addTextPlaceHolder;
    return `${value.day}/${value.month}/${value.year}`;
  };

  return (
    <>
      <div className="input-date-content">
        <DatePicker
          value={value}
          onChange={onChange}
          placeholder={addTextPlaceHolder}
          locale="en"
        />
        <div className="icon-date-add">
          <DateIcon />
        </div>
      </div>
    </>
  );
};

export default SimpleDatePickerComponent;