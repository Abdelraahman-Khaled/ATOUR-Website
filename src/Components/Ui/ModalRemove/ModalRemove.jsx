import CustomModal from "Components/CustomModal/CustomModal";
import { toast } from "react-toastify";
import "./ModalRemove.css";
import TrashIcon from "assets/Icons/TrashIcon";
import BookingAPI from "api/bookingApi";

const ModalRemove = ({
  id,
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

  const removeButton = async () => {
    try {
      // Call the API to cancel the booking
      await BookingAPI.cancelBooking(id);
      hideModalPayRemove();
      toast.success("تم الحذف بنجاح");
    } catch (error) {
      // Handle any error that occurs during the API call
      hideModalPayRemove();
      toast.error("فشل في الحذف، حاول مرة اخرى");
    }
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
