import CardFavorite from "Components/Ui/CardFavorite/CardFavorite";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
const CardsFavorite = ({ data, refresh }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const navigate = useNavigate()
  const navFunction = (id) => {
    navigate(`/tripsPage/${id}`)
  }
  return (
    <div className="cards-favorite-content">
      {/* ========= START ALL CARDS FAVORITE CONTENT =========== */}
      <div className="all-cards-favorite-content" data-aos="fade-up">
        {/* ============= START ROW =========== */}
        <div className="row g-3">
          {data.length > 0 ? (
            [...data].reverse().map((item) => {
              return (
                <>
                  {/* ========== START COL =========== */}
                  <div className="col-12 col-sm-6 col-xl-12" key={item.id} onClick={() => navFunction(item.id)}>
                    <CardFavorite
                      newClassCard={"card-favorite-fav"}
                      idCard={item.id}
                      image={item.cover}
                      textLocation={item.city.title + " .  " + item.city.country_name}
                      titleCard={item.title}
                      NumPriceNew={`${item.customer_price}`}
                      isTrueNumTwo={false}
                      numInfoDangerOld={false}
                      rateNum={item.total_rates}
                      textContent={item.city.description}
                      isTrueTextOneCard_1={item.free_cancelation ? item.free_cancelation : null}
                      textCardOne_1={item.free_cancelation ? item.free_cancelation : null}
                      isTrueTextOneCard_2={item.pay_later ? item.pay_later : null}
                      textCardOne_2={item.pay_later ? item.free_cancelation : null}
                      // removeFromFavorites={removeFromFavorites}
                      isFavoritePage={item.is_favourit}
                      isNewPage={false}
                      wishListCard={false}
                      addToWishList={false}
                      type={"trip"}
                      refresh={refresh} // Pass refresh function to CardFavorite
                    />
                  </div>
                  {/* ========== END COL =========== */}
                </>
              );
            })
          ) : (
            <>
              <p className="text-section-api fs-6 fw-medium text-center pt-5 text-black">
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
