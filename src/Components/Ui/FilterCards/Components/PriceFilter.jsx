import { Slider } from "@mui/material";
import  { useState } from "react";

const minDistance = 10;

const PriceFilter = () => {
  const [value2, setValue2] = useState([10, 300]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 500 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], 100 + minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  const handleMinInputChange = (event) => {
    const newMinValue = Number(event.target.value);
    setValue2((prevValue) => {
      const clampedMax = Math.max(prevValue[1], newMinValue + minDistance);
      return [newMinValue, clampedMax];
    });
  };

  const handleMaxInputChange = (event) => {
    const newMaxValue = Number(event.target.value);
    setValue2((prevValue) => {
      const clampedMin = Math.min(prevValue[0], newMaxValue - minDistance);
      return [clampedMin, newMaxValue];
    });
  };

  return (
    <div className="price-filter-content">
      <div className="title">السعر</div>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => `${value}`}
        disableSwap
        min={100}
        max={500}
      />
      <div className="row g-3">
        <div className="col-6">
          <label htmlFor="min-input" className="form-label">
            من
          </label>
          <input
            id="min-input"
            type="number"
            value={value2[0]}
            onChange={handleMinInputChange}
            min={100}
            max={500}
            className="form-control"
          />
        </div>
        <div className="col-6">
          <label htmlFor="max-input" className="form-label">
            الى
          </label>
          <input
            id="max-input"
            type="number"
            value={value2[1]}
            onChange={handleMaxInputChange}
            min={100}
            max={500}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
