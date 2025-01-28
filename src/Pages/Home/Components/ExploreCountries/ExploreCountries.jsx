import TitleSection from "Components/TitleSection/TitleSection";
import AllCardsExplore from "./Components/AllCardsExplore";

const ExploreCountries = () => {
  return (
    <div className="explore-countries padding-top">
      {/* ============== START TITLE SECTION ============ */}
      <TitleSection
        title={"إستكشف الدول حسب إهتماماتك"}
        text={
          "ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق."
        }
      />
      {/* ============== END TITLE SECTION ============ */}
      {/* ============== START ALL EXPLORE COUNTRIES =========== */}
      <div className="all-explore-countries">
        <AllCardsExplore />
      </div>
      {/* ============== END ALL EXPLORE COUNTRIES =========== */}
    </div>
  );
};

export default ExploreCountries;
