import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import TabsContent from "Components/Ui/TabsContent/TabsContent";
import Tree from "assets/images/IconsHeader/Tree";
import SliderHeader from "../SliderHeader/SliderHeader";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import TripsContent from "Pages/TripsPage/Components/TripsContent/TripsContent";
import AllCardsEvents from "Pages/Events/Components/AllCardsEvents/AllCardsEvents";
import OffersCards from "Pages/Offers/Components/OffersContent/OffersCards";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useState, useEffect } from "react";
import Loader from "Components/Auth/Components/Loader/Loader";

const tabsTranslations = {
  en: {
    experiences: "Experiences",
    events: "Events",
    products: "Products",
  },
  ar: {
    experiences: "جَوْلات",
    events: "فعاليات",
    products: "منتجات",
  },
  fr: {
    experiences: "Expériences",
    events: "Événements",
    products: "Produits",
  },
  de: {
    experiences: "Erlebnisse",
    events: "Veranstaltungen",
    products: "Produkte",
  },
  es: {
    experiences: "Experiencias",
    events: "Eventos",
    products: "Productos",
  },
  tr: {
    experiences: "Deneyimler",
    events: "Etkinlikler",
    products: "Ürünler",
  },
  ru: {
    experiences: "Впечатления",
    events: "События",
    products: "Товары",
  },
  zh: {
    experiences: "体验",
    events: "活动",
    products: "产品",
  },
  ko: {
    experiences: "체험",
    events: "이벤트",
    products: "제품",
  },
  pt: {
    experiences: "Experiências",
    events: "Eventos",
    products: "Produtos",
  },
  ur: {
    experiences: "تجربات",
    events: "تقریبات",
    products: "مصنوعات",
  },
  ja: {
    experiences: "体験",
    events: "イベント",
    products: "製品",
  },
};


const TabsBiography = ({
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
  loading,
  biography
}) => {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState(false); // 👈 tab state
  // كل مرة يغير التاب نعمل reset
  useEffect(() => {
    onClearFilters();
  }, [activeTab]); // 👈 reset when tab changes

  if (!biography) return null;

  // Normalize helper
  const normalizeData = (data) =>
    data.map((item) => ({
      ...item,
      image: item.photo || item.cover,
    }));

  const normalizedData = normalizeData(biography.trips || []);
  const normalizedDataEff = normalizeData(biography.effectivenes || []);
  const normalizedDataGift = normalizeData(biography.gifts || []);

  const t = tabsTranslations[currentLanguage] || tabsTranslations["en"];

  const tabsDataBio = [
    {
      eventKey: "tab1",
      title: (
        <div onClick={() => setActiveTab(!activeTab)} >
          <Tree /> {t.experiences}
        </div>
      ),
      content: (
        <ContainerMedia>
          <TripsContent
            tripsData={normalizedData}
            onSelectSubCategory={onSelectSubCategory}
            onPriceChange={onPriceChange}
            onCountryChange={onCountryChange}
            onCityChange={onCityChange}
            selectedCountryId={selectedCountryId}
            selectedCityId={selectedCityId}
            onCheckboxChange={onCheckboxChange}
            checkboxFilters={checkboxFilters}
            onSubmitFilters={onSubmitFilters}
            onClearFilters={onClearFilters}
            displayCountries={false}
            loading={loading}
            type={"trip"}
          />
        </ContainerMedia>
      ),
    },
    {
      eventKey: "tab2",
      title: (
        <>
          <Ticket /> {t.events}
        </>
      ),
      content: (
        <ContainerMedia>
          <TripsContent
            tripsData={normalizedDataEff}
            onSelectSubCategory={onSelectSubCategory}
            onPriceChange={onPriceChange}
            onCountryChange={onCountryChange}
            onCityChange={onCityChange}
            selectedCountryId={selectedCountryId}
            selectedCityId={selectedCityId}
            onCheckboxChange={onCheckboxChange}
            checkboxFilters={checkboxFilters}
            onSubmitFilters={onSubmitFilters}
            onClearFilters={onClearFilters}
            displayCountries={false}
            loading={loading}
            type={"effectiveness"}
          />
        </ContainerMedia>
      ),
    },
    {
      eventKey: "tab3",
      title: (
        <div onClick={() => setActiveTab(!activeTab)} >
          <Gift /> {t.products}
        </div>
      ),
      content: (
        <ContainerMedia>
          <TripsContent
            tripsData={normalizedDataGift}
            onSelectSubCategory={onSelectSubCategory}
            onPriceChange={onPriceChange}
            onCountryChange={onCountryChange}
            onCityChange={onCityChange}
            selectedCountryId={selectedCountryId}
            selectedCityId={selectedCityId}
            onCheckboxChange={onCheckboxChange}
            checkboxFilters={checkboxFilters}
            onSubmitFilters={onSubmitFilters}
            onClearFilters={onClearFilters}
            displayCountries={false}
            loading={loading}
            type={"gift"}
          />
        </ContainerMedia>
      ),
    },
  ];

  return (
    <div className="all-tabs-bio">
      <SliderHeader biography={biography} />
      <ContainerMedia>
        <div className="padding-60">
          <TabsContent
            tabsData={tabsDataBio}
            newClassTabsContent="tabs-biography"
          />
        </div>
      </ContainerMedia>
    </div>
  );
};

export default TabsBiography;
