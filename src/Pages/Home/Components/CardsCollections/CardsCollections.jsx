import { useState } from "react";
import TitleSection from "Components/TitleSection/TitleSection";
import CardCollection from "Components/Ui/CardCollection/CardCollection";
import PaginationPage from "Components/Pagination/Pagination";
import { toast } from "react-toastify";
import { useLanguage } from "Components/Languages/LanguageContext";
import './CardCollection.css'
import Favicon from "Components/FavIcon/Favicon ";
const CardsCollections = ({ data }) => {

  const { currentLanguage } = useLanguage(); // Get the selected language from context
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 4; // NUMBER OF PAGE ITEMS
  const pageCount = Math.ceil(data.length / perPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const currentPageData = data.slice(offset, offset + perPage);
  const [wishList, setWishList] = useState([]);
  const content = {
    ar: {
      title: "احداث ممتعة",
      text: "في عالم مليء بالفرص والمغامرات، هناك تجارب لا يمكن تفويتها. تجارب تأخذك بعيدًا عن الروتين اليومي، تفتح أمامك أبوابًا جديدة لاكتشاف ذاتك والعالم من حولك. سواء كنت تبحث عن مغامرة تضخ الأدرينالين في عروقك، أو لحظة هدوء تنعش روحك، فإن هذه التجارب مصممة لتبقى محفورة في ذاكرتك إلى الأبد. استعد لتجربة تستحق أن تُروى!",
      addToFavorites: "تم الاضافة الى المفضلة.",
      removeFromFavorites: "تم الأزالة من المفضلة.",
    },
    en: {
      title: "Experiences Worth Trying",
      text: "In a world full of opportunities and adventures, there are experiences that cannot be missed. Experiences that take you far from the daily routine and open new doors to discover yourself and the world around you. Whether you're seeking an adrenaline-pumping adventure or a moment of tranquility to refresh your soul, these experiences are designed to remain etched in your memory forever. Get ready for an experience worth sharing!",
      addToFavorites: "Added to favorites.",
      removeFromFavorites: "Removed from favorites.",
    },
  };

  const { title, text, addToFavorites, removeFromFavorites } =
    content[currentLanguage];

  const addToWishList = (id) => {
    setWishList((prevList) => {
      if (prevList.includes(id)) {
        return prevList.filter((item) => item !== id);
      } else {
        return [...prevList, id];
      }
    });
    if (!wishList.includes(id)) {
      // toast.success(addToFavorites); // Toast for success
    } else {
      // toast.error(removeFromFavorites); // Toast for removal
    }
  };
  return (
    <div className="cards-collections padding-top">
      {/* ============== START TITLE SECTION ============ */}
      <TitleSection title={title} text={text} />
      {/* ============== END TITLE SECTION ============ */}

      {/* ============ START ALL CARDS COLLECTION ============ */}
      <div className="all-cards-collection" data-aos="fade-up">
        <div className="row g-3">
          {currentPageData.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 most-visited" key={item.id}>
              <CardCollection
                itemId={`${item.id}`}
                imageCard={item.cover}
                infoPlaceCard={
                  currentLanguage === "ar"
                    ? `${item.city.country_name} . ${item.city.title}`
                    : `${item.city.title}, ${item.city.country_name}`
                }
                numRate={item.total_rates}
                titleCard={currentLanguage === "ar" ? item.title_ar : item.title_en}
                numPriceCard={`${item.price}$`}
                wishList={wishList}
                addToWishList={addToWishList}
                isFav={item.is_favourit}
              />
            </div>
          ))}
        </div>
        <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default CardsCollections;
