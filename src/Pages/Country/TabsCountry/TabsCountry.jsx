import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import TabsContent from "Components/Ui/TabsContent/TabsContent";
import Tree from "assets/images/IconsHeader/Tree";
import IconBio from "assets/images/IconsBooks/IconBio";
import TripsContent from "Pages/TripsPage/Components/TripsContent/TripsContent";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import AllCardsEvents from "Pages/Events/Components/AllCardsEvents/AllCardsEvents";
import { useLanguage } from "Components/Languages/LanguageContext";
import OffersCards from "Pages/Offers/Components/OffersContent/OffersCards";
import SliderHeader from "Pages/BiographyPage/Components/SliderHeader/SliderHeader";

const TabsCountry = ({ country }) => {
  // lang
  const { currentLanguage } = useLanguage(); // Get the current language

  // Normalize data || convert image name to be the same with all trips
  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };
  const normalizedData = normalizeData(country?.trips); // Normalize the data
  const normalizedDataEff = normalizeData(country?.effectivenes); // Normalize the data
  const normalizedDataGift = normalizeData(country?.gifts); // Normalize the data
  const tabsDataBio = [
    {
      eventKey: "tab1",
      title: (
        <>
          <Tree /> {currentLanguage === "ar" ? "جَوْلات" : "Experiences"}
        </>
      ),
      content: (
        <>
          <ContainerMedia>
            <></>
            {/* <TripsContent tripsData={normalizedData} /> */}
          </ContainerMedia>
        </>
      ),
    },

    ,
    {
      eventKey: "tab2",
      title: (
        <>
          <Ticket /> {currentLanguage === "ar" ? "فعاليات" : "events"}
        </>
      ),
      content: (
        <>
          <ContainerMedia>
            <></>
            {/* <AllCardsEvents currentLanguage={currentLanguage} eventsData={normalizedDataEff} className={"p-0"} /> */}
          </ContainerMedia>
        </>
      )
    },
    {
      eventKey: "tab3",
      title: (
        <>
          <Gift /> {currentLanguage === "ar" ? "هدايا تذكارية" : "Souvenirs"}
        </>
      ),
      content: (
        <>
          <ContainerMedia>
            {/* <OffersCards gifts={normalizedDataGift} /> */}
            <></>
          </ContainerMedia>
        </>
      )
    }
  ];
  return (
    <div className="all-tabs-bio">


      <SliderHeader biography={country} />

      <ContainerMedia>
        <div className="padding-60">
          <TabsContent
            tabsData={tabsDataBio}
            newClassTabsContent={"tabs-biography"}
          />

        </div>
      </ContainerMedia>

    </div>
  );
};

export default TabsCountry;
