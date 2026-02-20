import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import TopContentInfo from "./Components/TopContentInfo/TopContentInfo";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import AllContentInfoDetailsMiddel from "./Components/AllContentInfoDetailsMiddel/AllContentInfoDetailsMiddel";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ContentAPI from "api/contentApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import Loader from "Components/Auth/Components/Loader/Loader";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import { detailsTripTranslations } from "./translation";
import MainSlider from "Components/Ui/MainSlider/MainSlider";

const DetailsTripInfoPage = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { currentCurrency } = useCurrency();
  const { id } = useParams();
  // Fetch data using React Query
  const {
    data: tripData,
    isPending: loading,
    error
  } = useQuery({
    queryKey: ['tripDetails', id, currentLanguage, currentCurrency],
    queryFn: async () => {
      const response = await ContentAPI.getTripById(id, currentLanguage, currentCurrency);
      if (!response.data) throw new Error("Trip not found");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });

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
    return <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found vh-100 align-content-center d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
      {detailsTripTranslations.tourDetailsNotAvailable[currentLanguage]}
      <Link
        to="/"
        className="fs-6 fw-medium text-danger text-decoration-underline px-2"
      >
        {detailsTripTranslations.home[currentLanguage]}
      </Link>
    </p>;;
  }

  // Display if no data is available
  if (!tripData) {
    return <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found vh-100 align-content-center d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
      {detailsTripTranslations.tourDetailsNotAvailable[currentLanguage]}
      <Link
        to="/"
        className="fs-6 fw-medium text-danger text-decoration-underline px-2"
      >
        {detailsTripTranslations.home[currentLanguage]}
      </Link>
    </p>;
  }

  return (
    <>
      <HelmetInfo type="trip" data={tripData} titlePage={tripData.title} description={tripData.description} url={`tripsPage/${tripData.id}`} image={tripData.attachments?.[0]} />

      <div className="details-trip-info-page padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={detailsTripTranslations.tours[currentLanguage]}
            textBreadActive={detailsTripTranslations.tourDetails[currentLanguage]}
          />
        </header>
        <main>
          <ContainerMedia>
            <div className="all-info-page-details pt-3">
              <TopContentInfo tripData={tripData} />
              <MainSlider images={tripData.attachments} />
              <AllContentInfoDetailsMiddel tripData={tripData} />
            </div>
          </ContainerMedia>
        </main>
      </div>
    </>
  );
};

export default DetailsTripInfoPage;
