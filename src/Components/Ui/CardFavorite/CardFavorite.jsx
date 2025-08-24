import IconLocation from "assets/images/collection/IconLocation";
import IconStarRate from "assets/images/collection/IconStarRate";
import CheckIcon from "assets/Icons/CheckIcon";
import "./CardFavorite.css";
import { useLanguage } from "Components/Languages/LanguageContext";
import Favicon from "Components/FavIcon/Favicon ";

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
  refresh
}) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  // CHECK IF WISHLISTCARD IS AN ARRAY AND IF IT INCLUDES THE CURRENT ITEM'S ID
  const isWishListed_2 =
    wishListCard &&
    Array.isArray(wishListCard) &&
    wishListCard.includes(idCard);

  // TO SLICE WORDS OF TEXT CONTENT
  const sliceWords = (text) => {
    const words = text.split(" ");
    return words.slice(0, 25).join(" ") + (words.length > 25 ? "..." : "");
  };
  return (
    <div
      className={`card-collection-one card-favorite-one d-flex h-100 gap-3 ${newClassCard}`}
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
            {currentLanguage === "ar" ? "تبدأ من" : "Starting from"}{" "}
            <span className="price-num">{NumPriceNew} {currentLanguage === "ar" ? "ريال" : "SAR"} </span>
            {currentLanguage === "ar" ? "/ للفرد" : "/ per person"}{" "}
            {isTrueNumTwo && (
              <p className="text-2">
                {currentLanguage === "ar" ? "بدلا من" : "Instead of"}{" "}
                <span className="text-danger text-decoration-line-through fw-bold">
                  {numInfoDangerOld}
                </span>
              </p>
            )}
          </div>
        </div>
        {/* ========== END HEADER TOP CARD ========== */}
        {/* ========== START RATE CARD ============= */}
        {rateNum > 0 ? (
          <div className="rate-card d-flex align-items-center gap-1 mt-sm-1 mt-md-0">
            <IconStarRate /> {rateNum}{" "}
            {currentLanguage === "ar" ? "تقييم" : "Rating"}
          </div>
        ) : (
          // <div className="rate-card d-flex align-items-center gap-1 mt-sm-1 mt-md-0">
          //   {currentLanguage === "ar" ? "لا يوجد تقييم حاليا" : "No ratings yet"}
          // </div>
          <>
          </>
        )}
        {/* ========== END RATE CARD ============= */}
        <p className="text favDev" dangerouslySetInnerHTML={{ __html: sliceWords(textContent) }}></p>
        <div className="bottom-content-card mt-auto d-flex gap-3 flex-wrap align-items-center ">
          {isTrueTextOneCard_1 && (
            <div className="text-one-card d-flex align-items-center gap-2">
              <CheckIcon />{" "}
              {currentLanguage === "ar"
                ? "متاح إلغاء الحجز مجانا"
                : "Free cancellation is available"}
            </div>
          )}
          {isTrueTextOneCard_2 === 0 && (
            <div className="text-one-card d-flex align-items-center gap-2">
              <CheckIcon />{" "}
              {currentLanguage === "ar"
                ? "إحجز الآن إدفع لاحقا"
                : "Book now pay later"}
            </div>
          )}
        </div>
      </div>
      {/* =========== END INFO CONTENT CARD =========== */}
    </div >
  );
};

export default CardFavorite;