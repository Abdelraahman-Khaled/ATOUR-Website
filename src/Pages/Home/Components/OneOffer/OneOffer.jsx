import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import { useLanguage } from "Components/Languages/LanguageContext";
import TitleSection from "Components/TitleSection/TitleSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import OneOfferCard from "./OneOfferCard";
import backUP from "../../../../assets/images/slider/01.png";
import PaginationPage from "Components/Pagination/Pagination";

const content = {
    ar: {
        title: "عروض تستحق التجربة",
        text: "في عالم مليء بالفرص والمغامرات، هناك تجارب لا يمكن تفويتها. تجارب تأخذك بعيدًا عن الروتين اليومي، تفتح أمامك أبوابًا جديدة لاكتشاف ذاتك والعالم من حولك. سواء كنت تبحث عن مغامرة تضخ الأدرينالين في عروقك، أو لحظة هدوء تنعش روحك، فإن هذه التجارب مصممة لتبقى محفورة في ذاكرتك إلى الأبد. استعد لتجربة تستحق أن تُروى!",
        addToFavorites: "تم الاضافة الى المفضلة.",
        removeFromFavorites: "تم الأزالة من المفضلة.",
    },
    en: {
        title: "Offers worth trying",
        text: "In a world full of opportunities and adventures, there are experiences that cannot be missed. Experiences that take you away from your daily routine, opening new doors for you to discover yourself and the world around you. Whether you are looking for an adrenaline-pumping adventure or a moment of calm that refreshes your soul, these experiences are designed to remain etched in your memory forever. Get ready for an experience worth telling.",
        addToFavorites: "Added to favorites.",
        removeFromFavorites: "Removed from favorites.",
    },
};
const OneOffer = ({ offer }) => {

    const offerData = Array.isArray(offer) ? offer : [];

    const { currentLanguage } = useLanguage(); // Get the selected language from context
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 5; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(offer.length / perPage);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * perPage;
    const currentPageData = offer.slice(offset, offset + perPage);

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



    const { title, text } = content[currentLanguage];

    // handling link page
    const getLink = (item) => {
        if (item.type === 'trip' && item.trip_id > 0) return `/tripsPage/${item.trip_id}`;
        if (item.type === 'gift' && item.gift_id > 0) return `/gifts/${item.gift_id}`;
        if (item.type === 'effectiveness' && item.effectiveness_id > 0) return `/eventsPage/${item.effectiveness_id}`;
        return "/notfound";
    };
    return (
        offerData.length > 0 &&
        <div className="cards-collections padding-top">
            <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />

            {/* ============== START TITLE SECTION ============ */}
            <TitleSection title={title} text={text} />
            {/* ============== END TITLE SECTION ============ */}

            {/* ============ START ALL CARDS COLLECTION ============ */}
            <div className="all-cards-collection" data-aos="fade-up">
                <div className="row g-3 justify-content-center">
                    {currentPageData.map((item) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 most-visited" key={item.id}>
                            <Link to={getLink(item)} onClick={handleLinkClick}>
                                <OneOfferCard
                                    imageCard={item.photo || backUP}
                                    titleCard={item.title || "No title available"}
                                    description={item.description || "No description available"}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
                {offer.length > 0 && pageCount > 1 && (
                    <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
                )}
            </div>
        </div>
    )
}

export default OneOffer