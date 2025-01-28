import TabsContent from "Components/Ui/TabsContent/TabsContent";
import AllCardsTripsDetails from "./AllCardsTripsDetails";

const CardsTripsDetails = () => {
  const tabsData = [
    {
      eventKey: "tab1",
      title: <>برامج مشابهه</>,
      content: <AllCardsTripsDetails />
    },
    {
      eventKey: "tab2",
      title: <>البرامج الأكثر تجربة</>,
      content: <AllCardsTripsDetails />
    }
  ];
  return (
    <div className="cards-trips-details margin-top-1">
      <h2 className="title">نرشح لك</h2>
      <TabsContent
        tabsData={tabsData}
        newClassTabsContent={"tabs-details-trips"}
      />
    </div>
  );
};

export default CardsTripsDetails;
