import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import atourIcon from "assets/images/logo/whiteLogo.png";
import './VendorOfferCard.css';
import { useLanguage } from 'Components/Languages/LanguageContext';

const serviceOffers = {
    ar: "عروض الخدمات",
    en: "Service Offers",
    fr: "Offres de services",
    de: "Serviceangebote",
    es: "Ofertas de servicios",
    tr: "Hizmet teklifleri",
    ru: "Предложения услуг",
    zh: "服务优惠",
    ko: "서비스 혜택",
    pt: "Ofertas de serviços",
    ur: "خدمات کی پیشکشیں",
    ja: "サービス特典",
};


const VendorOfferCard = ({
    imageCard,
    amount,
    type,
    titleCard
}) => {
    const { currentLanguage } = useLanguage()
    return (
        <>
            {/* ============ START CARD COLLECTION ONE =========== */}
            <div className="card-image-one">
                {/* =========== START IMAGE COLLECTION =========== */}
                <div className="image-card position-relative overlay-bg">
                    <img
                        src={imageCard}
                        alt="imageCollection"
                        loading="lazy"
                        className="w-100 h-100 object-fit-cover image-card-src"
                    />
                    {/* Left overlay for "Offers and Rewards" */}
                    <div className="offer-left-overlay">
                        <span className="mb-2"> {serviceOffers[currentLanguage]}</span>
                        <img
                            src={atourIcon}
                            alt="search-icon"
                            style={{
                                minHeight: 'auto',
                                width: "1.3rem"
                            }}
                        />
                    </div>
                    {/* Right overlay for "50 % Discount" */}
                    <div className="offer-right-overlay">
                        <span className="price-num title w-100 mb-3">
                            {amount + " "}{type === "percentage" ? "%" : <FontAwesomeIcon icon={faCoins} />}
                        </span>
                        <span className="price-num w-100">
                            {titleCard}
                        </span>
                    </div>
                </div>

                {/* =========== END IMAGE COLLECTION =========== */}
            </div >
            {/* ============ END CARD COLLECTION ONE =========== */}
        </>
    );
};

export default VendorOfferCard;