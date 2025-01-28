
import BannerDetails from "./BannerDetails/BannerDetails";
import InfoBlogDetails from "./BannerDetails/InfoBlogDetails";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";

const DetailsBlogCard = () => {
  return (
    <>
      <HelmetInfo titlePage={"تفاصيل المدونة"} />

      <div className="details-blog-card">
        {/* ========== START SLIDER DETIALS BLOG ============ */}
        <div className="slider-details-blog">
          <BannerDetails />
        </div>
        {/* ========== END SLIDER DETIALS BLOG ============ */}
        {/* ========== START CONTAINER ============= */}
        <ContainerMedia>
          <InfoBlogDetails />
        </ContainerMedia>
        {/* ========== END CONTAINER ============= */}
      </div>
    </>
  );
};

export default DetailsBlogCard;
