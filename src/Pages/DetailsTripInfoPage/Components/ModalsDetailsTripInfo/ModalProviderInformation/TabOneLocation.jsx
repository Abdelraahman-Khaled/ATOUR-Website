import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";


const TabOneLocation = () => {
  const days = [
    { name: "السبت", time: "7:30 ص - 11:30 م" },
    { name: "الأحد", time: "7:30 ص - 11:30 م" },
    { name: "الاثنين", time: "7:30 ص - 11:30 م" },
    { name: "الثلاثاء", time: "7:30 ص - 11:30 م" },
    { name: "الأربعاء", time: "7:30 ص - 11:30 م" },
    { name: "الخميس", time: "7:30 ص - 11:30 م" },
    { name: "الجمعة", time: "7:30 ص - 11:30 م" }
  ];

  return (
    <div className="all-tab-one-content">
      {/* ========== START ROW ============ */}
      <div className="row g-3">
        {/* ============ START COL ============= */}
        <div className="col-12 col-md-6">
          {/** ============== START MAP CONTENT BOX =============== */}
          <div className="map-content-box--info margin-top-1">
            {/* ============= START ROW ============ */}
            <div className="row  align-items-center">
              {/* ========= START COL ========= */}
              <div className="col-12">
                {/* ========== START CONTENT INFO MAP  ============ */}
                <div className="content-info-map ">
                  <h2 className="title">الموقع</h2>
                  <div className="box-border-circle">
                    <h2 className="title-text">نقطة الإلتقاء</h2>
                    <p className="text">
                      ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                      توليد هذا النص من مولد النص العربى
                    </p>
                  </div>
                </div>
                {/* ========== END CONTENT INFO MAP  ============ */}
              </div>
              {/* ========= END COL ========= */}
              {/* ========= START COL ========= */}
              <div className="col-12">
                <div className="map-box">
                  <MapLocationInfo />
                </div>
              </div>
              {/* ========= END COL ========= */}
            </div>
            {/* ============= END ROW ============ */}
          </div>
          {/** ============== END MAP CONTENT BOX =============== */}
        </div>
        {/* ============ END COL ============= */}
        {/* ============ START COL ============= */}
        <div className="col-12 col-md-6">
          {/* =========== START LEFT TAB CONTENT ============ */}
          <div className="left-tab-content">
            <h2 className="title">مواعيد العمل</h2>
            <div className="details-work">
              <ul className="list-work m-0 p-0 gap-3 d-flex flex-column ">
                {days.map((day, index) => (
                  <li
                    key={index}
                    className="list-one-li d-flex align-items-center gap-2 justify-content-between"
                  >
                    <p className="text--1">{day.name}</p>
                    <p className="text--1">{day.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* =========== END LEFT TAB CONTENT ============ */}
        </div>
        {/* ============ END COL ============= */}
      </div>
      {/* ========== END ROW ============ */}
    </div>
  );
};

export default TabOneLocation;
