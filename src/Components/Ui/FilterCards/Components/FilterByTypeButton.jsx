import { useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";

const FilterByTypeButton = ({ buttonCount, buttonLabels, onButtonClick, subCategories }) => {
  const [activeButtons, setActiveButtons] = useState([]);
  const { currentLanguage } = useLanguage();
  const content = {
    ar: "النوع",
    en: "Type",
    fr: "Type",
    de: "Typ",
    es: "Tipo",
    tr: "Tip",
    ru: "Тип",
    zh: "类型",
    ko: "유형",
    pt: "Tipo",
    ur: "ٹიპ",
    ja: "種類",
  };

  const handleClick = (index) => {
    setActiveButtons((prevState) => {
      const newActiveButtons = [...prevState];
      let updatedSelectedSubCategoryIds;

      if (newActiveButtons.includes(index)) {
        // Deselect button
        newActiveButtons.splice(newActiveButtons.indexOf(index), 1);
      } else {
        // Select button
        newActiveButtons.push(index);
      }

      // Map active button indices to their sub_category_ids
      updatedSelectedSubCategoryIds = newActiveButtons.map(activeIdx => subCategories[activeIdx].id);
      onButtonClick(updatedSelectedSubCategoryIds);
      return newActiveButtons;
    });
  };
  return (
    // border-bottom-card add it when we back CSS
    <div className="all-buttons-filter-content  price-filter-content ">
      <h2 className="title mb-3">{content[currentLanguage]}</h2>
      <div className="main-buttons-filter-content change-scroll d-flex align-items-center  gap-2 flex-wrap">
        {[...Array(buttonCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`main-btn-filter ${activeButtons.includes(index) ? "active" : ""
              }`}
          >
            {buttonLabels[index]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterByTypeButton;
