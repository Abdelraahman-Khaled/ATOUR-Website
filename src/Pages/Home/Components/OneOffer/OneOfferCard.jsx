import atourIcon from "assets/images/logo/whiteLogo.png";
import { useLanguage } from "Components/Languages/LanguageContext";
const translate = {
    ar: "عروض شركائنا",
    en: "Our Partners' Offers",
    fr: "Offres de nos partenaires",
    es: "Ofertas de nuestros socios",
    de: "Angebote unserer Partner",
    it: "Offerte dei nostri partner",
    pt: "Ofertas dos nossos parceiros",
    ru: "Предложения наших партнеров",
    zh: "我们合作伙伴的优惠",
    ja: "パートナーのオファー",
    ko: "파트너사 제안",
    tr: "Ortaklarımızın Teklifleri",
    hi: "हमारे भागीदारों की पेशकश",
    nl: "Aanbiedingen van onze partners",
    pl: "Oferty naszych partnerów"
}
const OneOfferCard = ({
    imageCard,
    titleCard,
    amount,
    titleDescription,
}) => {
    const { currentLanguage } = useLanguage()
    return (
        <>
            {/* ============ START CARD COLLECTION ONE =========== */}
            <div className="card-image-one">
                {/* =========== START IMAGE COLLECTION =========== */}
                <div className="image-card position-relative">
                    <img
                        src={imageCard}
                        alt="imageCollection"
                        loading="lazy"
                        className="w-100 h-100 object-fit-cover image-card-src"
                    />
                    <div className="offer-left-overlay">
                        <span className="mb-2"> {translate[currentLanguage]}</span>
                        <img
                            src={atourIcon}
                            alt="search-icon"
                            style={{
                                minHeight: 'auto',
                                width: "1.3rem"
                            }}
                        />
                    </div>
                    <div className="offer-right-overlay">
                        <div className="offer-discount">
                            <span className="offer-text">{amount}</span>
                        </div>
                        <span className="price-num w-100 mb-2">{titleCard}</span>
                        <span className="price-num w-100">{titleDescription}</span>
                    </div>
                </div>
                {/* =========== END IMAGE COLLECTION =========== */}
            </div>
            {/* ============ END CARD COLLECTION ONE =========== */}
        </>
    );
};

export default OneOfferCard;