import { useEffect, useState } from "react";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import ContentAPI from "api/contentApi";
import SliderEventCardDetails from "Pages/Events/Components/DetailsCardEvent/Components/SliderEventCardDetails/SliderEventCardDetails";
import GiftCardDetails from "./GiftCardDetails/GiftCardDetails";
import Loader from "Components/Auth/Components/Loader/Loader";

const GiftDetail = () => {
    // Extract the `id` from the URL
    const { id } = useParams();
    // language
    const { currentLanguage } = useLanguage(); // Get the current language
    // states
    const [gift, setGift] = useState(null); // State to store home data
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to handle errors

    // fetching Data
    useEffect(() => {
        const fetchgift = async () => {
            try {
                const response = await ContentAPI.getGiftById(id, currentLanguage); // Fetch data from the API
                const data = response.data; // Extract the data from the response
                if (data) {
                    setGift(data); // Set the fetched data to state
                } else {
                    setError("gift not found."); // Handle case where the ID doesn't match any item
                }
            } catch (err) {
                console.error("Error fetching gift data:", err);
                setError("Failed to load gift data. Please try again later.");
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchgift(); // Call the API on component mount
    }, [id, currentLanguage]); // Re-run the effect if the `id` changes

    if (loading) {
        return (
            <div style={{ margin: "200px 0px" }}>
                <Loader />
            </div>
        );
    }


    if (error) {
        return <>
            <p className="text-section-api fs-6 fw-medium text-center pt-5 d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
                {currentLanguage === "ar" ? " هذه الهدية غير متوافرة" : "This gift not available"}
                <Link
                    to="/"
                    className="fs-6 fw-medium text-danger text-decoration-underline px-2"
                >
                    {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
                </Link>
            </p>
        </>;
        ; // Display error message if fetching fails
    }
    return (
        <>
            <HelmetInfo titlePage={"تفاصيل الهدايا"} />

            <div className="details-card-event-page">
                {/* =========== START DETAILS CARD EVENT DETAILS ============= */}
                <SliderEventCardDetails image={gift} />
                {/* =========== END DETAILS CARD EVENT DETAILS ============= */}
                {/* =========== START CONTAINER ============ */}
                <ContainerMedia>
                    <GiftCardDetails gift={gift} />
                </ContainerMedia>
                {/* =========== END CONTAINER ============ */}
            </div>
        </>
    );
};

export default GiftDetail;
