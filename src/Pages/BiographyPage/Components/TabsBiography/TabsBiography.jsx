import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import TabsContent from "Components/Ui/TabsContent/TabsContent";
// import Fork from "assets/images/IconsHeader/Fork";
// import Hotel from "assets/images/IconsHeader/Hotel";
import Tree from "assets/images/IconsHeader/Tree";
import SliderHeader from "../SliderHeader/SliderHeader";
// import FamousLandmarksCards from "../FamousLandmarksCards/FamousLandmarksCards";
// import CardsCollectionBio from "../CardsCollectionBio/CardsCollectionBio";
// import ExploreBiographyCards from "../ExploreBiography/ExploreBiographyCards";
// import NewRates from "../NewRates/NewRates";
import IconBio from "assets/images/IconsBooks/IconBio";
import TripsContent from "Pages/TripsPage/Components/TripsContent/TripsContent";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import AllCardsEvents from "Pages/Events/Components/AllCardsEvents/AllCardsEvents";
import { useLanguage } from "Components/Languages/LanguageContext";
import OffersCards from "Pages/Offers/Components/OffersContent/OffersCards";
import { useState } from "react";

const TabsBiography = ({ biography }) => {
  // lang
  const { currentLanguage } = useLanguage(); // Get the current language
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);

  // Applied filters (used for API calls)
  const [appliedFilters, setAppliedFilters] = useState({
    selectedSubCategoryIds: [],
    priceFilter: { min_price: null, max_price: null },
    selectedCountryId: null,
    selectedCityId: null,
    checkboxFilters: {
      max_rate: 0,
      max_booked: 0,
      has_offer: 0
    }
  });

  // Temporary filters (user selections before submission)
  const [tempFilters, setTempFilters] = useState({
    selectedSubCategoryIds: [],
    priceFilter: { min_price: null, max_price: null },
    selectedCountryId: null,
    selectedCityId: null,
    checkboxFilters: {
      max_rate: 0,
      max_booked: 0,
      has_offer: 0
    }
  });

  const handleSelectSubCategory = (subCategoryIds) => {
    setTempFilters(prev => ({
      ...prev,
      selectedSubCategoryIds: subCategoryIds
    }));
  };

  const handlePriceChange = (priceData) => {
    setTempFilters(prev => ({
      ...prev,
      priceFilter: priceData
    }));
  };

  const handleCountryChange = (countryId) => {
    setTempFilters(prev => ({
      ...prev,
      selectedCountryId: countryId,
      selectedCityId: null // Reset city when country changes
    }));
  };

  const handleCityChange = (cityId) => {
    setTempFilters(prev => ({
      ...prev,
      selectedCityId: cityId
    }));
  };

  const handleCheckboxChange = (checkboxType, isChecked) => {
    setTempFilters(prev => ({
      ...prev,
      checkboxFilters: {
        ...prev.checkboxFilters,
        [checkboxType]: isChecked ? 1 : 0
      }
    }));
  };

  // Submit filters function
  const handleSubmitFilters = () => {
    setAppliedFilters(tempFilters);
  };

  // Clear filters function
  const handleClearFilters = () => {
    const clearedFilters = {
      selectedSubCategoryIds: [],
      priceFilter: { min_price: null, max_price: null },
      selectedCountryId: null,
      selectedCityId: null,
      checkboxFilters: {
        max_rate: 0,
        max_booked: 0,
        has_offer: 0
      }
    };
    setTempFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  // Normalize data || convert image name to be the same with all trips
  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };
  const normalizedData = normalizeData(biography.trips); // Normalize the data
  const normalizedDataEff = normalizeData(biography.effectivenes); // Normalize the data
  const normalizedDataGift = normalizeData(biography.gifts); // Normalize the data
  const tabsDataBio = [
    {
      eventKey: "tab1",
      title: (
        <>
          <Tree /> {currentLanguage === "ar" ? "جَوْلات" : "Experiences"}
        </>
      ),
      content: (
        <>
          <ContainerMedia>
            <TripsContent
              tripsData={normalizedData}
              onSelectSubCategory={handleSelectSubCategory}
              onPriceChange={handlePriceChange}
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
              selectedCountryId={tempFilters.selectedCountryId}
              selectedCityId={tempFilters.selectedCityId}
              onCheckboxChange={handleCheckboxChange}
              checkboxFilters={tempFilters.checkboxFilters}
              onSubmitFilters={handleSubmitFilters}
              onClearFilters={handleClearFilters}
            />
          </ContainerMedia>
        </>
      ),
    },

    ,
    {
      eventKey: "tab2",
      title: (
        <>
          <Ticket /> {currentLanguage === "ar" ? "فعاليات" : "events"}
        </>
      ),
      content: (
        <>
          <ContainerMedia>
            <AllCardsEvents currentLanguage={currentLanguage} eventsData={normalizedDataEff} className={"p-0"} />
          </ContainerMedia>
        </>
      )
    },
    {
      eventKey: "tab3",
      title: (
        <>
          <Gift /> {currentLanguage === "ar" ? "هدايا تذكارية" : "Souvenirs"}
        </>
      ),
      content: (
        <>
          <ContainerMedia>
            <TripsContent
              tripsData={normalizedDataGift}
              onSelectSubCategory={handleSelectSubCategory}
              onPriceChange={handlePriceChange}
              onCountryChange={handleCountryChange}
              onCityChange={handleCityChange}
              selectedCountryId={tempFilters.selectedCountryId}
              selectedCityId={tempFilters.selectedCityId}
              onCheckboxChange={handleCheckboxChange}
              checkboxFilters={tempFilters.checkboxFilters}
              onSubmitFilters={handleSubmitFilters}
              onClearFilters={handleClearFilters}
            />
            <OffersCards gifts={normalizedDataGift} />
          </ContainerMedia>
        </>
      )
    }
  ];
  return (
    <div className="all-tabs-bio">


      <SliderHeader biography={biography} />

      <ContainerMedia>
        <div className="padding-60">
          <TabsContent
            tabsData={tabsDataBio}
            newClassTabsContent={"tabs-biography"}
          />

        </div>
      </ContainerMedia>

    </div>
  );
};

export default TabsBiography;
