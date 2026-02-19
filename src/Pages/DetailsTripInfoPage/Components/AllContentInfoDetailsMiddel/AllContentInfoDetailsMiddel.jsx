
import ContentInfoDetailsRight from "./ContentInfoDetailsRight/ContentInfoDetailsRight";
import ContentInfoDetailsLeft from "./ContentInfoDetailsLeft/ContentInfoDetailsLeft";

const AllContentInfoDetailsMiddel = ({ tripData }) => {
  return (
    <div className="all-content-info-details-middel pt-5">
      {/* ============== START ROW =============== */}
      <div className="row gy-5 g-md-3 flex-column-reverse flex-lg-row">


        {/* =============== START COL ============= */}
        <div className="col-12 col-lg-8">
          <ContentInfoDetailsRight tripData={tripData} />
        </div>
        {/* =============== END COL ============= */}



        {/* =============== START COL ============= */}
        <div className="col-12 col-lg-4">
          <ContentInfoDetailsLeft tripData={tripData} />
        </div>
        {/* =============== END COL ============= */}





      </div>
      {/* ============== END ROW =============== */}
    </div>
  );
};

export default AllContentInfoDetailsMiddel;
