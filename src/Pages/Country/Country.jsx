import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
// import "./BiographyPage.css";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import { Link, useParams } from "react-router-dom";
import Loader from "Components/Auth/Components/Loader/Loader";
import CountryAPI from "api/country";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./Country.css";
import CardCollection from "Components/Ui/CardCollection/CardCollection";
import PaginationPage from "Components/Pagination/Pagination";

const Country = () => {
    const { id } = useParams(); // Extract the `id` from the URL
    const [country, setCountry] = useState(null); // State to store country data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to handle errors
    const { currentLanguage } = useLanguage(); // Get the current language

    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 24; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(country?.length / perPage);
    const offset = currentPage * perPage;
    const currentPageData = country?.slice(offset, offset + perPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Translations
    const content = {
        ar: {
            cityNotAvailable: "هذه المدينة غير متاحة",
            cityDetailsNotAvailable: "تفاصيل المدينة غير متاحة",
            home: "الصفحة الرئيسية",
        },
        en: {
            cityNotAvailable: "This city is not available",
            cityDetailsNotAvailable: "City details not available",
            home: "Home",
        },
        fr: {
            cityNotAvailable: "Cette ville n'est pas disponible",
            cityDetailsNotAvailable: "Les détails de la ville ne sont pas disponibles",
            home: "Accueil",
        },
        de: {
            cityNotAvailable: "Diese Stadt ist nicht verfügbar",
            cityDetailsNotAvailable: "Stadtdetails nicht verfügbar",
            home: "Startseite",
        },
        es: {
            cityNotAvailable: "Esta ciudad no está disponible",
            cityDetailsNotAvailable: "Detalles de la ciudad no disponibles",
            home: "Inicio",
        },
        tr: {
            cityNotAvailable: "Bu şehir mevcut değil",
            cityDetailsNotAvailable: "Şehir detayları mevcut değil",
            home: "Ana Sayfa",
        },
        ru: {
            cityNotAvailable: "Этот город недоступен",
            cityDetailsNotAvailable: "Детали города недоступны",
            home: "Главная",
        },
        zh: {
            cityNotAvailable: "该城市不可用",
            cityDetailsNotAvailable: "城市详情不可用",
            home: "首页",
        },
        ko: {
            cityNotAvailable: "이 도시는 이용할 수 없습니다",
            cityDetailsNotAvailable: "도시 세부정보를 사용할 수 없습니다",
            home: "홈",
        },
        pt: {
            cityNotAvailable: "Esta cidade não está disponível",
            cityDetailsNotAvailable: "Detalhes da cidade não disponíveis",
            home: "Início",
        },
        ur: {
            cityNotAvailable: "یہ شہر دستیاب نہیں ہے",
            cityDetailsNotAvailable: "شہر کی تفصیلات دستیاب نہیں ہیں",
            home: "ہوم",
        },
        ja: {
            cityNotAvailable: "この都市は利用できません",
            cityDetailsNotAvailable: "都市の詳細は利用できません",
            home: "ホーム",
        },
    };

    // Fetch country data
    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await CountryAPI.getCountryCites(currentLanguage, id);
                const data = response.data;
                setCountry(data);
            } catch (err) {
                console.error("Error fetching country data:", err);
                setError("fetch-error");
            } finally {
                setLoading(false);
            }
        };

        fetchCountryDetails();
    }, [id, currentLanguage]);

    // Loading state
    if (loading) {
        return (
            <div style={{ margin: "200px 0px" }}>
                <Loader />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found d-flex align-items-center justify-content-center" style={{ height: "350px" }}>
                {content[currentLanguage].cityNotAvailable}
                <Link to="/" className="fs-6 fw-medium text-danger text-decoration-underline px-2">
                    {content[currentLanguage].home}
                </Link>
            </p>
        );
    }

    // No data state
    if (!country) {
        return (
            <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found d-flex align-items-center justify-content-center" style={{ height: "350px" }}>
                {content[currentLanguage].cityDetailsNotAvailable}
                <Link to="/" className="fs-6 fw-medium text-danger text-decoration-underline px-2">
                    {content[currentLanguage].home}
                </Link>
            </p>
        );
    }

    return (
        <>
            <HelmetInfo titlePage={country[0]?.country_name} />

            <div className="biography-page padding-60">
                <header>
                    <BreadcrumbsPage
                        newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                        routeTitleTwoBread={false}
                        textBreadActive={country[0]?.country_name}
                    />
                </header>
                <main>
                    <ContainerMedia>
                        <div className="row g-4">
                            {currentPageData?.map((city) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 most-visited city-content" key={city.id}>
                                    <Link to={`/biographyPage/${city.id}`}>
                                        <CardCollection
                                            itemId={`${city.id}`}
                                            imageCard={city.image}
                                            infoPlaceCard={city.title}
                                            numRate={city.total_rates}
                                            titleCard={""}
                                            numPriceCard={null}
                                            isFav={null}
                                            type={null}
                                            showFavIcon={false}
                                            discount={null}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </ContainerMedia>
                </main>
            </div>
            {pageCount > 1 && (
                <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
            )}
        </>
    );
};

export default Country;
