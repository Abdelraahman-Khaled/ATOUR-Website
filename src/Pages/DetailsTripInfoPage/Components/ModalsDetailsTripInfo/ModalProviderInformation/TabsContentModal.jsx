import TabsContent from "Components/Ui/TabsContent/TabsContent";
import TabOneLocation from "./TabOneLocation";
import ProgressBarRates from "Components/Ui/ProgressBarRates/ProgressBarRates";
import AllRatesComments from "../../AllContentInfoDetailsMiddel/ContentInfoDetailsRight/RatesComments/AllRatesComments";
import TabContentThree from "./TabContentThree";

const TabsContentModal = () => {
  const tabsData = [
    {
      eventKey: "tab--1",
      title: <>معلومات</>,
      content: <TabOneLocation />
    },
    {
      eventKey: "tab--2",
      title: <>تقييمات</>,
      content: (
        <>
          <ProgressBarRates />

          <AllRatesComments />
        </>
      )
    },
    {
      eventKey: "tab--3",
      title: <>جميع البرامج</>,
      content: (
        <>
          <TabContentThree />
        </>
      )
    }
  ];

  return (
    <div className="all-tabs-modal mt-3">
      <TabsContent
        tabsData={tabsData}
        newClassTabsContent={"tabs-content-modal"}
      />
    </div>
  );
};

export default TabsContentModal;
