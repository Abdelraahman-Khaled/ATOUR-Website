
import AllCardsExplore from "Pages/Home/Components/ExploreCountries/Components/AllCardsExplore";

const ExploreBiographyCards = () => {
  return (
    <div className="explore-countries padding-top">
    <div className="title-section-info--1" data-aos="fade-left">
    <h2 className="title">إستكشف حسب إهتماماتك</h2>
    </div>
      {/* ============== START ALL EXPLORE COUNTRIES =========== */}
      <div className="all-explore-countries">
        <AllCardsExplore />
      </div>
      {/* ============== END ALL EXPLORE COUNTRIES =========== */}
    </div>
  );
};

export default ExploreBiographyCards;
