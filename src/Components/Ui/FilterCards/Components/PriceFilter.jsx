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
};

const minDistance = 10;
const MIN = 10;
const MAX = 2000;

const PriceFilter = ({ onPriceChange }) => {
  const [value, setValue] = useState([100, 300]);
  const { currentLanguage } = useLanguage();

  const handleSliderChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    let finalValue = [...newValue];
    if (finalValue[1] - finalValue[0] < minDistance) {
      if (activeThumb === 0) {
        finalValue[0] = Math.min(finalValue[0], MAX - minDistance);
        finalValue[1] = finalValue[0] + minDistance;
      } else {
        finalValue[1] = Math.max(finalValue[1], MIN + minDistance);
        finalValue[0] = finalValue[1] - minDistance;
      }
    }
    setValue(finalValue);
    onPriceChange?.({ min_price: finalValue[0], max_price: finalValue[1] });
  };

  // 🔑 Let user type freely
  const handleMinChange = (e) => {
    const newVal = Number(e.target.value);
    setValue((prev) => [newVal, prev[1]]);
  };

  const handleMaxChange = (e) => {
    const newVal = Number(e.target.value);
    setValue((prev) => [prev[0], newVal]);
  };

  // 🔑 Validate when leaving the input (blur)
  const handleBlur = () => {
    let [minVal, maxVal] = value;

    if (minVal < MIN) minVal = MIN;
    if (maxVal > MAX) maxVal = MAX;
    if (maxVal - minVal < minDistance) {
      if (minVal + minDistance <= MAX) {
        maxVal = minVal + minDistance;
      } else {
        minVal = maxVal - minDistance;
      }
    }

    setValue([minVal, maxVal]);
    onPriceChange?.({ min_price: minVal, max_price: maxVal });
  };

  return (
    <div className="price-filter-content" dir={["ar", "ur"].includes(currentLanguage) ? "rtl" : "ltr"}>
      <Slider
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        disableSwap
      />
      <div className="row g-3">
        <div className="col-6">
          <label htmlFor="min-input" className="form-label">
            {content[currentLanguage].from}
          </label>
          <input
            id="min-input"
            type="number"
            value={value[0]}
            onChange={handleMinChange}
            onBlur={handleBlur}
            min={MIN}
            max={MAX}
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
            value={value[1]}
            onChange={handleMaxChange}
            onBlur={handleBlur}
            min={MIN}
            max={MAX}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
