import  { useState } from "react";

const FilterByTypeButton = ({ buttonCount, buttonLabels }) => {
  const [activeButtons, setActiveButtons] = useState([]);

  const handleClick = (index) => {
    setActiveButtons((prevState) => {
      const newActiveButtons = [...prevState];
      if (newActiveButtons.includes(index)) {
        newActiveButtons.splice(newActiveButtons.indexOf(index), 1);
      } else {
        newActiveButtons.push(index);
      }
      return newActiveButtons;
    });
  };
  return (
    <div className="all-buttons-filter-content   border-bottom-card">
      <h2 className="title">النوع</h2>
      <div className="main-buttons-filter-content change-scroll d-flex align-items-center  gap-2 flex-wrap">
        {[...Array(buttonCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`main-btn-filter ${
              activeButtons.includes(index) ? "active" : ""
            }`}
          >
            {buttonLabels && buttonLabels[index]
              ? buttonLabels[index]
              : `Button ${index + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterByTypeButton;
