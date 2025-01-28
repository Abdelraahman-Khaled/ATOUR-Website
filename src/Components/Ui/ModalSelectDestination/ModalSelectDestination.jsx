import CustomModal from "Components/CustomModal/CustomModal";
import logo from "../../../assets/images/login/logoLogin.svg";
import LocationIcon from "assets/Icons/LocationIcon";
import "./ModalSelectDestination.css";
import SearchInputLocation from "../SearchInputLocation/SearchInputLocation";
const ModalSelectDestination = ({
  showModalSelectDestination,
  hideModalSelectDestination
}) => {
  return (
    <CustomModal
      show={showModalSelectDestination}
      onHide={hideModalSelectDestination}
      title={"قم بتحديد الوجهه"}
      newClass={"modal-select-destination"}
    >
      {/* ================== START ALL SELECT DEST =============== */}
      <div className="all-select-dest input-search-head d-flex flex-column gap-3 justify-content-center align-items-center text-center w-100">
        <div className="image-logo mb-2">
          <img src={logo} alt="imageLogo" />
        </div>
        <div className="content-info-modal w-100 d-flex flex-column gap-3">
          <h2 className="title">قم بتحديد الوجهه</h2>
          <p className="text">من فضلك قم بتحديد الوجهه المقصودة </p>
          {/* ========== START SEARCH INPUT LOCATION ============= */}
          <SearchInputLocation />
          {/* ========== END SEARCH INPUT LOCATION ============= */}
          <button className="btn-main w-100">بحث</button>
        </div>
      </div>
      {/* ================== END ALL SELECT DEST =============== */}
    </CustomModal>
  );
};

export default ModalSelectDestination;
