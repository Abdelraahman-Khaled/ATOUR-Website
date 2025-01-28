import ContentAPI from "api/contentApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import PaginationPage from "Components/Pagination/Pagination";
import CardFavorite from "Components/Ui/CardFavorite/CardFavorite";
import { cardsFavoriteData } from "Pages/FavoritePage/Components/CardsFavorite/Data/DataCardFavorite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OffersCards = ({ gifts }) => {
  // image
  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };
  const normalizedData = normalizeData(gifts); // Normalize the data
  // lang
  const { currentLanguage } = useLanguage(); // Get the current language
  const [currentPage_2, setCurrentPage_2] = useState(0);
  const perPage = 5; // NUMBER OF PAGE ITEMS
  const pageCount = Math.ceil(normalizedData.length / perPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage_2(selected);
  };
  const offset = currentPage_2 * perPage;
  const currentPageData = normalizedData.slice(offset, offset + perPage);

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
    <div className="main-cards-offers" data-aos="fade-right">
      {/* ============= START ROW =========== */}
      <div className="row g-3">
        {currentPageData.length > 0 ? (
          currentPageData.map((item) => {
            return (
              <>
                {/* ========== START COL =========== */}
                <div className="col-12 col-sm-6 col-xl-12" key={item.id}>
                  <Link to={`/gifts/${item.id}`}>
                    <CardFavorite
                      newClassCard={"card-offer-one"}
                      idCard={item.id}
                      image={item.image}
                      textLocation={item.location || " السعودية"}
                      titleCard={item.title}
                      NumPriceNew={`${item.price} ${currentLanguage === "ar" ? "ريال" : "SAR"}`}
                      isTrueNumTwo={false}
                      numInfoDangerOld={"70 SAR"}
                      rateNum={item.rate}
                      textContent={item.description}
                      isTrueTextOneCard_1={item.free_cancelation ? item.free_cancelation : null}
                      textCardOne_1={item.textCardOne_1}
                      isTrueTextOneCard_2={item.pay_later ? item.free_cancelation : null}
                      textCardOne_2={item.textCardOne_2}
                      removeFromFavorites={false}
                      isFavoritePage={false}
                      isNewPage={true}
                      wishListCard={wishList_2}
                      addToWishList={addToWishList}
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

              {currentLanguage === "ar" ? "لا يوجد عروض جديدة." : "There are no new offers."}

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
      {currentPageData.length > 5 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />}

      {/* ============ END PAGINATION ============= */}
    </div>
  );
};

export default OffersCards;