import { useLanguage } from "Components/Languages/LanguageContext";
import TitleSection from "Components/TitleSection/TitleSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import backUP from "../../../../assets/images/slider/01.png";
import VendorOfferCard from "./VendorOfferCard";
import SwiperCards from "Components/Ui/SwiperCards/SwiperCards";
import { SwiperSlide } from "swiper/react";

const content = {
    ar: {
        title: "عروض مقدمي الخدمات",
        text: "خصومات وتجارب حصرية لفترة محدودة ماذا تنتظر",
        addToFavorites: "تم الاضافة الى المفضلة.",
        removeFromFavorites: "تم الأزالة من المفضلة.",
    },
    en: {
        title: "Vendor Offers",
        text: "Discounts and exclusive experiences for a limited time – what are you waiting for?",
        addToFavorites: "Added to favorites.",
        removeFromFavorites: "Removed from favorites.",
    },
    fr: {
        title: "Offres des prestataires",
        text: "Réductions et expériences exclusives pour une durée limitée – qu'attendez-vous?",
        addToFavorites: "Ajouté aux favoris.",
        removeFromFavorites: "Supprimé des favoris.",
    },
    es: {
        title: "Ofertas de proveedores",
        text: "Descuentos y experiencias exclusivas por tiempo limitado – ¿qué esperas?",
        addToFavorites: "Añadido a favoritos.",
        removeFromFavorites: "Eliminado de favoritos.",
    },
    de: {
        title: "Anbieter-Angebote",
        text: "Rabatte und exklusive Erlebnisse für begrenzte Zeit – worauf wartest du?",
        addToFavorites: "Zu Favoriten hinzugefügt.",
        removeFromFavorites: "Aus Favoriten entfernt.",
    },
    it: {
        title: "Offerte dei fornitori",
        text: "Sconti ed esperienze esclusive per tempo limitato – cosa aspetti?",
        addToFavorites: "Aggiunto ai preferiti.",
        removeFromFavorites: "Rimosso dai preferiti.",
    },
    pt: {
        title: "Ofertas de fornecedores",
        text: "Descontos e experiências exclusivas por tempo limitado – o que está esperando?",
        addToFavorites: "Adicionado aos favoritos.",
        removeFromFavorites: "Removido dos favoritos.",
    },
    ru: {
        title: "Предложения поставщиков",
        text: "Скидки и эксклюзивные впечатления на ограниченное время – чего ты ждёшь?",
        addToFavorites: "Добавлено в избранное.",
        removeFromFavorites: "Удалено из избранного.",
    },
    zh: {
        title: "供应商优惠",
        text: "限时折扣和独家体验 – 你还在等什么？",
        addToFavorites: "已添加到收藏夹。",
        removeFromFavorites: "已从收藏夹中移除。",
    },
    ja: {
        title: "ベンダーオファー",
        text: "期間限定の割引と特別体験 – 何を待っている？",
        addToFavorites: "お気に入りに追加しました。",
        removeFromFavorites: "お気に入りから削除しました。",
    },
};

const VendorOffers = ({ offer }) => {
    const offerData = Array.isArray(offer) ? offer : [];
    const { currentLanguage } = useLanguage(); // Get the selected language from context
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

            {/* ============== START TITLE SECTION ============ */}
            <TitleSection title={title} text={text} />
            {/* ============== END TITLE SECTION ============ */}

            {/* ============ START ALL CARDS COLLECTION ============ */}
            <div className="all-cards-collection" data-aos="fade-up">
                <SwiperCards swiperId="vendor-offers-swiper">
                    {offerData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Link to={getLink(item)}>
                                <VendorOfferCard
                                    imageCard={item.photo || backUP}
                                    amount={item.amount}
                                    type={item.type}
                                    titleCard={item.title}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </SwiperCards>
            </div>
        </div>
    )
}

export default VendorOffers