import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./CounterUpDown.css";

function CounterUpDown({
  minValue = 1,
  maxValue,
  onChange,
  disablePlus = false,
  initialValue,
}) {
  // const [count, setCount] = useState(minValue);
  // console.log("minValue", minValue);
  // console.log("maxValue", maxValue);
  

  const handleIncrease = () => {
    if (initialValue < maxValue && !disablePlus) {
      // setCount(count + 1);
      onChange && onChange(initialValue + 1);
    }
  };

  const handleDecrease = () => {
    if (initialValue > minValue) {
      // setCount(count - 1);
      onChange && onChange(initialValue - 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minValue && value <= maxValue) {
      // setCount(value);
      onChange && onChange(value);
    }
  };

  return (
    <div className="counter-product d-flex align-items-center gap-2">
      <button className="btn-main" onClick={handleDecrease}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <input
        type="text"
        className="num-counter"
        value={initialValue}
        onChange={handleChange}
      />
      <button className="btn-main" onClick={handleIncrease} disabled={disablePlus}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default CounterUpDown;
