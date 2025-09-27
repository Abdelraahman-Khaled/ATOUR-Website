import { Slider } from "@mui/material";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useState } from "react";

const content = {
  en: { from: 'From', to: 'To' },
  ar: { from: 'من', to: 'إلى' },
  fr: { from: 'De', to: 'À' },
  de: { from: 'Von', to: 'Bis' },
  es: { from: 'Desde', to: 'Hasta' },
  tr: { from: 'Başlangıç', to: 'Bitiş' },
  ru: { from: 'От', to: 'До' },
  zh: { from: '从', to: '到' },
  ko: { from: '부터', to: '까지' },
  pt: { from: 'De', to: 'Até' },
  ur: { from: 'سے', to: 'تک' },
  ja: { from: 'から', to: 'まで' }
}


const minDistance = 10;

const PriceFilter = ({ onPriceChange }) => {
  const [value2, setValue2] = useState([10, 300]);
  const { currentLanguage } = useLanguage();

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let finalValue;
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 500 - minDistance);
        finalValue = [clamped, clamped + minDistance];
      } else {
        const clamped = Math.max(newValue[1], 100 + minDistance);
        finalValue = [clamped - minDistance, clamped];
      }
    } else {
      finalValue = newValue;
    }

    setValue2(finalValue);

    // Call the callback with min and max price
    if (onPriceChange) {
      onPriceChange({
        min_price: finalValue[0],
        max_price: finalValue[1]
      });
    }
  };

  const handleMinInputChange = (event) => {
    const newMinValue = Number(event.target.value);
    setValue2((prevValue) => {
      const clampedMax = Math.max(prevValue[1], newMinValue + minDistance);
      const newValue = [newMinValue, clampedMax];

      // Call the callback with min and max price
      if (onPriceChange) {
        onPriceChange({
          min_price: newValue[0],
          max_price: newValue[1]
        });
      }

      return newValue;
    });
  };

  const handleMaxInputChange = (event) => {
    const newMaxValue = Number(event.target.value);
    setValue2((prevValue) => {
      const clampedMin = Math.min(prevValue[0], newMaxValue - minDistance);
      const newValue = [clampedMin, newMaxValue];

      // Call the callback with min and max price
      if (onPriceChange) {
        onPriceChange({
          min_price: newValue[0],
          max_price: newValue[1]
        });
      }

      return newValue;
    });
  };

  return (
    <div className="price-filter-content">

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
            {content[currentLanguage].from}
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
            {content[currentLanguage].to}
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
