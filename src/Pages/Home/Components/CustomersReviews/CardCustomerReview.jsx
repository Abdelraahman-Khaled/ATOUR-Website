import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CardCustomerReview = ({
  imageCustomer,
  nameCustomer,
  timeAdd,
  textContent
}) => {
  return (
    <div className="card-customer-review h-100">
      {/* =========== START INFO TOP CARD ============ */}
      <div className="info-top-card d-flex gap-3 align-items-center">
        <div className="image-customer">
          <img
            src={imageCustomer}
            alt="imageCustomer"
            loading="lazy"
            width={"40px"}
            height={"40px"}
            className=" object-fit-cover"
          />
        </div>
        {/* ========== START INFO RIGHT ========== */}
        <div className="info-right">
          {/* ========== START RATES STAR ============= */}
          <div className="rates-star">
            <span className="star-one">
              {" "}
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="star-one">
              {" "}
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="star-one">
              {" "}
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="star-one">
              {" "}
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="star-one">
              {" "}
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          {/* ========== END RATES STAR ============= */}
          {/* ========== START INFO CUSTOMER ============= */}

          <div className="info-customer d-flex align-items-center gap-1">
            <h2 className="name-customer">{nameCustomer} .</h2>
            <div className="time-add-review">منذ {timeAdd}</div>
          </div>
          {/* ========== END INFO CUSTOMER ============= */}
        </div>
        {/* ========== END INFO RIGHT ========== */}
      </div>
      {/* =========== END INFO TOP CARD ============ */}
      <div className="cotent-info-customer">
        <p className="text">{textContent}</p>
      </div>
    </div>
  );
};

export default CardCustomerReview;
