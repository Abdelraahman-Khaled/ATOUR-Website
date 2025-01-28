import CustomModal from "Components/CustomModal/CustomModal";
import { toast } from "react-toastify";
import "./ModalRemove.css";
import TrashIcon from "assets/Icons/TrashIcon";
const ModalRemove = ({
  showModalPayRemove,
  hideModalPayRemove,
  titleModal,
  title,
  text
}) => {
  const cancelButton = () => {
    hideModalPayRemove();
    toast.success("تم الالغاء  بنجاح");
  };
  const removeButton = () => {
    hideModalPayRemove();
    toast.success("تم الحذف بنجاح");
  };

  return (
    <CustomModal
      show={showModalPayRemove}
      onHide={hideModalPayRemove}
      title={titleModal}
      newClass={"modal-remove"}
    >
      <div className="content-modal-remove">
        <div className="icon-remove-top">
          <TrashIcon />
        </div>
        <h2 className="title">{title}</h2>
        <p className="text">{text}</p>
        <div className="buttons-modal-bottom d-flex align-items-center gap-3">
          <button onClick={removeButton} className="btn-main btn-remove">
            حذف
          </button>
          <button onClick={cancelButton} className="btn-main btn-cancel">
            لا
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalRemove;
