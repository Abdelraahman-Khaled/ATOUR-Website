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
import Loader from "Components/Auth/Components/Loader/Loader";
import SplashScreen from "Components/SplashScreen/SplashScreen";
const Home = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { homeData, loading, error } = useHome(); // Use the HomeContext

  // Extract data from homeData if it exists
  const mostVisited = homeData?.most_visited || [];
  const experince = homeData?.old_experiences || [];
  const effectivenes = homeData?.effectivenes || [];
  const offerData = homeData?.offers || null;


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
    return <div className="text-center">لا توجد بيانات متاحة</div>;
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
          {mostVisited.length > 0 && <ImagesCard mostVisited={mostVisited} />}
          {experince.length > 0 && <CardsCollections data={experince} type={"trip"} />}
          {effectivenes.length > 0 && <CardsCollections data={effectivenes} type={"effectivene"} />}
          {offerData && <OneOffer offer={offerData} />}
          <BannerHome />
        </ContainerMedia>
      </main>
    </>
  );
};

export default Home;


