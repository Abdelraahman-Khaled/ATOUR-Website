import { useLanguage } from "Components/Languages/LanguageContext";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";

const MapContentBox = ({ tripData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  // Define bilingual content
  const content = {
    title: {
      ar: "من أين ستبدأ رحلتك",
      en: "Where Will Your Journey Start",
    },
    meetingPoint: {
      ar: "نقطة الإلتقاء",
      en: "Meeting Point",
    },
    endPoint: {
      ar: "نقطة الانتهاء",
      en: "End Point",
    },
  };

  return (
    <div className="map-content-box--info margin-top-1">
      {/* ============= START ROW ============ */}
      <div className="row g-3 align-items-center">
        {/* ========= START COL ========= */}
        <div className="col-12 col-md-7">
          {/* ========== START CONTENT INFO MAP  ============ */}
          <div className="content-info-map">
            {/* Title */}
            <h2 className="title">{content.title[currentLanguage]}</h2>

            {/* Meeting Point */}
            <div className="box-border-circle">
              <h2 className="title-text">{content.meetingPoint[currentLanguage]}</h2>
              <p className="text">{tripData.start_point}</p>
            </div>
            {/* steps */}
            {/* <h2 className="title-text">{content.meetingPoint[currentLanguage]}</h2> */}
            {tripData.steps_list.map((item) => (
              <div className="box-border-circle">
                <p className="text">{item}</p>
              </div>
            )
            )}
            {/* End Point */}
            <div className="box-border-circle">
              <h2 className="title-text">{content.endPoint[currentLanguage]}</h2>
              <p className="text">{tripData.end_point}</p>
            </div>
          </div>
          {/* ========== END CONTENT INFO MAP  ============ */}
        </div>
        {/* ========= END COL ========= */}

        {/* ========= START COL ========= */}
        <div className="col-12 col-md-5">
          <div className="map-box">
            <MapLocationInfo tripData={tripData} />
          </div>
        </div>
        {/* ========= END COL ========= */}
      </div>
      {/* ============= END ROW ============ */}
    </div>
  );
};

export default MapContentBox;