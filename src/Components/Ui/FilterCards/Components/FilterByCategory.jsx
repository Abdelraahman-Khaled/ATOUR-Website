import { useLanguage } from "Components/Languages/LanguageContext";
import React, { useState } from "react";

const FilterByCategory = ({ checkboxCount, checkboxLabels, onCheckboxChange, checkboxFilters }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const { currentLanguage } = useLanguage();
  const content = {
    ar: "فرز",
    en: "Sort",
    fr: "Trier",
    de: "Sortieren",
    es: "Ordenar",
    tr: "Sırala",
    ru: "Сортировать",
    zh: "排序",
    ko: "정렬",
    pt: "Ordenar",
    ur: "فرز کریں",
    ja: "並べ替え",
  };
  
  // Map checkbox indices to filter types
  const getFilterType = (index) => {
    const filterTypes = ['max_rate', 'has_offer', 'max_booked'];
    return filterTypes[index] || null;
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevState) => {
      const newCheckedItems = [...prevState];
      const isChecked = newCheckedItems.includes(index);

      if (isChecked) {
        newCheckedItems.splice(newCheckedItems.indexOf(index), 1);
      } else {
        newCheckedItems.push(index);
      }

      // Call the parent callback with the filter type and checked state
      const filterType = getFilterType(index);
      if (filterType && onCheckboxChange) {
        onCheckboxChange(filterType, !isChecked);
      }

      return newCheckedItems;
    });
  };
  return (
    <div className="filter-by-category border-bottom-card ">
      <h2 className="title">{content[currentLanguage]}</h2>
      {/* ============= START ALL FILTER CATEGORY ============ */}
      <div className="all-filter-category">
        {[...Array(checkboxCount)].map((_, index) => {
          const filterType = getFilterType(index);
          const isChecked = filterType && checkboxFilters ? checkboxFilters[filterType] === 1 : false;

          return (
            <div className="form-check filter-categorey-one-button" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`checkbox${index}`}
                checked={isChecked}
                onChange={() => handleCheckboxChange(index)}
              />
              <label className="form-check-label" htmlFor={`checkbox${index}`}>
                {checkboxLabels && checkboxLabels[index]
                  ? checkboxLabels[index]
                  : `Checkbox ${index + 1}`}
              </label>
            </div>
          );
        })}
      </div>
      {/* ============= END ALL FILTER CATEGORY ============ */}
    </div>
  );
};

export default FilterByCategory;
