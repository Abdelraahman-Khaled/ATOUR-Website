import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import { useLanguage } from "Components/Languages/LanguageContext";
import TitleSection from "Components/TitleSection/TitleSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import OneOfferCard from "./OneOfferCard";
import backUP from "../../../../assets/images/slider/01.png";
import SwiperCards from "Components/Ui/SwiperCards/SwiperCards";
import { SwiperSlide } from "swiper/react";

const content = {
    ar: {
        title: "فرص وعروض استثنائية لعملائنا ",
        addToFavorites: "تم الاضافة الى المفضلة.",
        removeFromFavorites: "تم الأزالة من المفضلة.",
    },
    en: {
        title: "Exceptional opportunities and offers for our clients",
        addToFavorites: "Added to favorites.",
        removeFromFavorites: "Removed from favorites.",
    },
    fr: {
        title: "Opportunités et offres exceptionnelles pour nos clients",
        addToFavorites: "Ajouté aux favoris.",
        removeFromFavorites: "Supprimé des favoris.",
    },
    es: {
        title: "Oportunidades y ofertas excepcionales para nuestros clientes",
        addToFavorites: "Añadido a favoritos.",
        removeFromFavorites: "Eliminado de favoritos.",
    },
    de: {
        title: "Außergewöhnliche Chancen und Angebote für unsere Kunden",
        addToFavorites: "Zu den Favoriten hinzugefügt.",
        removeFromFavorites: "Aus den Favoriten entfernt.",
    },
    ru: {
        title: "Исключительные возможности и предложения для наших клиентов",
        addToFavorites: "Добавлено в избранное.",
        removeFromFavorites: "Удалено из избранного.",
    },
    zh: {
        title: "为我们的客户提供绝佳的机会和优惠",
        addToFavorites: "已添加到收藏夹。",
        removeFromFavorites: "已从收藏夹中移除。",
    },
    ja: {
        title: "お客様への特別な機会とオファー",
        addToFavorites: "お気に入りに追加しました。",
        removeFromFavorites: "お気に入りから削除しました。",
    },
    ko: {
        title: "고객님을 위한 특별한 기회와 혜택",
        addToFavorites: "즐겨찾기에 추가되었습니다.",
        removeFromFavorites: "즐겨창기에서 제거되었습니다.",
    },
    it: {
        title: "Opportunità e offerte eccezionali per i nostri clienti",
        addToFavorites: "Aggiunto ai preferiti.",
        removeFromFavorites: "Rimosso dai preferiti.",
    },
    pt: {
        title: "Oportunidades e ofertas excepcionais para os nossos clientes",
        addToFavorites: "Adicionado aos favoritos.",
        removeFromFavorites: "Removido dos favoritos.",
    },
    tr: {
        title: "Müşterilerimiz için olağanüstü fırsatlar ve teklifler",
        addToFavorites: "Favorilere eklendi.",
        removeFromFavorites: "Favorilerden kaldırıldı.",
    },
 
};

const OneOffer = ({ offer }) => {

    const offerData = Array.isArray(offer) ? offer : [];

    const { currentLanguage } = useLanguage(); // Get the selected language from context
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
        if (item.source === 'trip') return `/tripsPage/${item.model_id}`;
        if (item.source === 'gift') return `/gifts/${item.model_id}`;
        if (item.source === 'effectiveness') return `/eventsPage/${item.model_id}`;
        return "/notfound";
    };


    return (
        offerData.length > 0 &&
        <div className="cards-collections padding-top">
            <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />

            {/* ============== START TITLE SECTION ============ */}
            <TitleSection title={title} text={""} />
            {/* ============== END TITLE SECTION ============ */}

            {/* ============ START ALL CARDS COLLECTION ============ */}
            <div className="all-cards-collection" data-aos="fade-up">
                <SwiperCards swiperId="one-offer-swiper">
                    {offerData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Link to={getLink(item)} onClick={handleLinkClick}>
                                <OneOfferCard
                                    imageCard={item.photo || backUP}
                                    amount={item.amount}
                                    titleCard={item.title}
                                    titleDescription={item.description}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </SwiperCards>
            </div>
        </div>
    )
}

export default OneOffer