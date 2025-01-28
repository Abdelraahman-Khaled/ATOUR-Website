import CustomModal from "Components/CustomModal/CustomModal";
import CounterUpDown from "Components/Ui/CounterUpDown/CounterUpDown";
import { useState } from "react";

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

  // Handle saving the selected values
  const handleSave = () => {
    onSave(adultsCount, childrenCount); // Pass the selected values to the parent
  };

  return (
    <CustomModal
      show={showModalNumberIndividuals}
      onHide={hideModalNumberIndividuals}
      title={"عدد الأفراد"}
      newClass={"modal-number-individuals"}
    >
      <div className="all-content-number-individuals d-flex justify-content-center flex-column gap-3 align-items-center">
        {/* Adults Counter */}
        <div className="content-number-one d-flex align-items-center gap-3 flex-column">
          <h2 className="title">عدد البالغين</h2>
          <CounterUpDown
            initialValue={adultsCount}
            minValue={1}
            maxValue={15}
            onChange={setAdultsCount} // Update adults count
          />
        </div>

        {/* Children Counter */}
        <div className="content-number-one d-flex align-items-center gap-3 flex-column">
          <h2 className="title">عدد الأطفال</h2>
          <CounterUpDown
            initialValue={childrenCount}
            minValue={0}
            maxValue={15}
            onChange={setChildrenCount} // Update children count
          />
        </div>

        {/* Save Button */}
        <button className="btn-main w-100" onClick={handleSave}>
          حفظ
        </button>
      </div>
    </CustomModal>
  );
};

export default ModalNumberIndividuals;