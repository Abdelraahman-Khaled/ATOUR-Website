import GeneralAPI from "api/generalApi";
import BannerDetails from "./BannerDetails/BannerDetails";
import InfoNewsDetails from "./BannerDetails/InfoNewsDetails";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./NewsDetails.css";
import Loader from "Components/Auth/Components/Loader/Loader";

const NewsDetails = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { id } = useParams();
  // Fetch data using React Query
  const {
    data: newsDetailsCard,
    isPending: loading,
    error
  } = useQuery({
    queryKey: ['newsDetails', id, currentLanguage],
    queryFn: async () => {
      const response = await GeneralAPI.getNewsDetails(id, currentLanguage);
      if (!response.data) throw new Error("News not found");
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
    return <div>{error.message || "Failed to load news data."}</div>;
  }

  // Display loading state


  return (
    <>
      <HelmetInfo titlePage={newsDetailsCard.title} description={newsDetailsCard.description} image={newsDetailsCard.photo} url={`news/${id}`} />

      <div className="details-news-card">
        {/* ========== START SLIDER DETIALS NEWS ============ */}
        <div className="slider-details-news">
          <BannerDetails img={newsDetailsCard.photo} />
        </div>
        {/* ========== END SLIDER DETIALS NEWS ============ */}
        {/* ========== START CONTAINER ============= */}
        <ContainerMedia>
          <InfoNewsDetails newsDetailsCard={newsDetailsCard} />
        </ContainerMedia>
        {/* ========== END CONTAINER ============= */}
      </div>
    </>
  );
};

export default NewsDetails;