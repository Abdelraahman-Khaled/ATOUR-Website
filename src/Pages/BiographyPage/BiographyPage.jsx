import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import TabsBiography from "./Components/TabsBiography/TabsBiography";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import Loader from "Components/Auth/Components/Loader/Loader";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import { BiographyContext } from "context/BiographyContext";
import biographyContent from "./translates";
import "./BiographyPage.css";

const BiographyPage = () => {
  const { id } = useParams();
  const { biography, error, fetchBiography, loading } = useContext(BiographyContext);
  const { currentLanguage } = useLanguage();

  const t = biographyContent[currentLanguage] || biographyContent.en;

  // Applied filters (submitted to API)
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

  // Temporary filters (before user clicks "Apply")
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

  // === Handlers for filters ===
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
      selectedCityId: null // reset city when country changes
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

  // Apply filters (submit)
  const handleSubmitFilters = (event) => {
    if (event) event.preventDefault();
    setAppliedFilters(tempFilters);
  };

  // Clear filters
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

  // داخل BiographyPage (أو في ملف util مشترك)
  const buildParamsFromFilters = (filters) => {
    const params = {};
    if (!filters) return params;

    if (Array.isArray(filters.selectedSubCategoryIds)) {
      filters.selectedSubCategoryIds.forEach((id, idx) => {
        params[`sub_category_id[${idx}]`] = id;
      });
    }

    if (filters.priceFilter?.min_price != null) params.min_price = filters.priceFilter.min_price;
    if (filters.priceFilter?.max_price != null) params.max_price = filters.priceFilter.max_price;

    if (filters.selectedCountryId != null) params.country_id = filters.selectedCountryId;
    if (filters.selectedCityId != null) params.city_id = filters.selectedCityId;

    if (filters.checkboxFilters?.max_rate === 1) params.max_rate = 1;
    if (filters.checkboxFilters?.max_booked === 1) params.max_booked = 1;
    if (filters.checkboxFilters?.has_offer === 1) params.has_offer = 1;

    return params;
  };
  useEffect(() => {
    if (id) {
      const params = buildParamsFromFilters(appliedFilters);
      fetchBiography(id, params);
    }
  }, [id, appliedFilters, fetchBiography]);

  if (!biography) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found d-flex align-items-center justify-content-center" style={{ height: "350px" }}>
        {error}
        <Link to="/" className="fs-6 fw-medium text-danger text-decoration-underline px-2">
          {t.home}
        </Link>
      </p>
    );
  }

  if (biography === null) {
    return (
      <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found d-flex align-items-center justify-content-center" style={{ height: "350px" }}>
        {t.cityDetailsNotAvailable}
        <Link to="/" className="fs-6 fw-medium text-danger text-decoration-underline px-2">
          {t.home}
        </Link>
      </p>
    );
  }

  return (
    <>
      <HelmetInfo titlePage={biography?.title} description={biography?.description} />

      <div className="biography-page padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader="biography-bread breadcrumb-page-2"
            routeTitleTwoBread={false}
            titleTwoBread={biography?.title}
            textBreadActive={t.introduction}
          />
        </header>
        <main>
          <TabsBiography
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
          />
        </main>
      </div>
    </>
  );
};

export default BiographyPage;
