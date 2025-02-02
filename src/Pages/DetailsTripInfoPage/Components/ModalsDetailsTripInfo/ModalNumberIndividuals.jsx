import CustomModal from "Components/CustomModal/CustomModal";
import { useLanguage } from "Components/Languages/LanguageContext";
import CounterUpDown from "Components/Ui/CounterUpDown/CounterUpDown";
import { useState } from "react";

const MAX_TOTAL = 15; // Maximum total of adults and children

const ModalNumberIndividuals = ({
  showModalNumberIndividuals,
  hideModalNumberIndividuals,
  onSave, // Function to save the selected values
  initialAdults, // Initial number of adults
  initialChildren, // Initial number of children
}) => {
  // State for number of adults and children
  const [adultsCount, setAdultsCount] = useState(initialAdults);
  const [childrenCount, setChildrenCount] = useState(initialChildren);

  // Handle changes in adults count
  const handleAdultsChange = (newAdults) => {
    const remainingForChildren = MAX_TOTAL - newAdults;
    setAdultsCount(newAdults);
    setChildrenCount((prevChildren) => Math.min(prevChildren, remainingForChildren));
  };

  // Handle changes in children count
  const handleChildrenChange = (newChildren) => {
    const remainingForAdults = MAX_TOTAL - newChildren;
    setChildrenCount(newChildren);
    setAdultsCount((prevAdults) => Math.min(prevAdults, remainingForAdults));
  };

  // Determine if the plus button should be disabled
  const isMaxReached = adultsCount + childrenCount >= MAX_TOTAL;

  // Handle saving the selected values
  const handleSave = () => {
    onSave(adultsCount, childrenCount); // Pass the selected values to the parent
  };
  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    <CustomModal
      show={showModalNumberIndividuals}
      onHide={hideModalNumberIndividuals}
      title={currentLanguage === "ar" ? "عدد الأفراد" : "Number of Individuals"}
      newClass={"modal-number-individuals"}
    >
      <div className="all-content-number-individuals d-flex justify-content-center flex-column gap-3 align-items-center">
        {/* Adults Counter */}
        <div className="content-number-one d-flex align-items-center gap-3 flex-column">
          <h2 className="title">{currentLanguage === "ar" ? "عدد البالغين" : "Number of Adults"}</h2>
          <CounterUpDown
            initialValue={adultsCount}
            minValue={1}
            maxValue={MAX_TOTAL}
            onChange={handleAdultsChange} // Update adults count with limit logic
            disablePlus={isMaxReached} // Disable plus button when max total is reached
          />
        </div>

        {/* Children Counter */}
        <div className="content-number-one d-flex align-items-center gap-3 flex-column">
          <h2 className="title">{currentLanguage === "ar" ? "عدد الأطفال" : "Number of Children"}</h2>
          <CounterUpDown
            initialValue={childrenCount}
            minValue={0}
            maxValue={MAX_TOTAL}
            onChange={handleChildrenChange} // Update children count with limit logic
            disablePlus={isMaxReached} // Disable plus button when max total is reached
          />
        </div>

        {/* Save Button */}
        <button className="btn-main w-100" onClick={handleSave}>
          {currentLanguage === "ar" ? "حفظ" : "Save"}
        </button>
      </div>
    </CustomModal>
  );
};

export default ModalNumberIndividuals;
