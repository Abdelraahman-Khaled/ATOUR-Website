import CustomModal from "Components/CustomModal/CustomModal";
import "./ModalBookingPayment.css";
import { useState } from "react";

import PaymentButtons from "Components/Ui/PaymentButtons/PaymentButtons";
import LoaderSvg from "assets/Icons/LoaderSvg";
import AddNewPayment from "./AddNewPayment";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";

const ModalBookingPayment = ({ showModalBookingPay, hideModalBookingPay }) => {
  //   BUTTON CONFIRM PAYMENT
  const [isActiveButton, setIsActiveButton] = useState(false);

  //   MODAL CONFIRM SUCCESS
  const [showModalConfirmSucces, setShowModalConfirmSucces] = useState(false);

  //   HIDE MODAL CONFIRM
  const hideModalConfirmSucces = () => {
    setShowModalConfirmSucces(false);
  };

  //   BUTTON BOOKING CONFIRM
  const handleBookingButtonClick = () => {
    setIsActiveButton(true); // ADD ACTIVE TO LOADER
    setTimeout(() => {
      // AFTER 800MS REMOVE ACTIVE LOADE AND HIDE MODAL
      setIsActiveButton(false);
      hideModalBookingPay();
    }, 800);

    setTimeout(() => {
      // AFTER 850MS ADD MODAL SUCCESS PAY
      setShowModalConfirmSucces(true);
    }, 850);
  };

  //   MODAL ADD NEW PAYMENT
  const [showModalAddNewPayment, setModalAddNewPayment] = useState(false);
  const buttonShowModal = () => {
    // SHOW MODAL ADD NEW PAYMENY AND HIDE MODAL BOOKINGS PAY
    setModalAddNewPayment(true);
    hideModalBookingPay();
  };

  //   HIDE MODAL ADD NEW PAYMENT
  const hideModalAdd = () => {
    setModalAddNewPayment(false);
  };

  return (
    <>
      <AddNewPayment
        showModalAddNewPayment={showModalAddNewPayment}
        hideModalAddNewPayment={hideModalAdd}
      />
      <SuccessSend
        showsuccessModalSend={showModalConfirmSucces}
        hideSuccessModalSend={hideModalConfirmSucces}
        titleModal={"تاكيد الدفع"}
        titleSend={"تم الدفع بنجاح!"}
        isTrueText={true}
        textSend={"لقد تم الدفع بنجاح يمكنك متابعة الطلب من هنا"}
        textButton={"حجوزاتي"}
      />
      <CustomModal
        show={showModalBookingPay}
        onHide={hideModalBookingPay}
        title={"الحجز والدفع"}
        newClass={"modal-booking-payment"}
      >
        <div className="main-payment-bookings">
          <PaymentButtons functionAddNewPay={buttonShowModal} />
          {/* ============ START BOTTOM PAY CONTENT ========== */}
          <div className="bottom-pay-content d-flex  justify-content-between  align-items-center  flex-wrap  gap-3 pt-3 border-top mt-4">
            <div className="info-right-content">
              الإجمالي : <span className="fw-bold">750</span> ريال سعودي
            </div>
            <button
              onClick={handleBookingButtonClick}
              className="btn-main btn-height"
            >
              {!isActiveButton ? (
                "تأكيد ودفع"
              ) : (
                <>
                  <LoaderSvg />
                </>
              )}
            </button>
          </div>
          {/* ============ END BOTTOM PAY CONTENT ========== */}
        </div>
      </CustomModal>
    </>
  );
};

export default ModalBookingPayment;
