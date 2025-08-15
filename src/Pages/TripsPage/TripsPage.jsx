import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import React, { useEffect, useState } from "react";
import TripsContent from "./Components/TripsContent/TripsContent";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import ModalSelectDestination from "Components/Ui/ModalSelectDestination/ModalSelectDestination";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import ContentAPI from "api/contentApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";
import Loader from "Components/Auth/Components/Loader/Loader";


const text = {
  ar: {
    noData: "لا يوجد بيانات متاحة.",
    home: "الصفحة الرئيسية",
  },
  en: {
    noData: "No data available.",
    home: "Home",
  },
};

const TripsPage = () => {
  const { currentLanguage } = useLanguage(); // Access current language
  const [tripsData, setTripsData] = useState([]); // State to store home data
  const [loading, setLoading] = useState(true); // State to manage loading

  // SHOW MODAL SELECT DESTINATION
  const [showModalSelectDestination, setShowModalSelectDestination] =
    useState(false);
  // SHOW MODAL ADD TRIP
  const buttonShowModal = () => {
    setShowModalSelectDestination(true);
  };
  const hideModalSelectDestination = () => {
    setShowModalSelectDestination(false);
  };

  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };
  // feching the Data
  useEffect(() => {
    const fetchTripsData = async () => {
      try {
        const data = await ContentAPI.getTrips(currentLanguage); // Fetch data from the API
        const normalizedData = normalizeData(data.data); // Normalize the data

        setTripsData(normalizedData); // Set the fetched data to state
      } catch (err) {
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };
    fetchTripsData(); // Call the API on component mount
  }, [currentLanguage]);

  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "الرحلات" : "Trips"} />

      <ModalSelectDestination
        showModalSelectDestination={showModalSelectDestination}
        hideModalSelectDestination={hideModalSelectDestination}
      />
      <div className="trips-page-info padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={null}
            textBreadActive={currentLanguage === "ar" ? "رحلات" : "Trips"}
          />
        </header>
        <main>
          <ContainerMedia>
            <div className="mt-5">
              {loading ? (
                <div style={{ margin: "200px 0px" }}>
                  <Loader />
                </div>
              ) : tripsData.length > 0 ? (
                <TripsContent tripsData={tripsData} />
              ) : (
                <div className="d-flex justify-content-center ">
                  <div className="no-data-text">
                    {currentLanguage === "ar"
                      ? "لا توجد رحلات متاحة"
                      : "No trips available"}
                    <Link
                      to="/"
                      className="fs-6 fw-medium text-danger text-decoration-underline px-2"
                    >
                      {text[currentLanguage].home}
                    </Link>
                  </div>

                </div>
              )}
            </div>
          </ContainerMedia>
        </main>
      </div>
    </>
  );
};

export default TripsPage;
