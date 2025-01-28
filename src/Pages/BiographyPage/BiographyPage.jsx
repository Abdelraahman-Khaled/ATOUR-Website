import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import "./BiographyPage.css";
import TabsBiography from "./Components/TabsBiography/TabsBiography";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import ContentAPI from "api/contentApi";
import { useParams } from "react-router-dom";
import LoaderSvg from "assets/Icons/LoaderSvg";

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
        const response = await ContentAPI.getCitiesId(id); // Fetch data from the API
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
  }, [id]); // Re-run the effect if the `id` changes

  // Display loading state
  if (loading) {
    return (
      <div className="text-center m-4">
        <span style={{ scale: "2" }}>
          <LoaderSvg />
        </span>
      </div>
    );
  }

  // Display error state
  if (error) {
    return <div>{error}</div>;
  }

  // Display if no data is available
  if (!biography) {
    return <div>No data found.</div>;
  }
  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "نبذة تعريفية" : "Introduction"} />

      <div className="biography-page padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={currentLanguage === "ar" ? biography.title_ar : biography.title_en}
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