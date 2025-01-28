import CustomModal from "Components/CustomModal/CustomModal";
import HeaderProviderContent from "./HeaderProviderContent";
import TabsContentModal from "./TabsContentModal";

const ModalProviderInformation = ({
  showModalProviderInformation,
  hideModalProviderInformation
}) => {
  return (
    <CustomModal
      show={showModalProviderInformation}
      onHide={hideModalProviderInformation}
      title={"معلومات المزود"}
      newClass={"modal-provider-information modal-width-content"}
    >
      {/* ================= START ALL PROVIDER INFO =============== */}
      <div className="all-provider-info">
        <HeaderProviderContent />
        <TabsContentModal />
     
      </div>
      {/* ================= END ALL PROVIDER INFO =============== */}
    </CustomModal>
  );
};

export default ModalProviderInformation;
