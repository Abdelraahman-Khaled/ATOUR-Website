import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HeaderCard from "./Components/HeaderCard/HeaderCard";
import ImagesCard from "./Components/ImagesCard/ImagesCard";
import CardsCollections from "./Components/CardsCollections/CardsCollections";
import BannerHome from "./Components/BannerHome/BannerHome";
import Slider from "./Components/Slider/Slider";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useHome } from "context/HomeContext";
import OneOffer from "./Components/OneOffer/OneOffer";
import SplashScreen from "Components/SplashScreen/SplashScreen";
import Countries from "./Components/Countries/Countries";
import VendorOffers from "./Components/VendorOffers/VendorOffers";
import CardsBooks from "./Components/WhyCardsBooks/CardsBooks";
import CitiesCard from "./Components/CitiesCard/CitiesCard";


const text = {
  ar: "لا توجد بيانات متاحة",
  en: "No data available",
  fr: "Aucune donnée disponible",
  de: "Keine Daten verfügbar",
  es: "No hay datos disponibles",
  it: "Nessun dato disponibile",
  ru: "Данные отсутствуют",
  zh: "无可用数据",
  ja: "利用可能なデータがありません",
  ko: "사용 가능한 데이터가 없습니다"
}
const Home = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { homeData, loading, error } = useHome(); // Use the HomeContext

  // Extract data from homeData if it exists
  const mostVisited = homeData?.most_visited || [];
  const experince = homeData?.old_experiences || [];
  const effectivenes = homeData?.effectivenes || [];
  const gifts = homeData?.top_gifts || [];
  const offerData = homeData?.offers || null;
  const offerVendorData = homeData?.vendor_offers || null;


  if (loading) {
    return (
      <SplashScreen />
    );
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  // If no data is available yet, show a message
  if (!homeData) {
    return <div className="text-center">{text[currentLanguage]}</div>;
  }
  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"} />
      <header>
        <Slider />
      </header>
      <main>
        <ContainerMedia>
          <HeaderCard />
          <Countries />
          {mostVisited.length > 0 && <CitiesCard CityData={mostVisited} />}
          {offerData && <OneOffer offer={offerData} />}
          {experince.length > 0 && <CardsCollections data={experince} type={"trip"} />}
          {effectivenes.length > 0 && <CardsCollections data={gifts} type={"gift"} />}
          {offerVendorData && <VendorOffers offer={offerVendorData} />}
          {effectivenes.length > 0 && <CardsCollections data={effectivenes} type={"effectivene"} />}
          <CardsBooks />
          <BannerHome />
        </ContainerMedia>
      </main>
    </>
  );
};

export default Home;


