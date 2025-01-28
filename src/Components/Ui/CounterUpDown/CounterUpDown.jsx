import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./CounterUpDown.css";

function CounterUpDown({
  initialValue = 1,
  minValue = 1,
  maxValue = Infinity,
  onChange
}) {
  const [count, setCount] = useState(initialValue);

  const handleIncrease = () => {
    if (count < maxValue) {
      setCount(count + 1);
      onChange && onChange(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > minValue) {
      setCount(count - 1);
      onChange && onChange(count - 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minValue && value <= maxValue) {
      setCount(value);
      onChange && onChange(value);
    }
  };

  return (
    <>
      <div className="counter-product d-flex align-items-center gap-2">
        <button className="btn-main" onClick={handleDecrease}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type="text"
          className="num-counter"
          value={count}
          onChange={handleChange}
        />
        <button className="btn-main" onClick={handleIncrease}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
}

export default CounterUpDown;
