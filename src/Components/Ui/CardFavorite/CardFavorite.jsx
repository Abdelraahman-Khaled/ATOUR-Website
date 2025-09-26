import IconLocation from "assets/images/collection/IconLocation";
import IconStarRate from "assets/images/collection/IconStarRate";
import CheckIcon from "assets/Icons/CheckIcon";
import "./CardFavorite.css";
import { useLanguage } from "Components/Languages/LanguageContext";
import Favicon from "Components/FavIcon/Favicon ";
import cardFavoriteTranslations from "./cardFavoriteTranslations";
import CurrencyDisplay from "Components/CurrencyDisplay/CurrencyDisplay";
const CardFavorite = ({
  newClassCard,
  idCard,
  image,
  textLocation,
  titleCard,
  NumPriceNew,
  isTrueNumTwo,
  numInfoDangerOld,
  rateNum,
  textContent,
  isTrueTextOneCard_1,
  textCardOne_1,
  isTrueTextOneCard_2,
  textCardOne_2,
  // removeFromFavorites,
  isFavoritePage,
  isNewPage,
  wishListCard,
  addToWishList,
  type,
  refresh,
  bookingCount,
  is_group,
  discount
}) => {
  const { currentLanguage } = useLanguage(); // Get the current language


  return (
    <div
      className={`card-favorite-one card-collection-one  d-flex h-100 gap-3 ${newClassCard}`}
    >
      {/* =========== START IMAGE CARD FAVORITE =========== */}
      <div className="image-collection overlay-bg">
        <img
          src={image}
          alt="imageCollection"
          loading="lazy"
          className="w-100 h-100 object-fit-cover"
        />
        <Favicon
          modelType={type}
          modelId={idCard}
          initialIsFavorite={isFavoritePage}
          refresh={refresh}
        />
        {/* {isNewPage && (
          <div
            className={`icon-heart ${isWishListed_2 ? "activeHeart" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              addToWishList(idCard);
            }}
          >
            <HeartIconCollection />
          </div>
        )} */}
        <div className="info-text">
          <IconLocation /> {textLocation}
        </div>
      </div>
      {/* =========== END IMAGE CARD FAVORITE =========== */}
      {/* =========== START INFO CONTENT CARD =========== */}
      <div className="content-info-card info-content-card d-flex flex-column h-100 w-100">
        {/* ========== START HEADER TOP CARD ========== */}
        <div className="header-top-card d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h2 className="title">{titleCard}</h2>
          <div className="price-info d-flex align-items-center gap-1">
            {is_group ? " " : cardFavoriteTranslations.startingFrom[currentLanguage]}
            {discount && NumPriceNew > discount ?
              <>
                <span className="price-num"><CurrencyDisplay price={discount} /></span>
                {" "}
                {cardFavoriteTranslations.insteadOf[currentLanguage]}
                <span className="text-danger text-decoration-line-through fw-bold"> <CurrencyDisplay price={NumPriceNew} /></span>
              </>
              :
              <span className="price-num"><CurrencyDisplay price={NumPriceNew} /></span>
            }

            {is_group ? cardFavoriteTranslations.perGroup[currentLanguage] : cardFavoriteTranslations.perPerson[currentLanguage]}{" "}
            {isTrueNumTwo && (
              <p className="text-2">
                {cardFavoriteTranslations.insteadOf[currentLanguage]}{" "}
                <span className="text-danger text-decoration-line-through fw-bold">
                  {numInfoDangerOld}
                </span>
              </p>
            )}
          </div>
        </div>
        {/* ========== END HEADER TOP CARD ========== */}
        {/* ========== START RATE CARD ============= */}
        {/* <p className="text favDev" dangerouslySetInnerHTML={{ __html: sliceWords(textContent) }}></p> */}

        {bookingCount >= 0 &&
          <div className="rate-card d-flex align-items-center gap-1 mt-sm-1 mt-md-0">
            {cardFavoriteTranslations.bookingCount[currentLanguage]}
            {" "}   {bookingCount}
          </div>
        }
        {rateNum >= 0 &&
          <div className="rate-card d-flex align-items-center gap-1 mt-sm-1 mt-md-0">
            <IconStarRate />
            {rateNum ? rateNum.toFixed(1) : 0}
            {" "}
            {cardFavoriteTranslations.rating[currentLanguage]}
          </div>
        }
        {/* ========== END RATE CARD ============= */}
        <div className="bottom-content-card mt-auto d-flex gap-3 flex-wrap align-items-center ">
          {isTrueTextOneCard_1 && (
            <div className="text-one-card d-flex align-items-center gap-2">
              <CheckIcon />{" "}
              {cardFavoriteTranslations.freeCancellation[currentLanguage]}
            </div>
          )}
          {isTrueTextOneCard_2 > 0 && (
            <div className="text-one-card d-flex align-items-center gap-2">
              <CheckIcon />{" "}
              {cardFavoriteTranslations.bookNowPayLater[currentLanguage]}
            </div>
          )}
        </div>
      </div>
      {/* =========== END INFO CONTENT CARD =========== */}
    </div >
  );
};

export default CardFavorite;