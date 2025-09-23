import FormAuth from 'Components/Auth/FormAuth/FormAuth';
import TitleSection from 'Components/TitleSection/TitleSection';
import useTranslation from "Components/Languages/useTranslation";
import { useState, useEffect } from 'react';
import { isAuthenticated } from 'api/axiosInstance';
import { Link } from 'react-router-dom';
import { useLanguage } from 'Components/Languages/LanguageContext';
import CountryAPI from 'api/country';
const Countries = () => {
    const { t } = useTranslation(); // Get the translation function
    const [showLogin, setShowLogin] = useState(false); // Show/Hide AuthForm modal
    const [countries, setCountries] = useState([]);
    const { currentLanguage } = useLanguage()

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await CountryAPI.getCountries(currentLanguage);
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    const sectionTitle = t('homePage.mostCountries.sectionTitle');

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

    return (
        <div className="images-card-content padding-top">
            {/* Auth login */}
            <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />
            {/* =========== START SECTION TITLE ========== */}
            <TitleSection title={sectionTitle} text={""} />
            {/* =========== END SECTION TITLE ============ */}

            {/* Filter buttons */}
            {/* <div className="container mb-4">
                <div className="all-info-card d-flex flex-wrap justify-content-center gap-2  ">
                    <button
                        className={`btn ${selectedCountry === "All" ? "btn-card-one active" : "btn-card-one "} `}
                        onClick={() => setSelectedCountry("All")}
                    >
                        {t('common.all')}
                    </button>
                    {availableCountries.map((country) => (
                        <button
                            key={country.id}
                            className={`btn ${selectedCountry === country.title ? "btn-card-one active" : "btn-card-one "}`}
                            onClick={() => setSelectedCountry(country.title)}
                        >
                            {country.title}
                        </button>
                    ))}
                </div>
            </div> */}

            {/* =========== START ALL IMAGES CARD =========== */}
            <div className="all-images-card" data-aos="fade-up">
                {/* ============ START ROW ========== */}
                <div className="row g-3 justify-content-center">
                    {countries && countries.length > 0 && countries.map((item) => {
                        return (
                            <div key={item.id} className="col-6 col-md-4 col-lg-3">
                                <Link to={`/country/${item.id}`} onClick={handleLinkClick}>
                                    {/* ============ START CARD IMAGE ONE =========== */}
                                    <div className="card-image-one">
                                        <div className="image-card position-relative overlay-bg">
                                            <img
                                                src={item.photo}
                                                alt="imageCard"
                                                loading="lazy"
                                                className="w-100 h-100 object-fit-cover image-card-src"
                                            />
                                        </div>
                                        <div className="content-info">
                                            <h2 className="title">
                                                {item.title}
                                            </h2>
                                        </div>
                                    </div>
                                    {/* ============ END CARD IMAGE ONE =========== */}
                                </Link>
                            </div>
                        );
                    })}
                </div>
                {/* ============ END ROW ========== */}
            </div>
            {/* =========== END ALL IMAGES CARD =========== */}
        </div>
    );
}

export default Countries;