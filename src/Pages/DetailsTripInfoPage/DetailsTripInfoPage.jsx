import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import TopContentInfo from "./Components/TopContentInfo/TopContentInfo";
import SliderDetailsContent from "./Components/SliderDetailsContent/SliderDetailsContent";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import AllContentInfoDetailsMiddel from "./Components/AllContentInfoDetailsMiddel/AllContentInfoDetailsMiddel";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import ContentAPI from "api/contentApi";
import { useParams } from "react-router-dom";
import LoaderSvg from "assets/Icons/LoaderSvg";
import { useLanguage } from "Components/Languages/LanguageContext";

const DetailsTripInfoPage = () => {
  const [tripData, setTripData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const { currentLanguage } = useLanguage(); // Get the current language
  const { id } = useParams();
  // Fetch data on component mount
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await ContentAPI.getTripById(id); // Replace with your API call
        setTripData(response.data); // Store fetched data in state
      } catch (err) {
        console.error("Error fetching trip data:", err);
        setError("Failed to load trip data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTripData();
  }, [id]);

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
  if (!tripData) {
    return <p className="text-section-api fs-6 fw-medium text-center pt-5">
      {currentLanguage === "ar" ? "لا يوجد رحلات متاحة" : "No trip data available."}
    </p>;
  }
  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "تفاصيل" : "Details"} />

      <div className="details-trip-info-page padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={currentLanguage === "ar" ? "رحلات" : "Trips"}
            textBreadActive={currentLanguage === "ar" ? "تفاصيل الرحلة" : "Trip details"}
          />
        </header>
        <main>
          <ContainerMedia>
            <div className="all-info-page-details pt-3">
              <TopContentInfo tripData={tripData} />
              <SliderDetailsContent tripData={tripData} />
              <AllContentInfoDetailsMiddel tripData={tripData} />
            </div>
          </ContainerMedia>
        </main>
      </div>
    </>
  );
};

export default DetailsTripInfoPage;
