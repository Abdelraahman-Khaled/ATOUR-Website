import React, { useState } from "react";

const FilterByCategory = ({ checkboxCount, checkboxLabels }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const handleCheckboxChange = (index) => {
    setCheckedItems((prevState) => {
      const newCheckedItems = [...prevState];
      if (newCheckedItems.includes(index)) {
        newCheckedItems.splice(newCheckedItems.indexOf(index), 1);
      } else {
        newCheckedItems.push(index);
      }
      return newCheckedItems;
    });
  };
  return (
    <div className="filter-by-category border-bottom-card">
      <h2 className="title">فرز</h2>
      {/* ============= START ALL FILTER CATEGORY ============ */}
      <div className="all-filter-category">
        {[...Array(checkboxCount)].map((_, index) => (
          <div className="form-check filter-categorey-one-button" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`checkbox${index}`}
              checked={checkedItems.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            <label className="form-check-label" htmlFor={`checkbox${index}`}>
              {checkboxLabels && checkboxLabels[index]
                ? checkboxLabels[index]
                : `Checkbox ${index + 1}`}
            </label>
          </div>
        ))}
      </div>
      {/* ============= END ALL FILTER CATEGORY ============ */}
    </div>
  );
};

export default FilterByCategory;
