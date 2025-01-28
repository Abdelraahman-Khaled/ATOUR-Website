import FamousLandmarksCards from "Pages/BiographyPage/Components/FamousLandmarksCards/FamousLandmarksCards";
import "./ContentNatureInfo.css"
import CardContentNatureDve from "../CardContentNatureDve/CardContentNatureDve";

const ContentNatureInfo = () => {
  return (
    <div className="all-content-nature-info padding-80">
      {/* ================ START TOP HEADER INFO NATURE ============ */}
      <div className="top-header-nature-info" data-aos="fade-up">
        <h2 className="title">الطبيعة والمغامرات في المدينة المنورة</h2>
        <p className="text">
          ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. ذا النص
          هو مثال لنص يمكن أن يستبدل في نفس المساحة.
        </p>
      </div>
      {/* ================ END TOP HEADER INFO NATURE ============ */}

      <FamousLandmarksCards />
      <CardContentNatureDve />
    </div>
  );
};

export default ContentNatureInfo;
