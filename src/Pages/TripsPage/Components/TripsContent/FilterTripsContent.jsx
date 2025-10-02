import FilterByCategory from "Components/Ui/FilterCards/Components/FilterByCategory";
import FilterByTypeButton from "Components/Ui/FilterCards/Components/FilterByTypeButton";
import PriceFilter from "Components/Ui/FilterCards/Components/PriceFilter";
import BootstrapDropdownFilter from "Components/Ui/FilterCards/Components/BootstrapDropdownFilter";
import FilterCards from "Components/Ui/FilterCards/FilterCards";
import { useState, useEffect } from "react";
import BookingAPI from "api/bookingApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import useTranslation from "Components/Languages/useTranslation";
import "react-datepicker/dist/react-datepicker.css";
const FilterTripsContent = ({
  activeMap,
  subCategories,
  onSelectSubCategory,
  onPriceChange,
  onCountryChange,
  onCityChange,
  selectedCountryId,
  selectedCityId,
  onCheckboxChange,
  checkboxFilters,
  onSubmitFilters,
  onClearFilters,
  loading,// Add loading prop
  displayCountries = true,
}) => {
  const { t } = useTranslation();

  // Create translated checkbox labels
  const checkboxLabels = [
    t('common.highestRating'),
    t('common.offers'),
    t('common.mostBooked')
  ];

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await BookingAPI.getCountries();
        if (response.success && Array.isArray(response.data)) {
          setCountries(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch cities when country is selected
  useEffect(() => {
    if (selectedCountryId) {
      const fetchCities = async () => {
        try {
          const response = await BookingAPI.getCitiesByCountryId(selectedCountryId);
          if (response.success && Array.isArray(response.data)) {
            setCities(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch cities:", error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedCountryId]);

  return (
    <div className="main-right-trips-content">
      {!activeMap ? (
        <>
          <div className="all-filter-info">
            <FilterCards>
              {/* <div className="main-add-place-date main-add-place-date--1"> */}
              {/* ======== START SEARCH INPUT ========= */}
              {/* <DatePickerComponent addTextPlaceHolder={"حدد تاريخ الرحلة "} /> */}
              {/* ======== END SEARCH INPUT ========= */}
              {/* </div> */}
              {/* Country Filter */}
              <p className="mb-2"></p>
              {displayCountries && <BootstrapDropdownFilter
                label={t('common.country')}
                options={countries}
                onSelect={(country) => onCountryChange(country?.id || null)}
                selectedValue={selectedCountryId}
              />
              }

              {/* City Filter */}
              {selectedCountryId && (
                <BootstrapDropdownFilter
                  label={t('common.city')}
                  options={cities}
                  onSelect={(city) => onCityChange(city?.id || null)}
                  selectedValue={selectedCityId}
                />
              )}

              <PriceFilter onPriceChange={onPriceChange} />

              {/* ============= START FILTER BY TYPE ============== */}
              <FilterByTypeButton
                buttonCount={subCategories.length}
                buttonLabels={subCategories.map((item) => item.title)}
                onButtonClick={onSelectSubCategory}
                subCategories={subCategories}
              />
              {/* ============= END FILTER BY TYPE ============== */}

              {/* ============= START FILTER CATEGORY ============ */}
              <FilterByCategory
                checkboxCount={checkboxLabels.length}
                checkboxLabels={checkboxLabels}
                onCheckboxChange={onCheckboxChange}
                checkboxFilters={checkboxFilters}
              />
              {/* ============= END FILTER CATEGORY ============ */}
              {/* ============= START FILTER BY RATE ============ */}
              {/* <FilterByRate /> */}
              {/* ============= END FILTER BY RATE ============ */}

              {/* Filter Action Buttons */}
              <div className="filter-action-buttons d-flex gap-2 mt-3 w-100">
                <button
                  className="btn-main w-100"
                  onClick={() => {
                    onSubmitFilters();
                  }}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? t('common.applyingFilters') : t('common.applyFilters')} {/* Change text based on loading state */}
                </button>
                <button
                  className="btn-main w-100 edit-information-btn "
                  onClick={onClearFilters}
                >
                  {t('common.clearFilters')}
                </button>
              </div>
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
