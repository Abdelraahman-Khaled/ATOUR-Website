import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as starReg } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FilterByRate = () => {
  const [selectedRate, setSelectedRate] = useState(null);

  const handleCheckboxChange = (rate) => {
    setSelectedRate(rate);
  };

  const starIcons = [
    { id: "rate1", stars: [faStar, faStar, faStar, faStar, faStar] },
    { id: "rate2", stars: [faStar, faStar, faStar, faStar, starReg] },
    { id: "rate3", stars: [faStar, faStar, faStar, starReg, starReg] },
    { id: "rate4", stars: [faStar, faStar, starReg, starReg, starReg] },
    { id: "rate5", stars: [faStar, starReg, starReg, starReg, starReg] }
  ];
  return (
    <div className="filter-rate">
      <h2 className="title">التقييمات</h2>
      {/* ============= START RATE FILTER ONE ============== */}
      <div className="all-filter-rate-stars">
        {starIcons.map((icons) => (
          <div className="form-check rate-filter-one" key={icons.id}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`checkbox${icons.id}`}
              checked={selectedRate === icons.id}
              onChange={() => handleCheckboxChange(icons.id)}
            />
            <label className="form-check-label d-flex  align-items-center  gap-1" htmlFor={`checkbox${icons.id}`}>
              {icons.stars.map((icon, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={icon}
                  className="rate-star-icon"
                />
              ))}
            </label>
          </div>
        ))}
      </div>
      {/* ============= END RATE FILTER ONE ============== */}
    </div>
  );
};

export default FilterByRate;
