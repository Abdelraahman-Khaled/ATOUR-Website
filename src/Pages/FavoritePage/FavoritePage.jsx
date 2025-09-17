import SliderFavorite from "./Components/SliderFavorite/SliderFavorite";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import CardsFavorite from "./Components/CardsFavorite/CardsFavorite";
import TabsContent from "Components/Ui/TabsContent/TabsContent";
import Tree from "assets/images/IconsHeader/Tree";
import Gift from "assets/images/IconsHeader/Gift";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import FavouritesAPI from "api/favouritesApi";
import Ticket from "assets/images/IconsHeader/Ticket";
import Loader from "Components/Auth/Components/Loader/Loader";
import CardsFavEffective from "./Components/CardsFavorite/CardsFavEffective";
import CardsFavGift from "./Components/CardsFavorite/CardsFavGift";
import { toast } from "react-toastify";

const FavoritePage = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [favData, setFavData] = useState(null); // State to store home data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to manage loading
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await FavouritesAPI.getFavourites(currentLanguage); // Fetch data from the API
        setFavData(data.data); // Set the fetched data to state
      } catch (err) {
        console.error("Error fetching home data:", err);
        toast.error("Failed to load home data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchHomeData(); // Call the API on component mount
  }, [currentLanguage, refresh]);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }
  if (error) {
    return null; // No need to display error here, toast will handle it
  }
  const tabsData = [
    {
      eventKey: "tab1",
      title: (
        <>
          <Tree /> {currentLanguage === "ar" ? "رحلات" : "Trips"}
        </>
      ),
      content: <CardsFavorite data={favData.trips} refresh={handleRefresh} />
    },
    {
      eventKey: "tab2",
      title: (
        <>
          <Ticket /> {currentLanguage === "ar" ? "فعاليات" : "Effectivenes"}
        </>
      ),
      content: <CardsFavEffective data={favData.effectivenes} refresh={handleRefresh} />
    },
    {
      eventKey: "tab3",
      title: (
        <>
          <Gift /> {currentLanguage === "ar" ? "هدايا" : "Gifts"}
        </>
      ),
      content: <CardsFavGift data={favData.gifts} refresh={handleRefresh} />
    }
  ];
  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "المفضلة" : "Favorite"} />

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
