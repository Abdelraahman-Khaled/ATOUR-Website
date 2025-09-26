import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import React, { useEffect, useState } from "react";
import TripsContent from "./Components/TripsContent/TripsContent";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import ModalSelectDestination from "Components/Ui/ModalSelectDestination/ModalSelectDestination";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import ContentAPI from "api/contentApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";
import Loader from "Components/Auth/Components/Loader/Loader";
import { useCurrency } from "Components/Currencies/CurrencyContext";


const text = {
  ar: {
    noData: "لا يوجد بيانات متاحة.",
    home: "الصفحة الرئيسية",
  },
  en: {
    noData: "No data available.",
    home: "Home",
  },
  fr: {
    noData: "Aucune donnée disponible.",
    home: "Accueil",
  },
  de: {
    noData: "Keine Daten verfügbar.",
    home: "Startseite",
  },
  es: {
    noData: "No hay datos disponibles.",
    home: "Inicio",
  },
  tr: {
    noData: "Veri bulunmamaktadır.",
    home: "Ana Sayfa",
  },
  ru: {
    noData: "Данные недоступны.",
    home: "Главная",
  },
  zh: {
    noData: "没有可用数据。",
    home: "首页",
  },
  ko: {
    noData: "데이터가 없습니다.",
    home: "홈",
  },
  pt: {
    noData: "Nenhum dado disponível.",
    home: "Início",
  },
  ur: {
    noData: "کوئی ڈیٹا دستیاب نہیں ہے۔",
    home: "ہوم",
  },
  ja: {
    noData: "利用可能なデータがありません。",
    home: "ホーム",
  },
};

const TripsPage = () => {
  const { currentLanguage } = useLanguage(); // Access current language
  const { currentCurrency } = useCurrency();
  const [tripsData, setTripsData] = useState([]); // State to store home data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
  console.log(tripsData);

  // SHOW MODAL SELECT DESTINATION
  const [showModalSelectDestination, setShowModalSelectDestination] = useState(false);
  // SHOW MODAL ADD TRIP
  const buttonShowModal = () => {
    setShowModalSelectDestination(true);
  };
  const hideModalSelectDestination = () => {
    setShowModalSelectDestination(false);
  };

  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };

  const handleSelectSubCategory = (subCategoryIds) => {
    setSelectedSubCategoryIds(subCategoryIds);
  };

  // feching the Data
  useEffect(() => {
    const fetchTripsData = async () => {
      try {
        const params = {};
        if (selectedSubCategoryIds.length > 0) {
          selectedSubCategoryIds.forEach((id, index) => {
            params[`sub_category_id[${index}]`] = id;
          });
        }
        const data = await ContentAPI.getTrips(currentLanguage, currentCurrency, params); // Fetch data from the API
        const normalizedData = normalizeData(data.data); // Normalize the data

        setTripsData(normalizedData); // Set the fetched data to state
      } catch (err) {
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };
    fetchTripsData(); // Call the API on component mount
  }, [currentLanguage, currentCurrency, selectedSubCategoryIds]);

  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "الجولات" : "Experinces"} />

      <ModalSelectDestination
        showModalSelectDestination={showModalSelectDestination}
        hideModalSelectDestination={hideModalSelectDestination}
      />
      <div className="trips-page-info padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={null}
            textBreadActive={currentLanguage === "ar" ? "الجولات" : "Experinces"}
          />
        </header>
        <main>
          <ContainerMedia>
            <div className="mt-4">
              {loading ? (
                <div style={{ margin: "200px 0px" }}>
                  <Loader />
                </div>
              ) : tripsData.length > 0 ? (
                <TripsContent tripsData={tripsData} onSelectSubCategory={handleSelectSubCategory} />
              ) : (
                <div className="d-flex justify-content-center ">
                  <div className="no-data-text">
                    {currentLanguage === "ar"
                      ? "لا توجد جولات متاحة"
                      : "No experinces available"}
                    <Link
                      to="/"
                      className="fs-6 fw-medium text-danger text-decoration-underline px-2"
                    >
                      {text[currentLanguage].home}
                    </Link>
                  </div>

                </div>
              )}
            </div>
          </ContainerMedia>
        </main>
      </div>
    </>
  );
};

export default TripsPage;
