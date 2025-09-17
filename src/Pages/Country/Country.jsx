import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
// import "./BiographyPage.css";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import { Link, useParams } from "react-router-dom";
import Loader from "Components/Auth/Components/Loader/Loader";
import CountryAPI from "api/country";
import TabsCountry from "./TabsCountry/TabsCountry";
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

    // Pagenation
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 8; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(country?.length / perPage);
    const offset = currentPage * perPage;
    const currentPageData = country?.slice(offset, offset + perPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Fetch biography data based on the `id`
    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await CountryAPI.getCountryCites(currentLanguage, id); // Fetch data from the API
                const data = response.data; // Extract the data from the response
                setCountry(data)
                console.log("contry data", data);
            } catch (err) {
                console.error("Error fetching biography data:", err);
                setError("Failed to load biography data. Please try again later.");
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchCountryDetails(); // Call the API on component mount
    }, [id, currentLanguage]); // Re-run the effect if the `id` changes

    // Display loading state
    if (loading) {
        return (
            <div style={{ margin: "200px 0px" }}>
                <Loader />
            </div>
        );
    }


    // Display error state
    if (error) {
        return <p className="text-section-api fs-6 fw-medium text-center pt-5 d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
            {currentLanguage === "ar" ? "هذه المدينة غير متاحة" : "This city not available"}
            <Link
                to="/"
                className="fs-6 fw-medium text-danger text-decoration-underline px-2"
            >
                {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
            </Link>
        </p>;
    }

    // Display if no data is available
    if (!country) {
        return <p className="text-section-api fs-6 fw-medium text-center pt-5 d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
            {currentLanguage === "ar" ? "تفاصيل المدينة غير متاحة" : "City details not available"}
            <Link
                to="/"
                className="fs-6 fw-medium text-danger text-decoration-underline px-2"
            >
                {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
            </Link>
        </p>;
        ;
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
                                            numPriceCard={""}
                                            isFav={null}
                                            type={null}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </ContainerMedia>
                </main>
            </div >
            {pageCount > 1 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
            }

        </>
    );
};

export default Country;