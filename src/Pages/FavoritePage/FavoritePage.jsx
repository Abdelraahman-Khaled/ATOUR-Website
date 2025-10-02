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

const translations = {
  en: { trips: "Experiences", events: "Events", gifts: "Products", favorite: "Favorite" },
  ar: { trips: "جولة", events: "فعاليات", gifts: "منتجات", favorite: "المفضلة" },
  fr: { trips: "Expériences", events: "Événements", gifts: "Produits", favorite: "Favoris" },
  de: { trips: "Erlebnisse", events: "Veranstaltungen", gifts: "Produkte", favorite: "Favorit" },
  es: { trips: "Experiencias", events: "Eventos", gifts: "Productos", favorite: "Favorito" },
  tr: { trips: "Deneyimler", events: "Etkinlikler", gifts: "Ürünler", favorite: "Favori" },
  ru: { trips: "Впечатления", events: "События", gifts: "Продукты", favorite: "Избранное" },
  zh: { trips: "体验", events: "活动", gifts: "产品", favorite: "收藏夹" },
  ko: { trips: "체험", events: "이벤트", gifts: "제품", favorite: "즐겨찾기" },
  pt: { trips: "Experiências", events: "Eventos", gifts: "Produtos", favorite: "Favorito" },
  ur: { trips: "تجربات", events: "تقریبات", gifts: "مصنوعات", favorite: "پسندیدہ" },
  ja: { trips: "体験", events: "イベント", gifts: "製品", favorite: "お気に入り" },
};

const FavoritePage = () => {
  const { currentLanguage } = useLanguage();
  const [favData, setFavData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const t = translations[currentLanguage] || translations.en;

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await FavouritesAPI.getFavourites(currentLanguage);
        setFavData(data.data);
      } catch (err) {
        console.error("Error fetching home data:", err);
        toast.error("Failed to load home data. Please try again later.");
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [currentLanguage, refresh]);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }
  if (error) {
    return null;
  }

  const tabsData = [
    {
      eventKey: "tab1",
      title: (
        <>
          <Tree /> {t.trips}
        </>
      ),
      content: <CardsFavorite data={favData.trips} refresh={handleRefresh} />
    },
    {
      eventKey: "tab2",
      title: (
        <>
          <Ticket /> {t.events}
        </>
      ),
      content: <CardsFavEffective data={favData.effectivenes} refresh={handleRefresh} />
    },
    {
      eventKey: "tab3",
      title: (
        <>
          <Gift /> {t.gifts}
        </>
      ),
      content: <CardsFavGift data={favData.gifts} refresh={handleRefresh} />
    }
  ];

  return (
    <>
      <HelmetInfo titlePage={t.favorite} />
      <div className="favorite-page">
        <main>
          <div className="all-content-favorite padding-80">
            <ContainerMedia>
              <TabsContent
                tabsData={tabsData}
                newClassTabsContent={"tabs-favorite"}
              />
            </ContainerMedia>
          </div>
        </main>
      </div>
    </>
  );
};

export default FavoritePage;
