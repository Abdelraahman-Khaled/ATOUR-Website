import React, { useState } from "react";

import CardCollection from "Components/Ui/CardCollection/CardCollection";
import { toast } from "react-toastify";
import imageCard_1 from "../../../../../../assets/images/collection/01.png";
import imageCard_2 from "../../../../../../assets/images/collection/02.png";
import imageCard_3 from "../../../../../../assets/images/collection/03.png";
const AllCardsTripsDetails = () => {
  const dataCollection = [
    {
      id: 0,
      image: imageCard_1,
      infoPlaceCard: "الرياض . السعودية",
      numRate: "4.5",
      title: "سفاري في الرياض",
      numPrice: "53"
    },
    {
      id: 1,
      image: imageCard_2,
      infoPlaceCard: "الرياض . السعودية",
      numRate: "4.4",
      title: "سفاري في الرياض",
      numPrice: "43"
    },
    {
      id: 2,
      image: imageCard_3,
      infoPlaceCard: "الرياض . السعودية",
      numRate: "4.8",
      title: "سفاري في الرياض",
      numPrice: "63"
    }
  ];
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
    <div className="all-cards-trips-details">
      {/* ============ START ALL CARDS COLLECTION ============ */}
      <div className="all-cards-collection">
        {/* =========== START ROW =========== */}
        <div className="row g-3">
          {dataCollection.map((item) => (
            <div className="col-12 col-sm-6 col-md-4" key={item.id}>
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
      </div>
      {/* ============= END ALL CARDS COLLECTION ============= */}
    </div>
  );
};

export default AllCardsTripsDetails;
