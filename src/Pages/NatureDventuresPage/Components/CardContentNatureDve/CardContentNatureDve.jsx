import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import { cardCollection } from "Pages/Home/Components/CardsCollections/DataCollection";
import { toast } from "react-toastify";
import { useState } from "react";
import CardCollection from "Components/Ui/CardCollection/CardCollection";

const CardContentNatureDve = () => {
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
    <div className="cards-content-nature-dve  padding-60">
      <h2 className="title-info-card" data-aos="fade-left">تجارب تستحق القيام بها</h2>
      <div className="all-cards-swiper" data-aos="fade-up">
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          className="mySwiper"
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1
            },

            650: {
              slidesPerView: 2
            },
            767: {
              slidesPerView: 3
            },

            1200: {
              slidesPerView: 4
            }
          }}
        >
          {cardCollection.map((item) => {
            return (
              <SwiperSlide key={item.id}>
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CardContentNatureDve;
