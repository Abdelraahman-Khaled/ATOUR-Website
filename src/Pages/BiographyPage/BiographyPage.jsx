import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import "./BiographyPage.css";
import TabsBiography from "./Components/TabsBiography/TabsBiography";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import ContentAPI from "api/contentApi";
import { Link, useParams } from "react-router-dom";
import Loader from "Components/Auth/Components/Loader/Loader";

const BiographyPage = () => {
  const { id } = useParams(); // Extract the `id` from the URL
  const [biography, setBiography] = useState(null); // State to store biography data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const { currentLanguage } = useLanguage(); // Get the current language

  // Fetch biography data based on the `id`
  useEffect(() => {
    const fetchBiography = async () => {
      try {
        const response = await ContentAPI.getCitiesId(id, currentLanguage); // Fetch data from the API
        const data = response.data; // Extract the data from the response

        if (data) {
          setBiography(data); // Set the fetched data to state
        } else {
          setError("Biography not found."); // Handle case where the ID doesn't match any item
        }
      } catch (err) {
        console.error("Error fetching biography data:", err);
        setError("Failed to load biography data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchBiography(); // Call the API on component mount
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
  if (!biography) {
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
      <HelmetInfo titlePage={biography?.title} />

      <div className="biography-page padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={biography?.title}
            textBreadActive={currentLanguage === "ar" ? "نبذة تعريفية" : "Introduction"}
          />
        </header>
        <main>
          {/* Pass the biography data to the TabsBiography component */}
          <TabsBiography biography={biography} />
        </main>
      </div>
    </>
  );
};

export default BiographyPage;