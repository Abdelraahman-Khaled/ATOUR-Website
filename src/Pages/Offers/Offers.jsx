import React, { useEffect, useState } from "react";
import SliderOffers from "./Components/SliderOffers/SliderOffers";
import OffersContent from "./Components/OffersContent/OffersContent";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./Offers.css"
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import ContentAPI from "api/contentApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import Loader from "Components/Auth/Components/Loader/Loader";
import { toast } from "react-toastify";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import FilterByCategory from "Components/Ui/FilterCards/Components/FilterByCategory";
import FilterCards from "Components/Ui/FilterCards/FilterCards";
import FilterTripsContent from "Pages/TripsPage/Components/TripsContent/FilterTripsContent";
import GeneralAPI from "api/generalApi";
import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
const translates = {
  en: {
    products: "Products",
    noProducts: "No products available at the moment",
  },
  ar: {
    products: "المنتجات",
    noProducts: "لا توجد منتجات متاحة حاليا",
  },
  fr: {
    products: "Produits",
    noProducts: "Aucun produit disponible pour le moment",
  },
  es: {
    products: "Productos",
    noProducts: "No hay productos disponibles en este momento",
  },
  de: {
    products: "Produkte",
    noProducts: "Derzeit keine Produkte verfügbar",
  },
  it: {
    products: "Prodotti",
    noProducts: "Nessun prodotto disponibile al momento",
  },
  zh: {
    products: "产品",
    noProducts: "目前没有可用的产品",
  },
  ja: {
    products: "製品",
    noProducts: "現在利用可能な製品はありません",
  },
  ko: {
    products: "제품",
    noProducts: "현재 사용 가능한 제품이 없습니다",
  },
  ru: {
    products: "Продукты",
    noProducts: "В данный момент нет доступных продуктов",
  }
}
const Offers = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { currentCurrency } = useCurrency()
  // fetching states
  const [gifts, setGifts] = useState([]); // State to store home data
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);

  const handleSelectSubCategory = (subCategoryIds) => {
    setSelectedSubCategoryIds(subCategoryIds);
  };

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await GeneralAPI.getSubCategories();
        setSubCategories(response.data.gifts);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  // Fetching Data
  useEffect(() => {
    const fetchGiftsData = async () => {
      try {
        const params = {};
        if (selectedSubCategoryIds.length > 0) {
          selectedSubCategoryIds.forEach((id, index) => {
            params[`sub_category_id[${index}]`] = id;
          });
        }
        const data = await ContentAPI.getGifts(currentLanguage, currentCurrency, params); // Fetch data from the API
        setGifts(data.data); // Set the fetched data to 
      } catch (err) {
        console.error("Error fetching products data:", err);
        toast.error("Failed to load products data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };
    fetchGiftsData(); // Call the API on component mount
  }, [currentLanguage, currentCurrency, selectedSubCategoryIds]);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return null; // No need to display error here, toast will handle it
  }
  return (
    <>
      <HelmetInfo titlePage={translates[currentLanguage].products} />

      <div className="offers-page padding-60">
        <header className="mb-4">
          {/* <SliderOffers /> */}
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={null}
            textBreadActive={currentLanguage === "ar" ? "منتجات" : "Products"}
          />
        </header>
        <main>
          {/* ============== START CONTAINER ============== */}
          <ContainerMedia>
            <div className="trips-content--info">
              <FilterTripsContent activeMap={false} subCategories={subCategories} onSelectSubCategory={handleSelectSubCategory} />
              <OffersContent gifts={gifts} />
            </div>
          </ContainerMedia>
          {/* ============== END CONTAINER ============== */}
        </main>
      </div>
    </>
  );
};

export default Offers;
