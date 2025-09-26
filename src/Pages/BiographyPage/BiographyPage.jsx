import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import "./BiographyPage.css";
import TabsBiography from "./Components/TabsBiography/TabsBiography";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import ContentAPI from "api/contentApi";
import { Link, useParams } from "react-router-dom";
import Loader from "Components/Auth/Components/Loader/Loader";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import biographyContent from "./translates";

// 🔹 Translations


const BiographyPage = () => {
  const { id } = useParams();
  const [biography, setBiography] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentLanguage } = useLanguage();
  const { currentCurrency } = useCurrency();

  const t = biographyContent[currentLanguage] || biographyContent.en;

  useEffect(() => {
    const fetchBiography = async () => {
      try {
        const response = await ContentAPI.getCitiesId(id, currentLanguage, currentCurrency);
        const data = response.data;

        if (data) {
          setBiography(data);
        } else {
          setError(t.biographyNotFound);
        }
      } catch (err) {
        console.error("Error fetching biography data:", err);
        setError(t.failedToLoad);
      } finally {
        setLoading(false);
      }
    };

    fetchBiography();
  }, [id, currentLanguage, currentCurrency]);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-section-api fs-6 fw-medium text-center pt-5 d-flex align-items-center justify-content-center" style={{ height: "350px" }}>
        {t.cityNotAvailable}
        <Link
          to="/"
          className="fs-6 fw-medium text-danger text-decoration-underline px-2"
        >
          {t.home}
        </Link>
      </p>
    );
  }

  if (!biography) {
    return (
      <p className="text-section-api fs-6 fw-medium text-center pt-5 d-flex align-items-center justify-content-center" style={{ height: "350px" }}>
        {t.cityDetailsNotAvailable}
        <Link
          to="/"
          className="fs-6 fw-medium text-danger text-decoration-underline px-2"
        >
          {t.home}
        </Link>
      </p>
    );
  }

  return (
    <>
      <HelmetInfo titlePage={biography?.title} />

      <div className="biography-page padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={biography?.title}
            textBreadActive={t.introduction}
          />
        </header>
        <main>
          <TabsBiography biography={biography} />
        </main>
      </div>
    </>
  );
};

export default BiographyPage;
