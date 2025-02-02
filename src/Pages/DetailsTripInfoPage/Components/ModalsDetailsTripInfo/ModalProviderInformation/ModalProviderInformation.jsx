import CustomModal from "Components/CustomModal/CustomModal";
import { useLanguage } from "Components/Languages/LanguageContext";
import HeaderProviderContent from "./HeaderProviderContent";
import TabsContentModal from "./TabsContentModal";

const ModalProviderInformation = ({
  showModalProviderInformation,
  hideModalProviderInformation
}) => {
  const {currentLanguage} = useLanguage()
  return (
    <CustomModal
      show={showModalProviderInformation}
      onHide={hideModalProviderInformation}
      title={currentLanguage==="ar"?"معلومات المزود":"Provider Information"}
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
