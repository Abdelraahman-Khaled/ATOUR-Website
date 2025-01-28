import HeartIconCollection from "assets/images/collection/HeartIconCollection";
import IconLocation from "assets/images/collection/IconLocation";
import "./CardEvent.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import packupImg from "../../../../assets/images/blogs/01.png"
const CardEvent = ({
  id,
  routeCardLink,
  titleMonth,
  numMonth,
  titleDay,
  image,
  nameCountry,
  titleCard,
  numPrice,
  textContent,
  functionBookingButton
}) => {
  const [isWishListed, setIsWishListed] = useState(false);
  const buttonWishlist = (e) => {
    e.preventDefault();
    setIsWishListed(!isWishListed);
    if (isWishListed !== true) {
      toast.success("تم الاضافة الى المفضلة");
    } else {
      toast.error("تم الحذف من المفضلة");
    }
  };
  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    <Link
      to={`/eventsPage/${routeCardLink}`}
      className="card-event-one  card-collection-one card-favorite-one  d-flex align-items-center gap-3"
    >
      {/* ============== START RIGHT CARD EVENT =============== */}
      <div className="right-card-event">
        <span className="title-month">{titleMonth}</span>
        <div className="num-month">{numMonth}</div>
        <div className="title-day">{titleDay}</div>
      </div>
      {/* ============== END RIGHT CARD EVENT =============== */}

      {/* =========== START IMAGE CARD FAVORITE =========== */}
      <div className="image-collection h-100 overlay-bg">
        <img
          src={image === null ? packupImg : image}
          alt="imageCollection"
          loading="lazy"
          className="w-100 h-100 object-fit-cover"
        />
        <div
          onClick={buttonWishlist}
          className={`icon-heart  ${isWishListed ? "activeHeart" : ""}`}
        >
          <HeartIconCollection />
        </div>
        <div className="info-text">
          <IconLocation /> {nameCountry}
        </div>
      </div>
      {/* =========== END IMAGE COLLECTION =========== */}
      {/* =========== END IMAGE CARD FAVORITE =========== */}
      {/* =========== START INFO CONTENT CARD =========== */}
      <div className="content-info-card info-content-card w-100 d-flex flex-column gap-3">
        {/* ========== START HEADER TOP CARD ========== */}
        <div className="header-top-card d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h2 className="title">{titleCard}</h2>
          <div className="price-info d-flex align-items-center gap-1">
            <span className="price-num">{numPrice}</span> / {currentLanguage === "ar" ? "للفرد" : "per person"}
          </div>
        </div>
        {/* ========== END HEADER TOP CARD ========== */}
        <div className="content-bottom-event d-flex align-items-center gap-3 justify-content-between">
          <p className="text">{textContent}</p>
          <Link to={`/eventsPage/${routeCardLink}`} className="booking-event-button btn-main -z-10">
            حجز
          </Link>
        </div>
      </div>
      {/* =========== END INFO CONTENT CARD =========== */}
    </Link>
  );
};

export default CardEvent;
