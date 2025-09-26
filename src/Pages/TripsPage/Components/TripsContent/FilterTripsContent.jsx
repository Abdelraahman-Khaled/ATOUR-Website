import DatePickerComponent from "Components/Ui/DatePickerComponent/DatePickerComponent";
import FilterByCategory from "Components/Ui/FilterCards/Components/FilterByCategory";
import FilterByRate from "Components/Ui/FilterCards/Components/FilterByRate";
import FilterByTypeButton from "Components/Ui/FilterCards/Components/FilterByTypeButton";
import PriceFilter from "Components/Ui/FilterCards/Components/PriceFilter";
import FilterCards from "Components/Ui/FilterCards/FilterCards";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";
import "react-datepicker/dist/react-datepicker.css";
const FilterTripsContent = ({ activeMap, subCategories, onSelectSubCategory }) => {
 

  return (
    <div className="main-right-trips-content">
      {!activeMap ? (
        <>
          <div className="all-filter-info">
            <FilterCards>
              <div className="main-add-place-date main-add-place-date--1">
                {/* ======== START SEARCH INPUT ========= */}
                {/* <DatePickerComponent addTextPlaceHolder={"حدد تاريخ الرحلة "} /> */}
                {/* ======== END SEARCH INPUT ========= */}
              </div>
              {/* <PriceFilter /> */}

              {/* ============= START FILTER BY TYPE ============== */}
              <FilterByTypeButton
                buttonCount={subCategories.length}
                buttonLabels={subCategories.map((item) => item.title)}
                onButtonClick={onSelectSubCategory}
                subCategories={subCategories}
              />
              {/* ============= END FILTER BY TYPE ============== */}

              {/* ============= START FILTER CATEGORY ============ */}
              {/* <FilterByCategory
                checkboxCount={checkboxLabels.length}
                checkboxLabels={checkboxLabels}
              /> */}
              {/* ============= END FILTER CATEGORY ============ */}
              {/* ============= START FILTER BY RATE ============ */}
              {/* <FilterByRate /> */}
              {/* ============= END FILTER BY RATE ============ */}
            </FilterCards>
          </div>
        </>
      ) : (
        <>
          {" "}
          {/* <MapLocationInfo /> */}
        </>
      )}
    </div>
  );
};

export default FilterTripsContent;
