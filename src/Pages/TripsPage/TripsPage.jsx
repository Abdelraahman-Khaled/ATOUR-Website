import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TripsContent from "./Components/TripsContent/TripsContent";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import ModalSelectDestination from "Components/Ui/ModalSelectDestination/ModalSelectDestination";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import ContentAPI from "api/contentApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";
import Loader from "Components/Auth/Components/Loader/Loader";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import TripsPageSkeleton from "./Components/TripsPageSkeleton/TripsPageSkeleton";


const text = {
  ar: {
    noData: "لا يوجد بيانات متاحة.",
    home: "الصفحة الرئيسية",
    experiences: "الجولات",
  },
  en: {
    noData: "No data available.",
    home: "Home",
    experiences: "Experiences",
  },
  fr: {
    noData: "Aucune donnée disponible.",
    home: "Accueil",
    experiences: "Expériences",
  },
  de: {
    noData: "Keine Daten verfügbar.",
    home: "Startseite",
    experiences: "Erlebnisse",
  },
  es: {
    noData: "No hay datos disponibles.",
    home: "Inicio",
    experiences: "Experiencias",
  },
  tr: {
    noData: "Veri bulunmamaktadır.",
    home: "Ana Sayfa",
    experiences: "Deneyimler",
  },
  ru: {
    noData: "Данные недоступны.",
    home: "Главная",
    experiences: "Впечатления",
  },
  zh: {
    noData: "没有可用数据。",
    home: "首页",
    experiences: "体验",
  },
  ko: {
    noData: "데이터가 없습니다.",
    home: "홈",
    experiences: "체험",
  },
  pt: {
    noData: "Nenhum dado disponível.",
    home: "Início",
    experiences: "Experiências",
  },
  ur: {
    noData: "کوئی ڈیٹا دستیاب نہیں ہے۔",
    home: "ہوم",
    experiences: "تجربات",
  },
  ja: {
    noData: "利用可能なデータがありません。",
    home: "ホーム",
    experiences: "体験",
  },
};

const TripsPage = () => {
  const { currentLanguage } = useLanguage(); // Access current language
  const { currentCurrency } = useCurrency();
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

  // SHOW MODAL SELECT DESTINATION
  const [showModalSelectDestination, setShowModalSelectDestination] = useState(false);
  // SHOW MODAL ADD TRIP
  const buttonShowModal = () => {
    setShowModalSelectDestination(true);
  };
  const hideModalSelectDestination = () => {
    setShowModalSelectDestination(false);
  };

  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };

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
  const handleSubmitFilters = (event) => {
    if (event) {
      event.preventDefault();
    }
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

  // Fetch Trips Data using React Query
  const {
    data: tripsData = [],
    isPending: loading,
    error
  } = useQuery({
    queryKey: ['tripsData', currentLanguage, currentCurrency, appliedFilters],
    queryFn: async () => {
      const params = {};
      if (appliedFilters.selectedSubCategoryIds.length > 0) {
        appliedFilters.selectedSubCategoryIds.forEach((id, index) => {
          params[`sub_category_id[${index}]`] = id;
        });
      }

      // Add price filter parameters
      if (appliedFilters.priceFilter.min_price !== null) {
        params.min_price = appliedFilters.priceFilter.min_price;
      }
      if (appliedFilters.priceFilter.max_price !== null) {
        params.max_price = appliedFilters.priceFilter.max_price;
      }

      // Add country and city filter parameters
      if (appliedFilters.selectedCountryId !== null) {
        params.country_id = appliedFilters.selectedCountryId;
      }
      if (appliedFilters.selectedCityId !== null) {
        params.city_id = appliedFilters.selectedCityId;
      }

      // Add checkbox filter parameters
      if (appliedFilters.checkboxFilters.max_rate === 1) {
        params.max_rate = 1;
      }
      if (appliedFilters.checkboxFilters.max_booked === 1) {
        params.max_booked = 1;
      }
      if (appliedFilters.checkboxFilters.has_offer === 1) {
        params.has_offer = 1;
      }

      const data = await ContentAPI.getTrips(currentLanguage, currentCurrency, params);
      return normalizeData(data.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData, // Keep showing previous data while fetching new filters
  });

  return (
    <>
      <HelmetInfo titlePage={text[currentLanguage].experiences} />

      <ModalSelectDestination
        showModalSelectDestination={showModalSelectDestination}
        hideModalSelectDestination={hideModalSelectDestination}
      />
      <div className="trips-page-info padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={null}
            textBreadActive={text[currentLanguage].experiences}
          />
        </header>
        <main>
          <ContainerMedia>
            <div className="mt-4">
              {loading ? (
                <TripsPageSkeleton />
              ) : (
                <TripsContent
                  tripsData={tripsData}
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
                  loading={loading}
                  type={"trip"}
                />
              )}
            </div>
          </ContainerMedia>
        </main>
      </div>
    </>
  );
};

export default TripsPage;
