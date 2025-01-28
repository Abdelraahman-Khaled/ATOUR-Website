import { useState } from "react";
import imgCard_1 from "../../../assets/images/payment/01.png";
import imgCard_2 from "../../../assets/images/payment/02.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./PaymentButtons.css";
const PaymentButtons = ({ functionAddNewPay }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };
  return (
    <>
      {/* =============== START ALL PAY BOOKINGS =============== */}
      <div className="all-pay-bookings">
        {/* ============= START HEADER PAYMENT ============== */}
        <div className="header-payment-info mb-4">
          <div
            className={`card-pay-one ${
              selectedMethod === "credit" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              id="credit"
              name="paymentMethod"
              value="credit"
              checked={selectedMethod === "credit"}
              onChange={handleMethodChange}
            />
            <label
              htmlFor="credit"
              className="label-text d-flex  align-items-center gap-2"
            >
              <img
                src={imgCard_1}
                alt="imagePay"
                className="object-fit-cover"
              />
              xxx 595 8955
            </label>
          </div>
          <div
            className={`card-pay-one ${
              selectedMethod === "visa" ? "active" : ""
            }`}
          >
            <input
              type="radio"
              id="visa"
              name="paymentMethod"
              value="visa"
              checked={selectedMethod === "visa"}
              onChange={handleMethodChange}
            />
            <label
              htmlFor="visa"
              className="label-text d-flex  align-items-center gap-2"
            >
              <img
                src={imgCard_2}
                alt="imagePay"
                className="object-fit-cover"
              />
              xxx 595 8955
            </label>
          </div>
        </div>
        {/* ============= END HEADER PAYMENT ============== */}
        {/* ============= START BUTTON ADD NEW PAY ========= */}
        <div
          onClick={functionAddNewPay}
          className="button-add-new-pay  d-flex  align-items-center  gap-2 justify-content-center"
        >
          {" "}
          <FontAwesomeIcon icon={faPlus} />
          إضافة وسيلة دفع جديدة
        </div>
        {/* ============= START BUTTON ADD NEW PAY ========= */}
      </div>
      {/* =============== END ALL PAY BOOKINGS =============== */}
    </>
  );
};

export default PaymentButtons;
