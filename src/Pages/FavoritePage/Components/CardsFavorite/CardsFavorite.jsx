import CardFavorite from "Components/Ui/CardFavorite/CardFavorite";
import { cardsFavoriteData } from "./Data/DataCardFavorite";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
const CardsFavorite = ({ data }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  const [cards, setCards] = useState(cardsFavoriteData);

  const removeFromFavorites = (idToRemove) => {
    const updatedCards = cards.filter((card) => card.id !== idToRemove);
    setCards(updatedCards);
  };
  return (
    <div className="cards-favorite-content">
      {/* ========= START ALL CARDS FAVORITE CONTENT =========== */}
      <div className="all-cards-favorite-content" data-aos="fade-up">
        {/* ============= START ROW =========== */}
        <div className="row g-3">
          {data.length > 0 ? (
            data.map((item) => {
              return (
                <>
                  {/* ========== START COL =========== */}
                  <div className="col-12 col-sm-6 col-xl-12" key={item.id}>
                    <CardFavorite
                      newClassCard={"card-favorite-fav"}
                      idCard={item.id}
                      image={item.cover}
                      textLocation={item.city.title + " .  " + item.city.country_name}
                      titleCard={item.title}
                      NumPriceNew={`${item.price}$`}
                      isTrueNumTwo={false}
                      numInfoDangerOld={false}
                      rateNum={item.total_rates}
                      textContent={item.city.description}
                      isTrueTextOneCard_1={true}
                      textCardOne_1={item.free_cancelation ? item.free_cancelation : null}
                      isTrueTextOneCard_2={true}
                      textCardOne_2={item.pay_later ? item.free_cancelation : null}
                      removeFromFavorites={removeFromFavorites}
                      isFavoritePage={true}
                      isNewPage={false}
                      wishListCard={false}
                      addToWishList={false}
                    />
                  </div>
                  {/* ========== END COL =========== */}
                </>
              );
            })
          ) : (
            <>
              <p className="text-section-api fs-6 fw-medium text-center pt-5">
                {currentLanguage === "ar" ? "لا يوجد منتجات فى المفضلة ." : "There are no products in the favorites."}
                <Link
                  to="/"
                  className="fs-6 fw-medium text-danger text-decoration-underline"
                >
                  {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
                </Link>
              </p>
            </>
          )}
        </div>
        {/* ============= END ROW =========== */}
      </div>
      {/* ========= END ALL CARDS FAVORITE CONTENT =========== */}
    </div>
  );
};

export default CardsFavorite;
