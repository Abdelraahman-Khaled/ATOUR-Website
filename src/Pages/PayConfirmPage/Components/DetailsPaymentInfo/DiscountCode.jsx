import { useState } from "react";
import imageDiscount from "../../../../assets/images/payment/03.svg";
import ModalDiscountForm from "./ModalDiscountForm/ModalDiscountForm";

const DiscountCode = () => {
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const disountButtonModal = () => {
    setShowDiscountModal(true);
  };
  const hidedisountButtonModal = () => {
    setShowDiscountModal(false);
  };

  return (
    <>
      <ModalDiscountForm
        showModalDiscountForm={showDiscountModal}
        hideModalDiscountForm={hidedisountButtonModal}
      />
      {/* ============ START CODE DISCOUNT ============= */}
      <div
        onClick={disountButtonModal}
        className="discount-code-pay  cursor-pointer-event d-flex justify-content-between align-items-center gap-2"
      >
        <div className="info-right">
          <h2 className="title">لديك كود خصم ؟</h2>
          <p className="text">إدخل كود الخصم لتفعيل الخصم</p>
        </div>
        <div className="image-discount">
          <img src={imageDiscount} alt="img discount" />
        </div>
      </div>
      {/* ============ END CODE DISCOUNT ============= */}
    </>
  );
};

export default DiscountCode;
