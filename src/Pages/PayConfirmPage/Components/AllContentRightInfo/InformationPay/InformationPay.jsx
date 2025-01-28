import PaymentButtons from "Components/Ui/PaymentButtons/PaymentButtons";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";
import AddNewPayment from "Pages/Events/Components/DetailsCardEvent/Components/DetailsCardPage/ModalBookings/AddNewPayment";
import { useState } from "react";

const InformationPay = () => {

  //   MODAL CONFIRM SUCCESS
  const [showModalConfirmSucces, setShowModalConfirmSucces] = useState(false);

  //   HIDE MODAL CONFIRM
  const hideModalConfirmSucces = () => {
    setShowModalConfirmSucces(false);
  };

  //   MODAL ADD NEW PAYMENT
  const [showModalAddNewPayment, setModalAddNewPayment] = useState(false);
  const buttonShowModal = () => {
    // SHOW MODAL ADD NEW PAYMENY AND HIDE MODAL BOOKINGS PAY
    setModalAddNewPayment(true);
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
      <div className="information-pay-content--1">
        <div className="main-payment-bookings">
          <PaymentButtons functionAddNewPay={buttonShowModal} />
        </div>
      </div>
    </>
  );
};

export default InformationPay;
