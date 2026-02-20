import CardFavorite from "Components/Ui/CardFavorite/CardFavorite";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
const CardsFavEffective = ({ data, refresh }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const navigate = useNavigate()

    // const [cards, setCards] = useState(cardsFavoriteData);

    // const removeFromFavorites = (idToRemove) => {
    //     const updatedCards = cards.filter((card) => card.id !== idToRemove);
    //     setCards(updatedCards);
    // };

    const navFunction = (id) => {
        navigate(`/eventsPage/${id}`)
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
                                            type={"effectivene"}
                                            refresh={refresh}
                                            discount={item.customer_price_before_discount}
                                        />
                                    </div>
                                    {/* ========== END COL =========== */}
                                </>
                            );
                        })
                    ) : (
                        <>
                            <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found vh-100 align-content-center text-black vh-100 align-content-center">
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

export default CardsFavEffective;
