import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HeaderCard from "./Components/HeaderCard/HeaderCard";
import ImagesCard from "./Components/ImagesCard/ImagesCard";
import CardsCollections from "./Components/CardsCollections/CardsCollections";
import BannerHome from "./Components/BannerHome/BannerHome";
import Slider from "./Components/Slider/Slider";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import HomeAPI from "api/homeApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import OneOffer from "./Components/OneOffer/OneOffer";
import LoaderSvg from "assets/Icons/LoaderSvg";
const Home = () => {
  const [homeData, setHomeData] = useState(null); // State to store home data
  const [offerData, setOfferData] = useState(null); // State to store home data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [mostVisited, setMostVisited] = useState(null)
  const [experince, setExperince] = useState(null)
  const [effectivenes, setEffectivenes] = useState(null)
  const { currentLanguage } = useLanguage(); // Get the current language

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await HomeAPI.getHomeData(currentLanguage); // Fetch data from the API
        setHomeData(data); // Set the fetched data to state
        setMostVisited(data.data.most_visited)
        setExperince(data.data.old_experiences)
        setEffectivenes(data.data.effectivenes)
        setOfferData(data.data.offer)
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError("Failed to load home data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchHomeData(); // Call the API on component mount
  }, [currentLanguage]);

  if (loading) {
    return (
      <div className="text-center m-4">
        <span style={{ scale: "2" }}>
          <LoaderSvg />
        </span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }
  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}/>
      <header>
        <Slider />
      </header>
      <main>
        <ContainerMedia>
          <HeaderCard />
          {mostVisited && <ImagesCard mostVisited={mostVisited} />}
          {experince && <CardsCollections data={experince} />}
          {offerData.active && <OneOffer offer={offerData} />}
          {effectivenes.length > 0 && <CardsCollections data={effectivenes} />}
          <BannerHome />
        </ContainerMedia>
      </main>
    </>
  );
};

export default Home;


