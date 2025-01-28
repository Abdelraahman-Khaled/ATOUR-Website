import CustomModal from "Components/CustomModal/CustomModal";
import imageSuccess from "../../../assets/images/success/Success.gif";
import "./SuccessSend.css";
const SuccessSend = ({
  showsuccessModalSend,
  hideSuccessModalSend,
  titleModal,
  titleSend,
  isTrueText,
  textSend,
  textButton
}) => {
  return (
    <CustomModal
      show={showsuccessModalSend}
      onHide={hideSuccessModalSend}
      title={titleModal}
      newClass={"success-modal-send"}
    >
      <div className="success-send">
        <div className="icon-success d-flex  justify-content-center  align-items-center ">
          <img
            src={imageSuccess}
            alt="icon success"
            loading="lazy"
            width={"200px"}
            height={"200px"}
          />
        </div>
        <div className="content-info-success d-flex  flex-column  justify-content-center  align-items-center  text-center  gap-3">
          <h2 className="title">{titleSend}</h2>
          {isTrueText && <p className="text">{textSend}</p>}
          <button className="btn-main w-100" onClick={hideSuccessModalSend}>
            {textButton}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default SuccessSend;
