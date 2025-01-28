import HeaderFilterCard from "./Components/HeaderFilterCard";
import "./FilterCards.css";
const FilterCards = ({ children }) => {
  return (
    <div className="all-filter-cards-content">
      {/* ============= START HEADER FILTER CARD =============== */}
      <HeaderFilterCard />
      {/* ============= END HEADER FILTER CARD =============== */}

      {children}
    </div>
  );
};

export default FilterCards;
