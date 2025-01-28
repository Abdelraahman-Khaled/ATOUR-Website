import ProductDetailsPay from "./ProductDetailsPay";
import "./DetailsPaymentInfo.css";
import DiscountCode from "./DiscountCode";
import DetailsPay from "./DetailsPay";
import { useState } from "react";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";
import LoaderSvg from "assets/Icons/LoaderSvg";

const DetailsPaymentInfo = () => {
  // SHOW MODAL SUCCESS PAY
  const [showsuccessModalSend, setShowsuccessModalSend] = useState(false);
  const activeSuccess = () => {
    setShowsuccessModalSend(true);
  };
  const hideSuccessModalSend = () => {
    setShowsuccessModalSend(false);
  };
  //   ACTIVE BUTTON PAY ADD LOADER
  const [isActiveButton, setIsActiveButton] = useState(false);
  const activeButton = () => {
    setIsActiveButton(true);
    setTimeout(() => {
      activeSuccess();
      setIsActiveButton(false);
    }, 800);
  };

  return (
    <>
      <SuccessSend
        showsuccessModalSend={showsuccessModalSend}
        hideSuccessModalSend={hideSuccessModalSend}
        titleModal={"تم الدفع بنجاح"}
        titleSend={"تم الدفع بنجاح"}
        isTrueText={false}
        textSend={false}
        textButton={"تم"}
      />
      <div className="details-payment-information" data-aos="fade-right">
        <h2 className="title-top">رقم الطلب 71#</h2>

        {/* ============ START ALL PRODUCT DETAILS PAY ============ */}
        <div className="all-product-details-pay">
          <ProductDetailsPay />
        </div>
        {/* ============ END ALL PRODUCT DETAILS PAY ============ */}
        {/* ============ START CODE DISCOUNT ============= */}
        <DiscountCode />
        {/* ============ END CODE DISCOUNT ============= */}
        <DetailsPay />

        <button
          className="btn-main btn-payment-send w-100 mt-3 btn-height"
          onClick={activeButton}
        >
          {!isActiveButton ? <>تأكيد ودفع</> : <LoaderSvg />}
        </button>
      </div>
    </>
  );
};

export default DetailsPaymentInfo;
