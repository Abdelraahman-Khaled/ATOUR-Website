import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import { useLanguage } from "Components/Languages/LanguageContext";
import TitleSection from "Components/TitleSection/TitleSection";
import { cardsFavoriteData } from "Pages/FavoritePage/Components/CardsFavorite/Data/DataCardFavorite";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OneOfferCard from "./OneOfferCard";

const content = {
    ar: {
        title: "عروض تستحق التجربة",
        text: "في عالم مليء بالفرص والمغامرات، هناك تجارب لا يمكن تفويتها. تجارب تأخذك بعيدًا عن الروتين اليومي، تفتح أمامك أبوابًا جديدة لاكتشاف ذاتك والعالم من حولك. سواء كنت تبحث عن مغامرة تضخ الأدرينالين في عروقك، أو لحظة هدوء تنعش روحك، فإن هذه التجارب مصممة لتبقى محفورة في ذاكرتك إلى الأبد. استعد لتجربة تستحق أن تُروى!",
        addToFavorites: "تم الاضافة الى المفضلة.",
        removeFromFavorites: "تم الأزالة من المفضلة.",
    },
    en: {
        title: "Experiences Worth Trying",
        text: "In a world full of opportunities and adventures, there are experiences that cannot be missed. Experiences that take you far from the daily routine and open new doors to discover yourself and the world around you. Whether you're seeking an adrenaline-pumping adventure or a moment of tranquility to refresh your soul, these experiences are designed to remain etched in your memory forever. Get ready for an experience worth sharing!",
        addToFavorites: "Added to favorites.",
        removeFromFavorites: "Removed from favorites.",
    },
};
const OneOffer = (offer) => {
    const offerDetails = offer.offer
    const { currentLanguage } = useLanguage(); // Get the selected language from context
    // Auth
    const [showLogin, setShowLogin] = useState(false); // Show/Hide AuthForm modal
    const handleShowLogin = () => {
        setShowLogin(true);
    };
    const hideLogin = () => {
        setShowLogin(false);
    };
    const handleLinkClick = (e) => {
        if (!isAuthenticated()) {
            e.preventDefault();
            handleShowLogin(); // Open login form if not authenticated
        }
    };

    // ADD TO WISHLIST
    const [wishList_2, setWishList_2] = useState([]);

    const addToWishList = (id) => {
        setWishList_2((prevList) => {
            if (prevList.includes(id)) {
                // CHECK IF CARD ITEM IS INCLUDE SAME ID
                return prevList.filter((item) => item !== id);
            } else {
                return [...prevList, id];
            }
        });
        // ADD TOAST SUCCESS IF TRUE AND ADD ERROR IF NOT TRUE
        if (!wishList_2.includes(id)) {
            toast.success("تم الاضافة الى المفضلة.");
        } else {
            toast.error("تم الأزالة من المفضلة.");
        }
    };

    const { title, text } =
        content[currentLanguage];
    // handling link page
    const routeMap = {
        trip: `/tripsPage/${offerDetails.trip_id}`,
        gift: `/gifts/${offerDetails.gift_id}`,
        effectiveness: `/eventsPage/${offerDetails.effectiveness_id}`,
    };
    return (
        <div className="all-offers-content padding-80">
            {/* Auth login */}
            <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />
            <TitleSection title={title} text={text} />
            <div className="main-cards-offers" data-aos="fade-right">
                {/* ============= START ROW =========== */}
                <div className="row g-3">
                    {offerDetails ? (
                        <>
                            {/* ========== START COL =========== */}
                            <div className="col-12 col-sm-6 col-xl-12" key={offerDetails.id}>
                                <Link to={routeMap[offerDetails.type] || routeMap.default} onClick={handleLinkClick}>
                                    <OneOfferCard
                                        newClassCard={"card-offer-one"}
                                        idCard={offerDetails.id}
                                        image={offerDetails.photo}
                                        titleCard={currentLanguage === "ar" ? offerDetails.title_ar : offerDetails.title_en}
                                        isTrueNumTwo={true}
                                        textContent={currentLanguage === "ar" ? offerDetails.description_ar : offerDetails.description_en}
                                        isTrueTextOneCard_1={true}
                                        textCardOne_1={currentLanguage === "ar" ? "متاح إلغاء الحجز مجانا" : "Free cancellation is available"}
                                        isTrueTextOneCard_2={true}
                                        textCardOne_2={currentLanguage === "ar" ? "إحجز الآن إدفع لاحقا" : "Book now pay later"}
                                        removeFromFavorites={false}
                                        isFavoritePage={false}
                                        isNewPage={true}
                                        wishListCard={wishList_2}
                                        addToWishList={addToWishList}
                                    />
                                </Link>
                            </div>
                            {/* ========== END COL =========== */}
                        </>
                    ) : (
                        <>
                            <p className="text-section-api fs-6 fw-medium text-center pt-5">
                                {currentLanguage === "ar" ? "لا يوجد عروض جديدة." : "There are no new offers."}
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
            </div>
        </div>)
}

export default OneOffer