import CustomModal from "Components/CustomModal/CustomModal";
import "./ModalsReservation.css";
import CardReservation from "../AllCardsReservations/CardReservation";
import image from "../../../../assets/images/slider/01.png";
import image_3 from "../../../../assets/images/slider/01.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import InterrogativeIcon from "assets/Icons/InterrogativeIcon";
import { useState } from "react";
import ModalRemove from "Components/Ui/ModalRemove/ModalRemove";
import SubmitTicketProblem from "./SubmitTicketProblem";
import ModalTermsAndConditions from "./ModalTermsAndConditions";
import { format, parseISO } from "date-fns";
import GeneralAPI from "api/generalApi";
import EffectiveneCardReservation from "../AllCardsReservations/Effectivenes/EffectiveneCardReservation";
import GiftCardReservation from "../AllCardsReservations/Gifts/GiftCardReservation";
import ModalProviderInformation from "Pages/DetailsTripInfoPage/Components/ModalsDetailsTripInfo/ModalProviderInformation/ModalProviderInformation";
import { useTheme } from "context/ThemeContext";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ModalDetailsTrip = ({ showDetailsModal, hideDetailsModal, reservation, currentLanguage, refresh }) => {
  const { isDarkMode } = useTheme();
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalProviderInformation, setShowModalProviderInformation] =
    useState(false);

  // Dark mode styles for text and SVG elements
  const darkModeStyles = {
    color: isDarkMode ? '#000000' : 'inherit',
    fill: isDarkMode ? '#000000' : 'inherit',
    stroke: isDarkMode ? '#000000' : 'inherit'
  };

  console.log(reservation);


  const buttonHide = () => {
    setShowModalProviderInformation(false);
  };


  const buttonShowModal = () => {
    setShowModalRemove(true);
    hideDetailsModal();
  };
  const hideShowModal = () => {
    setShowModalRemove(false);
  };

  // MODAL SEND PROBLEM
  const [showSubmitTicket, setShowSubmitTicket] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [isLoadingTerms, setIsLoadingTerms] = useState(false);

  const buttonShowModalTicket = () => {
    setShowSubmitTicket(true);
    hideDetailsModal();
  };
  const hideSubmitTicket = () => {
    setShowSubmitTicket(false);
  };

  const buttonShowTermsModal = async () => {
    setShowTermsModal(true);
    setIsLoadingTerms(true);
    try {
      const response = await GeneralAPI.getTerms(currentLanguage);
      if (response.success) {
        setTermsContent(response.data.content);
        console.log(response.data.content);

      } else {
        setTermsContent(text[currentLanguage].noData);
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
      setTermsContent(text[currentLanguage].noData);
    } finally {
      setIsLoadingTerms(false);
    }
  };

  const hideTermsModal = () => {
    setShowTermsModal(false);
  };

  const text = {
    ar: {
      noData: "لا يوجد بيانات متاحة.",
      home: "الصفحة الرئيسية",
      children: "أطفال",
      pepole: "افراد",
      from: "من",
      to: "إلي",
      cancelTrip: "الغاء الرحلة",
      confirmCancel: "هل أنت متأكد من إلغاء الرحلة ؟",
      cancelText: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى.",
      tripDetails: "تفاصيل الرحلة",
      numberOfPeople: "العدد",
      serviceValue: "قيمة الخدمة",
      total: "الإجمالي",
      serviceProvider: "مزود الخدمة",
      paymentMethod: "طريقة الدفع",
      bookingPolicy: "سياسة الحجز والإلغاء",
      problemQuestion: "هل تواجه مشكلة في طلبك ؟",
      riyal: "ريال",
      temporaryTrip: "رحلة مؤقتة",
      delivery: "توصيل",
      myself: "استلام شخصي",
      termsAndConditions: "الشروط والأحكام",
    },
    en: {
      noData: "No data available.",
      home: "Home",
      children: "Children",
      pepole: "Pepole",
      from: "From",
      to: "To",
      cancelTrip: "Cancel Trip",
      confirmCancel: "Are you sure you want to cancel the trip?",
      cancelText: "This text is an example of text that can be replaced in the same space. This text was generated from the Arabic text generator.",
      tripDetails: "Trip Details",
      numberOfPeople: "Number of People",
      serviceValue: "Service Value",
      total: "Total",
      serviceProvider: "Service Provider",
      paymentMethod: "Payment Method",
      bookingPolicy: "Booking and Cancellation Policy",
      problemQuestion: "Are you facing a problem with your order?",
      riyal: "SAR",
      temporaryTrip: "Temporary Trip",
      delivery: "Delivery",
      myself: "Self Pickup",
      termsAndConditions: "Terms and Conditions",
    },
  };

  return (
    <>
      <ModalProviderInformation
        showModalProviderInformation={showModalProviderInformation}
        hideModalProviderInformation={buttonHide}
      />
      <ModalRemove
        showModalPayRemove={showModalRemove}
        hideModalPayRemove={hideShowModal}
        titleModal={text[currentLanguage].cancelTrip}
        title={text[currentLanguage].confirmCancel}
        text={text[currentLanguage].cancelText}
        id={reservation !== null && reservation.id}
        reservation={reservation !== null && reservation}
        refresh={refresh}
      />
      <SubmitTicketProblem
        showSubmitTicket={showSubmitTicket}
        hideSubmitTicket={hideSubmitTicket}
      />
      <ModalTermsAndConditions
        showModal={showTermsModal}
        hideModal={hideTermsModal}
        content={isLoadingTerms ? "Loading..." : termsContent}
        currentLanguage={currentLanguage}
      />
      <CustomModal
        show={showDetailsModal}
        onHide={hideDetailsModal}
        title={text[currentLanguage].tripDetails}
        newClass={"modal-details-trip"}
      >
        {/* ================ START ALL DETAILS TRIP ================= */}
        {reservation ? (
          <div className="all-details-trip">
            {reservation.effectivene_id ? (
              <EffectiveneCardReservation
                image={reservation.photo || reservation.effectivene?.photo || image}
                typeReservation={reservation.payment_status}
                countryName={reservation.effectivene.city.title}
                titleCard={(reservation.trip || reservation.effectivene || reservation.gift)?.title || "Ended"}
                priceNum={`${reservation.total}`}
                textUserInfo={`${reservation.people_number} `}
                dateTime={reservation.effectivene.from_date}
                timeAdd={`${text[currentLanguage].from}  ${reservation.effectivene.from_time} ${text[currentLanguage].to} ${reservation.effectivene.to_time}`}
                isTrueButtonDetails={false}
                buttonDetailsFunction={false}
                isTrueButtonCancel={true}
                buttonCancelReservationFunction={buttonShowModal}
                description={reservation.effectivene.description}
                id={reservation.effectivene_id}
              />
            ) : reservation.gift_id ? (
              <GiftCardReservation
                image={reservation.photo || reservation.gift?.photo || image}
                typeReservation={reservation.payment_status}
                titleCard={(reservation.trip || reservation.effectivene || reservation.gift)?.title || "Ended"}
                priceNum={`${reservation.total}`}
                textUserInfo={`${reservation.delivery_way === "myself" ? text[currentLanguage].myself : text[currentLanguage].delivery}`}
                isTrueButtonDetails={false}
                buttonDetailsFunction={false}
                isTrueButtonCancel={true}
                buttonCancelReservationFunction={buttonShowModal}
                description={reservation.gift.description}
                id={reservation.gift_id}
                countryName={reservation.gift.city.title}
              />
            ) : (
              <CardReservation
                image={(reservation.trip || reservation.effectivene || reservation.gift)?.photo || image}
                typeReservation={reservation.payment_status}
                countryName={reservation.trip.city.title}
                titleCard={(reservation.trip || reservation.effectivene || reservation.gift)?.title || text[currentLanguage].temporaryTrip}
                priceNum={reservation.total}
                textUserInfo={`${reservation.people_number} ${text[currentLanguage].pepole}`}
                dateTime={reservation.booking_day}
                timeAdd={reservation.booking_time}
                isTrueButtonDetails={false}
                buttonDetailsFunction={false}
                isTrueButtonCancel={true}
                buttonCancelReservationFunction={buttonShowModal}
                id={reservation.effectivene_id || reservation.trip_id || reservation.gift_id}
              />
            )}
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
                      <h2 className="title">{reservation.id}#</h2>
                      <div className="list-pay-info d-flex  flex-column  w-100 gap-3 mt-3">
                        <div className="details-one-1 d-flex align-items-center justify-content-between   gap-2 flex-wrap">
                          <h2 className="text">{text[currentLanguage].numberOfPeople}</h2>
                          <p className="num-pay">{reservation.people_number + reservation.children_number || 1}</p>
                        </div>
                        <div className="details-one-1 d-flex align-items-center  justify-content-between gap-2 flex-wrap">
                          <h2 className="text">{text[currentLanguage].serviceValue}</h2>
                          <p className="num-pay">{(reservation.trip || reservation.effectivene || reservation.gift)?.customer_price || ""} {text[currentLanguage].riyal}</p>
                        </div>
                        <div className="details-one-1 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                          <h2 className="text">{text[currentLanguage].total}</h2>
                          <p className="num-pay">{reservation.total} {text[currentLanguage].riyal}</p>
                        </div>
                      </div>
                    </div>
                    {/* ============= END CARD DETAILS ONE PAY ============== */}
                    <div className="services-provider border-card-details mt-3"
                    >
                      <h2 className="title">{text[currentLanguage].serviceProvider}</h2>
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
                          <h2 className="title">{reservation.vendor.name}</h2>
                          <div className="contact-serv mt-2 d-flex align-items-center gap-2">
                            <a
                              href={`https://wa.me/${reservation.vendor.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-success d-flex align-items-center gap-1"
                            >
                              <FontAwesomeIcon icon={faWhatsapp} />
                              WhatsApp
                            </a>
                            <span className="text-muted">|</span>
                            <span className="text">{reservation.vendor.phone}</span>
                          </div>
                          {/* <div className="rate-serv d-flex mt-1 align-items-center  gap-2">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="rate-star-icon"
                            />
                            4.5
                          </div> */}
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
                      <h2 className="title">{text[currentLanguage].paymentMethod}</h2>
                      <div className="content-info-details pt-3 d-flex  justify-content-between  align-items-center flex-wrap gap-3">
                        <div className="pay-1 text--1 d-flex  align-items-center  gap-3">
                          {reservation.payment_way}
                        </div>
                        <div className="details-day text--1">
                          {format(parseISO(reservation.created_at), "MMMM dd, yyyy hh:mm a")}
                        </div>
                      </div>
                    </div>
                    {/* ============ END INFO PAY DETAILS LEFT ========== */}
                    <div className="bottom-content-details d-flex  flex-column  gap-3 mt-auto">
                      <div className="link-detials d-flex  align-items-center  gap-2">
                        <span className="icon-check-1">
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span onClick={buttonShowTermsModal} className="cursor-pointer-event">
                          {text[currentLanguage].bookingPolicy}
                        </span>
                      </div>
                      <div
                        onClick={buttonShowModalTicket}
                        className="text-content--1 cursor-pointer-event d-flex  align-items-center  gap-2"
                      >
                        <InterrogativeIcon />
                        {text[currentLanguage].problemQuestion}
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
        ) : (
          <div>
            {text[currentLanguage].noData}
          </div>
        )
        }
        {/* ================ END ALL DETAILS TRIP ================= */}
      </CustomModal>
    </>
  );
};

export default ModalDetailsTrip;