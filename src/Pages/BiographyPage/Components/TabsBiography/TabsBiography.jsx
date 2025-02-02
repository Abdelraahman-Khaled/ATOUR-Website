import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import TabsContent from "Components/Ui/TabsContent/TabsContent";
import Fork from "assets/images/IconsHeader/Fork";
import Hotel from "assets/images/IconsHeader/Hotel";
import Tree from "assets/images/IconsHeader/Tree";
import SliderHeader from "../SliderHeader/SliderHeader";
import FamousLandmarksCards from "../FamousLandmarksCards/FamousLandmarksCards";
import CardsCollectionBio from "../CardsCollectionBio/CardsCollectionBio";
import ExploreBiographyCards from "../ExploreBiography/ExploreBiographyCards";
import NewRates from "../NewRates/NewRates";
import IconBio from "assets/images/IconsBooks/IconBio";
import TripsContent from "Pages/TripsPage/Components/TripsContent/TripsContent";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import AllCardsEvents from "Pages/Events/Components/AllCardsEvents/AllCardsEvents";
import { useLanguage } from "Components/Languages/LanguageContext";
import OffersCards from "Pages/Offers/Components/OffersContent/OffersCards";

const TabsBiography = ({ biography }) => {
  // lang
  const { currentLanguage } = useLanguage(); // Get the current language
  // Normalize data || convert image name to be the same with all trips
  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };
  const normalizedData = normalizeData(biography.trips); // Normalize the data
  const normalizedDataEff = normalizeData(biography.effectivenes); // Normalize the data
  const normalizedDataGift = normalizeData(biography.gifts); // Normalize the data

  const tabsDataBio = [
    {
      eventKey: "tab1",
      title: (
        <>
          <IconBio /> {currentLanguage === "ar" ? "نبذة تعريفية" : "Introduction"}
        </>
      ),
      content: (
        <>

          <SliderHeader biography={biography} />
          {/* <ContainerMedia>
            <FamousLandmarksCards />
            <CardsCollectionBio />
            <ExploreBiographyCards />
            <NewRates />
          </ContainerMedia> */}
        </>
      )
    },
    ...(normalizedData && normalizedData.length > 0
      ? [
        {
          eventKey: "tab2",
          title: (
            <>
              <Tree /> {currentLanguage === "ar" ? "رحلات" : "Trips"}
            </>
          ),
          content: (
            <>
              <ContainerMedia>
                <TripsContent tripsData={normalizedData} />
              </ContainerMedia>
            </>
          ),
        },
      ]
      : []),
    {
      eventKey: "tab3",
      title: (
        <>
          <Ticket /> {currentLanguage === "ar" ? "فعاليات" : "events"}
        </>
      ),
      content: (
        <>
          <ContainerMedia>
            <AllCardsEvents currentLanguage={currentLanguage} eventsData={normalizedDataEff} />
          </ContainerMedia>
        </>
      )
    },
    {
      eventKey: "tab4",
      title: (
        <>
          <Gift /> {currentLanguage === "ar" ? "هدايا تذكارية" : "Souvenirs"}
        </>
      ),
      content: (
        <>
          <ContainerMedia>
            <OffersCards gifts={normalizedDataGift} />
          </ContainerMedia>
        </>
      )
    }
  ];
  return (
    <div className="all-tabs-bio">
      <TabsContent
        tabsData={tabsDataBio}
        newClassTabsContent={"tabs-biography"}
      />
    </div>
  );
};

export default TabsBiography;
