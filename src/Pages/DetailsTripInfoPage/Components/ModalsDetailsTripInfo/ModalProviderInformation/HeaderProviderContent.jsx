import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../../../../../assets/images/slider/01.png";
import ContactIcon from "assets/Icons/ContactIcon";
import EmailIcon from "assets/Icons/EmailIcon";
import PhoneIcon from "assets/Icons/PhoneIcon";
const HeaderProviderContent = () => {
  return (
    <div className="header-proviver-content">
      {/* =========== START ROW ============ */}
      <div className="row g-3">
        {/* ============== START COL ================ */}
        <div className="col-12 col-md-6">
          {/* ============= START HEADER TOP CONTENT ============= */}
          <div className="header-top-content-box-1">
            {/* =========== START COMPANY INFORMATION ============ */}
            <div className="company-info d-flex flex-column gap-2">
              <div className="img-company">
                <img
                  src={img}
                  alt="img"
                  className="w-100 h-100 object-fit-cover text-center"
                />
              </div>
              <div className="info-details-company d-flex  flex-column  gap-1 mt-1">
                <h2 className="title">شركة atour للرحلات</h2>
                <div className="rate-info d-flex justify-content-center  align-items-center gap-2 mt-1">
                  <div className="icon-star rate-star-icon">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  4.5 تقييم
                </div>
              </div>
            </div>
            {/* =========== END COMPANY INFORMATION ============ */}
            {/* =========== START CARDS INFORMATION ============ */}
            <div className="cards-information-content mt-3 d-flex align-items-center  gap-3">
              {/* ================ START CARD INFO ONE ============= */}
              <div className="card-info-one">
                <h2 className="title">عدد الحجوزات</h2>
                <p className="num">25</p>
              </div>
              {/* ================ END CARD INFO ONE ============= */}
              {/* ================ START CARD INFO ONE ============= */}
              <div className="card-info-one">
                <h2 className="title">عدد البرامج</h2>
                <p className="num">25</p>
              </div>
              {/* ================ END CARD INFO ONE ============= */}
            </div>
            {/* =========== END CARDS INFORMATION ============ */}
          </div>
          {/* ============= END HEADER TOP CONTENT ============= */}
        </div>
        {/* ============== END COL ================ */}
        {/* ============== START COL ================ */}
        <div className="col-12 col-md-6">
          {/* ============= START INFORMATION CONTACT ========== */}
          <div className="information-contact-head d-flex  flex-column  gap-3">
            <h2 className="title">معلومات التواصل</h2>
            <button className="btn-main contact-btn">
              محادثة <ContactIcon />
            </button>
            <div className="contact-content d-flex flex-column  gap-3">
              <a href="mailto:info@gamil.com" className="link-contact d-flex align-items-center  gap-2">
                <EmailIcon /> info@gmail.com
              </a>
              <a href="tel:01234678910" className="link-contact d-flex align-items-center  gap-2">
                <PhoneIcon /> 01234678910
              </a>
            </div>
          </div>
          {/* ============= END INFORMATION CONTACT ========== */}
        </div>
        {/* ============== END COL ================ */}
      </div>
      {/* =========== END ROW ============ */}
    </div>
  );
};

export default HeaderProviderContent;
