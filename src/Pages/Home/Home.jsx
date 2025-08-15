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
const Home = () => {
  const [offerData, setOfferData] = useState(null); // State to store home data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [mostVisited, setMostVisited] = useState(null)
  const [experince, setExperince] = useState(null)
  const [effectivenes, setEffectivenes] = useState(null)
  const { currentLanguage } = useLanguage(); // Get the current language


  useEffect(() => {
    const cacheKey = `homeData_${currentLanguage}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      setMostVisited(parsed.mostVisited);
      setExperince(parsed.experince);
      setEffectivenes(parsed.effectivenes);
      setOfferData(parsed.offerData);
      setLoading(false);
      return;
    }

    const fetchHomeData = async () => {
      try {
        const data = await HomeAPI.getHomeData(currentLanguage);

        const toCache = {
          mostVisited: data.data.most_visited,
          experince: data.data.old_experiences,
          effectivenes: data.data.effectivenes,
          offerData: data.data.offers,
        };

        sessionStorage.setItem(cacheKey, JSON.stringify(toCache));
        setMostVisited(toCache.mostVisited);
        setExperince(toCache.experince);
        setEffectivenes(toCache.effectivenes);
        setOfferData(toCache.offerData);
      } catch (err) {
        setError("Failed to load home data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [currentLanguage]);


  // useEffect(() => {
  //   const fetchHomeData = async () => {
  //     try {
  //       const data = await HomeAPI.getHomeData(currentLanguage); // Fetch data from the API
  //       setMostVisited(data.data.most_visited)
  //       setExperince(data.data.old_experiences)
  //       setEffectivenes(data.data.effectivenes)
  //       setOfferData(data.data.offers)
  //     } catch (err) {
  //       console.error("Error fetching home data:", err);
  //       setError("Failed to load home data. Please try again later.");
  //     } finally {
  //       setLoading(false); // Stop the loading spinner
  //     }
  //   };

  //   fetchHomeData(); // Call the API on component mount
  // }, [currentLanguage]);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
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


