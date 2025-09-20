import PaginationPage from "Components/Pagination/Pagination";
import CardFavorite from "Components/Ui/CardFavorite/CardFavorite";
// import BarsIconToggle from "assets/Icons/BarsIconToggle";
// import MapIcon from "assets/Icons/MapIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "Components/Languages/LanguageContext";


const CardsContentTrips = ({ buttonActiveMap, activeMap, tripsData = [] }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [currentPage_2, setCurrentPage_2] = useState(0);
  const perPage = 5; // NUMBER OF PAGE ITEMS
  const pageCount = Math.ceil(tripsData.length / perPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage_2(selected);
  };
  const offset = currentPage_2 * perPage;
  const currentPageData = tripsData.slice(offset, offset + perPage);

  // ADD TO WISHLIST
  const [wishList_2, setWishList_2] = useState([]);

  const addToWishList = (id) => {
    setWishList_2((prevList) => {
      if (prevList.includes(id)) {
        // CHECK IF CARD ITEM IS INCLUDE SAME ID
        return prevList.filter((item) => item !== id);
      } else {
        return [...prevList, id];
      }
    });
    // ADD TOAST SUCCESS IF TRUE AND ADD ERROR IF NOT TRUE
    if (!wishList_2.includes(id)) {
      toast.success("تم الاضافة الى المفضلة.");
    } else {
      toast.error("تم الأزالة من المفضلة.");
    }
  };
  return (
    <div className="cards-trips-content">

      <div className="header-top-trip-cards d-flex  justify-content-between  align-items-center  flex-wrap  gap-2 mb-3">
        {
          tripsData.length > 0 &&
          <h2 className="title">{currentLanguage === "ar" ? "النتائج" : "Results"} {tripsData.length}</h2>
        }
        {/* <button
          onClick={buttonActiveMap}
          className="btn-main btn-new--1 d-flex  align-items-center  gap-2"
        >
          {!activeMap ? (
            <>
              {" "}
              <MapIcon />
              خريطة
            </>
          ) : (
            <>
              <BarsIconToggle /> عرض قائمة
            </>
          )}
        </button> */}
      </div>
      <div className="main-cards-offers">
        {/* ============= START ROW =========== */}
        <div className="row g-3">
          {currentPageData.length > 0 ? (
            currentPageData.map((item) => {
              return (
                <>
                  {/* ========== START COL =========== */}
                  <div className="col-12 col-sm-6 col-xl-12" key={item.id}>
                    <Link to={`/tripsPage/${item.id}`}>
                      <CardFavorite
                        newClassCard={"card-offer-one"}
                        idCard={item.id}
                        image={item.image}
                        textLocation={item.start_point}
                        titleCard={item.title} // Dynamic title
                        NumPriceNew={`${item.customer_price}`}
                        isTrueNumTwo={false}
                        numInfoDangerOld={false}
                        rateNum={item.total_rates}
                        textContent={item.description} // Dynamic title
                        isTrueTextOneCard_1={item.free_cancelation ? item.free_cancelation : null}
                        textCardOne_1={item.textCardOne_1}
                        isTrueTextOneCard_2={item.pay_later ? item.pay_later : null}
                        textCardOne_2={item.textCardOne_2}
                        // removeFromFavorites={false}
                        isFavoritePage={item.is_favourit}
                        isNewPage={true}
                        wishListCard={wishList_2}
                        addToWishList={addToWishList}
                        type={"trip"}
                        bookingCount={item.booking_count}
                      />
                    </Link>
                  </div>
                  {/* ========== END COL =========== */}
                </>
              );
            })
          ) : (
            <>
              <p className="text-section-api fs-6 fw-medium text-center pt-5">
                {currentLanguage === "ar" ? " لا يوجد جَوْلات  جديدة." : "There are no new experiences."}
                <Link
                  to="/"
                  className="fs-6 fw-medium text-danger text-decoration-underline"
                >
                  {currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"}
                </Link>
              </p>
            </>
          )}
        </div>
        {/* ============= END ROW =========== */}
        {/* ============ START PAGINATION ============= */}
        {
          pageCount > 1 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
        }
        {/* ============ END PAGINATION ============= */}
      </div>
    </div>
  );
};

export default CardsContentTrips;
