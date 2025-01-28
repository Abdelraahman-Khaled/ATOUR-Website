import CardExplore from "Components/Ui/CardExplore/CardExplore";
import { dataExplore } from "../Data/DataExplore";
import { useNavigate } from "react-router-dom";

const AllCardsExplore = () => {
  const navigate = useNavigate();
  return (
    <div data-aos="fade-up">
      {/* =========== START ROW =========== */}
      <div className="row g-3">
        {dataExplore.map((item) => {
          return (
            <>
              {/* ============ START COL ============= */}
              <div
                onClick={() => {
                  navigate("/natureDventuresPage");
                }}
                key={item.id}
                className="col-12 col-md-6"
              >
                <CardExplore image={item.image} title={item.title} />
              </div>
              {/* ============ END COL ============= */}
            </>
          );
        })}
      </div>
      {/* =========== END ROW =========== */}
    </div>
  );
};

export default AllCardsExplore;
