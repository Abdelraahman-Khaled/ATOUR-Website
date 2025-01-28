import "./CardCollection.css";
import IconLocation from "assets/images/collection/IconLocation";
import IconStarRate from "assets/images/collection/IconStarRate";
import HeartIconCollection from "assets/images/collection/HeartIconCollection";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import Favicon from "Components/FavIcon/Favicon ";

const CardCollection = ({
  itemId,
  imageCard,
  infoPlaceCard,
  numRate,
  titleCard,
  numPriceCard,
  wishList,
  addToWishList, isFav
}) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  // Localization object
  const localization = {
    ar: {
      ratingText: "تقييم",
      priceStartText: "تبدأ من",
      perPersonText: "/ للفرد",
    },
    en: {
      ratingText: "Rating",
      priceStartText: "Starting from",
      perPersonText: "/ per person",
    },
  };

  const { ratingText, priceStartText, perPersonText } = localization[currentLanguage]; // Retrieve localized strings

  const isWishListed = wishList.includes(itemId); // Check if the current item is in the wishlist
  return (
    <>
      {/* ============ START CARD COLLECTION ONE =========== */}
      <Link to={`tripsPage/${itemId}`} className="card-collection-one">
        {/* =========== START IMAGE COLLECTION =========== */}
        <div className="image-collection overlay-bg">
          <img
            src={imageCard}
            alt="imageCollection"
            loading="lazy"
            className="w-100 h-100 object-fit-cover"
          />
          <div
            className={`icon-heart ${isWishListed ? "activeHeart" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              addToWishList(itemId);
            }}
          >
            {/* <HeartIconCollection /> */}
            <Favicon
              key={itemId}
              modelType={"trip"}
              modelId={itemId}
              initialIsFavorite={isFav}
            />
          </div>
          <div className="info-text">
            <IconLocation /> {infoPlaceCard}
          </div>
        </div>
        {/* =========== END IMAGE COLLECTION =========== */}
        {/* =========== START CONTENT INFO CARD ========== */}
        <div className="content-info-card pt-3">
          <div className="rate-card d-flex align-items-center gap-1">
            <IconStarRate /> {numRate} {ratingText}
          </div>
          <h2 className="title">{titleCard}</h2>
          <div className="price-info">
            {priceStartText} <span className="price-num">{numPriceCard}</span> {perPersonText}
          </div>
        </div>
        {/* =========== END CONTENT INFO CARD ========== */}
      </Link>
      {/* ============ END CARD COLLECTION ONE =========== */}
    </>
  );
};

export default CardCollection;
