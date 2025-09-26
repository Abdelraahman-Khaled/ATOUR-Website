import IconLocation from "assets/images/collection/IconLocation";
import "./CardEvent.css";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import packupImg from "../../../../assets/images/blogs/01.png"
import Favicon from "Components/FavIcon/Favicon ";
import eventTranslations from "./translates";

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
  functionBookingButton,
  isFavoritePage,
  type,
  is_group
}) => {

  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    <Link
      to={`/eventsPage/${routeCardLink}`}
      className="card-event-one card-collection-one card-favorite-one d-flex align-items-center gap-3"
    >
      {/* RIGHT CARD */}
      <div className="right-card-event">
        <span className="title-month">{titleMonth}</span>
        <div className="num-month">{numMonth}</div>
        <div className="title-day">{titleDay}</div>
      </div>

      {/* IMAGE */}
      <div className="image-collection h-100 overlay-bg">
        <img
          src={image === null ? packupImg : image}
          alt="imageCollection"
          loading="lazy"
          className="w-100 h-100 object-fit-cover"
        />
        <Favicon
          modelType={type}
          modelId={id}
          initialIsFavorite={isFavoritePage}
        />
        <div className="info-text">
          <IconLocation /> {nameCountry}
        </div>
      </div>

      {/* CONTENT */}
      <div className="content-info-card info-content-card w-100 d-flex flex-column gap-3">
        <div className="header-top-card d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h2 className="title">{titleCard}</h2>
          <div className="price-info d-flex align-items-center gap-1">
            <span className="price-num">{numPrice}</span> /
            {is_group
              ? eventTranslations.perGroup[currentLanguage]
              : eventTranslations.perPerson[currentLanguage]}
          </div>
        </div>

        <div className="content-bottom-event d-flex align-items-center gap-3 justify-content-between">
          <p className="text">{textContent}</p>
          <Link
            to={`/eventsPage/${routeCardLink}`}
            className="booking-event-button btn-main -z-10"
          >
            {eventTranslations.reserve[currentLanguage]}
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default CardEvent;
