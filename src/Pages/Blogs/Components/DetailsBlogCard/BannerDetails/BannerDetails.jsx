import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import imageBanner1 from "../../../../../assets/images/slider/01.png";
const BannerDetails = () => {
  return (
    <div className="banner-details-blog-info">
      {/* =========== START BANNER MAIN AREA ========== */}
      <div className={`banner-main-area banner-area---2`}>
        {/* ========= START BANNER ONE ======== */}
        <div
          className="banner-one section-padding bg-image"
          style={{ backgroundImage: `url(${imageBanner1})` }}
        >
          <BreadcrumbsPage
            newClassBreadHeader={false}
            routeTitleTwoBread={"/blogsPage"}
            titleTwoBread={"المدونة"}
            textBreadActive={"تفاصيل"}
          />
        </div>
        {/* ======== END BANNER ONE ========= */}
      </div>
      {/* =========== END BANNER MAIN AREA ========== */}
    </div>
  );
};

export default BannerDetails;
