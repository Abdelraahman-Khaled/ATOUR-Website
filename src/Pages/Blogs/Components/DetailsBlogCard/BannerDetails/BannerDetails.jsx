import { useLanguage } from "Components/Languages/LanguageContext";
import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import imageBanner1 from "../../../../../assets/images/slider/01.png";
const BannerDetails = ({ img }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    <div className="banner-details-blog-info">
      {/* =========== START BANNER MAIN AREA ========== */}
      <div className={`banner-main-area banner-area---2`}>
        {/* ========= START BANNER ONE ======== */}
        <div
          className="banner-one section-padding bg-image position-relative"
          style={{ 
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Blurred background layer */}
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              filter: "blur(8px)",
              WebkitFilter: "blur(8px)",
              transform: "scale(1.05)", // Slightly larger to avoid blur edges
              transformOrigin: "center center", // Ensure scaling happens from the center
              animation: "slowZoom 20s infinite alternate", // Slow zoom animation
              zIndex: 0
            }}
          ></div>
          
          {/* Dark overlay for better contrast */}
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))", // Gradient overlay for better depth
              zIndex: 1 // Higher than the blurred background but lower than content
            }}
          ></div>
          
          {/* Content layer (not blurred) */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <BreadcrumbsPage
              newClassBreadHeader={false}
              routeTitleTwoBread={"/blogsPage"}
              titleTwoBread={currentLanguage === "ar" ? "المدونة" : "Blog"}
              textBreadActive={currentLanguage === "ar" ? "تفاصيل" : "Details"}
            />
          </div>
        </div>
        {/* ======== END BANNER ONE ========= */}
      </div>
      {/* =========== END BANNER MAIN AREA ========== */}
    </div>
  );
};

export default BannerDetails;
