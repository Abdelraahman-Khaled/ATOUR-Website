import TitleSection from "Components/TitleSection/TitleSection";
import CardBook from "./CardBook";
import "./CardsBooks.css";
import { cardsBooks } from "./DataCard";
const CardsBooks = () => {
  return (
    <div className="cards-books padding-top">
      {/* =========== START SECTION TITLE ========== */}
      <TitleSection
        title={"الوجهات الأكثر زيارة"}
        text={
          "ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق."
        }
      />
      {/* =========== END SECTION TITLE ============ */}
      {/* ============ START ALL CARDS BOOKS =========== */}
      <div className="all-cards-books" data-aos="fade-right">
        {/* ============= START ROW ============= */}
        <div className="row g-3">
          {cardsBooks.map((item) => {
            return (
              <>
                {/* ============ START COL ============ */}
                <div className="col-12 col-sm-6 col-md-4">
                  <CardBook
                    iconCard={item.icon}
                    titleCard={item.title}
                    textCard={item.text}
                  />
                </div>
                {/* ============ END COL ============ */}
              </>
            );
          })}
        </div>
        {/* ============= END ROW ============= */}
      </div>
      {/* ============ END ALL CARDS BOOKS =========== */}
    </div>
  );
};

export default CardsBooks;
