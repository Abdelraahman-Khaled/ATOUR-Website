import CustomModal from "Components/CustomModal/CustomModal";
import "./ModalsReservation.css";
import CardReservation from "../AllCardsReservations/CardReservation";
import image from "../../../../assets/images/slider/01.png";
import imagePay from "../../../../assets/images/payment/01.png";
import image_3 from "../../../../assets/images/slider/01.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import InterrogativeIcon from "assets/Icons/InterrogativeIcon";
import { useState } from "react";
import ModalRemove from "Components/Ui/ModalRemove/ModalRemove";
import SubmitTicketProblem from "./SubmitTicketProblem";

const ModalDetailsTrip = ({ showDetailsModal, hideDetailsModal }) => {
  const [showModalRemove, setShowModalRemove] = useState(false);
  const buttonShowModal = () => {
    setShowModalRemove(true);
    hideDetailsModal();
  };
  const hideShowModal = () => {
    setShowModalRemove(false);
  };

  // MODAL SEND PROBLEM
  const [showSubmitTicket, setShowSubmitTicket] = useState(false);
  const buttonShowModalTicket = () => {
    setShowSubmitTicket(true);
    hideDetailsModal();
  };
  const hideSubmitTicket = () => {
    setShowSubmitTicket(false);
  };
  return (
    <>
      <ModalRemove
        showModalPayRemove={showModalRemove}
        hideModalPayRemove={hideShowModal}
        titleModal={"الغاء الرحلة"}
        title={"هل أنت متأكد من إلغاء الرحلة ؟"}
        text={
          "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى."
        }
      />
      <SubmitTicketProblem
        showSubmitTicket={showSubmitTicket}
        hideSubmitTicket={hideSubmitTicket}
      />
      <CustomModal
        show={showDetailsModal}
        onHide={hideDetailsModal}
        title={"تفاصيل الرحلة"}
        newClass={"modal-details-trip"}
      >
        {/* ================ START ALL DETAILS TRIP ================= */}
        <div className="all-details-trip">
          <CardReservation
            image={image}
            typeReservation={"تم تأكيد الحجز"}
            countryName={"الرياض . السعودية"}
            titleCard={"رحلة على اليخت"}
            priceNum={`750$`}
            textUserInfo={"2 بالغين , 3 أطفال"}
            dateTime={"الثلاثاء 24 مايو, 2024"}
            timeAdd={"8:30 م"}
            isTrueButtonDetails={false}
            buttonDetailsFunction={false}
            isTrueButtonCancel={true}
            buttonCancelReservationFunction={buttonShowModal}
          />
          {/* =============== START INFO PAY CONTENT DETAILS ============ */}
          <div className="details-info-pay mt-3">
            {/* =============== START ROW ================= */}
            <div className="row g-3">
              {/* ============== START COL ============= */}
              <div className="col-12 col-md-12 col-lg-6">
                {/* ============ START ALL INFO DETAILS PAYMENTS ============= */}
                <div className="all-info-details-payment">
                  {/* ============= START CARD DETAILS ONE PAY ============== */}
                  <div className="card-pay-details-one border-card-details">
                    <h2 className="title">رقم الطلب 71#</h2>
                    <div className="list-pay-info d-flex  flex-column  w-100 gap-3 mt-3">
                      <div className="details-one-1 d-flex align-items-center justify-content-between   gap-2 flex-wrap">
                        <h2 className="text">العدد</h2>
                        <p className="num-pay">3</p>
                      </div>
                      <div className="details-one-1 d-flex align-items-center  justify-content-between gap-2 flex-wrap">
                        <h2 className="text">قيمة الخدمة</h2>
                        <p className="num-pay">350$</p>
                      </div>
                      <div className="details-one-1 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                        <h2 className="text">الإجمالي</h2>
                        <p className="num-pay">750$</p>
                      </div>
                    </div>
                  </div>
                  {/* ============= END CARD DETAILS ONE PAY ============== */}
                  <div className="services-provider border-card-details mt-3">
                    <h2 className="title">مزود الخدمة</h2>
                    <div className="content-serv pt-3 d-flex align-items-center  gap-3">
                      <div className="image-serv">
                        <img
                          src={image_3}
                          alt="imageServ"
                          width={"45px"}
                          height={"45px"}
                          className=" object-fit-cover"
                        />
                      </div>
                      <div className="info-serv">
                        <h2 className="title">شركة سينتك للرحلات</h2>
                        <div className="rate-serv d-flex mt-1 align-items-center  gap-2">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="rate-star-icon"
                          />
                          4.5
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============ END ALL INFO DETAILS PAYMENTS ============= */}
              </div>
              {/* ============== END COL ============= */}
              {/* ============== START COL ============= */}
              <div className="col-12 col-md-12 col-lg-6">
                <div className="info-left d-flex  flex-column  gap-3 justify-content-between h-100">
                  {/* ============ START INFO PAY DETAILS LEFT ========== */}
                  <div className="info-pay-details-left  border-card-details">
                    <h2 className="title">طريقة الدفع</h2>
                    <div className="content-info-details pt-3 d-flex  justify-content-between  align-items-center flex-wrap gap-3">
                      <div className="pay-1 text--1 d-flex  align-items-center  gap-3">
                        <img src={imagePay} alt="pay" />
                        xxx 595 8955
                      </div>
                      <div className="details-day text--1">
                        4/5/2024 - 3:07 م
                      </div>
                    </div>
                  </div>
                  {/* ============ END INFO PAY DETAILS LEFT ========== */}
                  <div className="bottom-content-details d-flex  flex-column  gap-3 mt-auto">
                    <div className="link-detials d-flex  align-items-center  gap-2">
                      <span className="icon-check-1">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      سياسة الحجز والإلغاء
                    </div>
                    <div
                      onClick={buttonShowModalTicket}
                      className="text-content--1 cursor-pointer-event d-flex  align-items-center  gap-2"
                    >
                      <InterrogativeIcon />
                      هل تواجه مشكلة في طلبك ؟
                    </div>
                  </div>
                </div>
              </div>
              {/* ============== END COL ============= */}
            </div>
            {/* =============== END ROW ================= */}
          </div>
          {/* =============== END INFO PAY CONTENT DETAILS ============ */}
        </div>
        {/* ================ END ALL DETAILS TRIP ================= */}
      </CustomModal>
    </>
  );
};

export default ModalDetailsTrip;
