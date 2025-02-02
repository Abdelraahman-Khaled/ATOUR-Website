import { useLanguage } from "Components/Languages/LanguageContext";
import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import imageBanner1 from "../../../../../assets/images/slider/01.png";
const BannerDetails = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

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
            titleTwoBread={currentLanguage === "ar" ? "المدونة" : "Blog"}
            textBreadActive={currentLanguage === "ar" ? "تفاصيل" : "Details"}
          />
        </div>
        {/* ======== END BANNER ONE ========= */}
      </div>
      {/* =========== END BANNER MAIN AREA ========== */}
    </div>
  );
};

export default BannerDetails;
