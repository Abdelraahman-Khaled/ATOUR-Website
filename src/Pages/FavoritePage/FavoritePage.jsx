import SliderFavorite from "./Components/SliderFavorite/SliderFavorite";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import CardsFavorite from "./Components/CardsFavorite/CardsFavorite";
import TabsContent from "Components/Ui/TabsContent/TabsContent";
import Tree from "assets/images/IconsHeader/Tree";
import Hotel from "assets/images/IconsHeader/Hotel";
import Fork from "assets/images/IconsHeader/Fork";
import Gift from "assets/images/IconsHeader/Gift";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import FavouritesAPI from "api/favouritesApi";
import LoaderSvg from "assets/Icons/LoaderSvg";

const FavoritePage = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [favData, setFavData] = useState(null); // State to store home data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to manage loading
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await FavouritesAPI.getFavourites(); // Fetch data from the API
        setFavData(data.data); // Set the fetched data to state
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
  const tabsData = [
    {
      eventKey: "tab1",
      title: (
        <>
          <Tree /> رحلات
        </>
      ),
      content: <CardsFavorite data={favData.trips} />
    },
    {
      eventKey: "tab2",
      title: (
        <>
          <Hotel /> فعاليات
        </>
      ),
      content: <CardsFavorite data={favData.effectivenes} />
    },
    {
      eventKey: "tab3",
      title: (
        <>
          <Gift /> هدايا تذكارية
        </>
      ),
      content: <CardsFavorite data={favData.gifts} />
    }
  ];
  return (
    <>
      <HelmetInfo titlePage={"المفضلة"} />

      <div className="favorite-page">
        <header>
          <SliderFavorite />
        </header>
        <main>
          <div className="all-content-favorite padding-80">
            {/* ========== START CONTAINER =========== */}
            <ContainerMedia>
              <TabsContent
                tabsData={tabsData}
                newClassTabsContent={"tabs-favorite"}
              />
            </ContainerMedia>
            {/* ========== END CONTAINER =========== */}
          </div>
        </main>
      </div>
    </>
  );
};

export default FavoritePage;
