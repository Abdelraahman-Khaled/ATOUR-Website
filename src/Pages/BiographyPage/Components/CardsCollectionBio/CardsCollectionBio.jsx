import { useState } from "react";

import { cardCollection } from "Pages/Home/Components/CardsCollections/DataCollection";
import PaginationPage from "Components/Pagination/Pagination";
import { toast } from "react-toastify";
import CardCollection from "Components/Ui/CardCollection/CardCollection";

const CardsCollectionBio = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 4; // NUMBER OF PAGE ITEMS
  const pageCount = Math.ceil(cardCollection.length / perPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const currentPageData = cardCollection.slice(offset, offset + perPage);

  // ADD TO WISHLIST
  const [wishList, setWishList] = useState([]);

  const addToWishList = (id) => {
    setWishList((prevList) => {
      if (prevList.includes(id)) {
        // CHECK IF CARD ITEM IS INCLUDE SAME ID
        return prevList.filter((item) => item !== id);
      } else {
        return [...prevList, id];
      }
    });
    // ADD TOAST SUCCESS IF TRUE AND ADD ERROR IF NOT TRUE
    if (!wishList.includes(id)) {
      toast.success("تم الاضافة الى المفضلة.");
    } else {
      toast.error("تم الأزالة من المفضلة.");
    }
  };

  return (
    <div className="cards-collections padding-top">
      {/* ============== START TITLE SECTION ============ */}
      <div className="title-section-info--1" data-aos="fade-left">
        <h2 className="title">تجارب تستحق القيام بها</h2>
      </div>
      {/* ============== END TITLE SECTION ============ */}

      {/* ============ START ALL CARDS COLLECTION ============ */}
      <div className="all-cards-collection" data-aos="fade-up">
        {/* =========== START ROW =========== */}
        <div className="row g-3">
          {currentPageData.map((item) => (
            <div className="col-12 col-sm-6 col-md-3" key={item.id}>
              <CardCollection
                itemId={`detailsTripInfoId/${item.id}`}
                imageCard={item.image}
                infoPlaceCard={item.infoPlaceCard}
                numRate={item.numRate}
                titleCard={item.title}
                numPriceCard={`${item.numPrice}$`}
                wishList={wishList}
                addToWishList={addToWishList}
              />
            </div>
          ))}
        </div>
        {/* ============ END ROW =========== */}
        {/* ============ START PAGINATION ============= */}
        <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
        {/* ============ END PAGINATION ============= */}
      </div>
      {/* ============= END ALL CARDS COLLECTION ============= */}
    </div>
  );
};

export default CardsCollectionBio;
