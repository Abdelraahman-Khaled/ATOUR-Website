
import HeartIconCollection from "assets/images/collection/HeartIconCollection";
import { useState } from "react";
import { toast } from "react-toastify";
import "./CardLandmarks.css"
const CardLandmarks = ({ image, title }) => {
  const [isActiveHeart, setIsActiveHeart] = useState(false);

  const addToWishList = (e) => {
    e.preventDefault();

    setIsActiveHeart(!isActiveHeart);
    if (!isActiveHeart) {
      toast.success("تم الاضافة الى المفضلة.");
    } else {
      toast.error("تم الأزالة من المفضلة.");
    }
  };

  return (
    <div className="card-landmarks-one">
      {/* =========== START IMAGE COLLECTION =========== */}
      <div className="image-collection overlay-bg position-relative ">
        <img
          src={image}
          alt="imageFamousLandMarks"
          loading="lazy"
          className="w-100 object-fit-cover"
        />
        <div
          onClick={addToWishList}
          className={`icon-heart ${isActiveHeart ? "activeHeart" : ""}`}
        >
          <HeartIconCollection />
        </div>
      </div>
      {/* =========== END IMAGE COLLECTION =========== */}
      {/* =========== START CONTENT INFO CARD ========== */}
      <div className="content-info-card pt-3">
        <h2 className="title">{title}</h2>
      </div>
      {/* =========== END CONTENT INFO CARD ========== */}
    </div>
  );
};

export default CardLandmarks;
