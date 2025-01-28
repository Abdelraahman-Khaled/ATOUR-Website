import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../../../../assets/images/slider/01.png";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./NewRates.css";
import video from "../../../../assets/images/videos/01.mp4";

const CardNewRate = ({isImageTrue,isVideoTrue}) => {
  return (
    <div className="card-new-rate">
      {isImageTrue && (
        <>
          {/* ============ START IMAGE CONTENT ============ */}
          <div className="image-content-bg position-relative  overlay-bg">
            <img src={image} alt="img" className="w-100 object-fit-cover" />
          </div>
          {/* ============ END IMAGE CONTENT ============ */}
        </>
      )}
      {isVideoTrue && (
        <>
          {/* ============ START VIDEO PALY BG =========== */}
          <div className="video-play-bg">
            <video
              autoPlay
              loop
              muted
              // @ts-ignore
              playsInline=""
              preload="auto"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
          {/* ============ END VIDEO PALY BG =========== */}
        </>
      )}

      {/* ============ START CONTENT INFO RATE =========== */}
      <div className="content-info-rate d-flex gap-3  align-items-center">
        {/* =========== START IAMGE RIGHT ========== */}
        <div className="image-right">
          <img src={image} alt="img" />
        </div>
        {/* =========== END IAMGE RIGHT ========== */}
        {/* =========== START CONTENT LEFT =========== */}
        <div className="content-left">
          {/* =========== START TOP RATE INFO =========== */}
          <div className="top-rate-info d-flex mb-2 justify-content-between  align-items-center  gap-2 flex-wrap ">
            {/* =========== START RATE STARS =========== */}
            <div className="rate-stars d-flex align-items-center  gap-1">
              <div className="icon-rate rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="icon-rate rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="icon-rate rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="icon-rate rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="icon-rate rate-star-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
            {/* =========== END RATE STARS =========== */}
            <div className="num-rate">4.5 تقييم</div>
          </div>
          {/* =========== END TOP RATE INFO =========== */}
          {/* =========== START NAME BRAND ========== */}
          <div className="content-brand mb-2 d-flex  align-items-center  gap-2">
            <div className="img-brand">
              <img src={image} alt="imgBrand" />
            </div>
            <div className="name-brand text-decoration-underline  cursor-pointer-event">
              مطعم البيك
            </div>
          </div>
          {/* =========== END NAME BRAND ========== */}
          <h2 className="title mb-2">المطعم حلو جدا والاكل عربي أصيل</h2>
          <div className="bottom-info-card-rate d-flex  align-items-center  gap-1">
            أميرة محمود
            <span className="time-added">منذ 3 دقائق</span>
          </div>
        </div>
        {/* =========== END CONTENT LEFT =========== */}
      </div>
      {/* ============ END CONTENT INFO RATE =========== */}
    </div>
  );
};

export default CardNewRate;
