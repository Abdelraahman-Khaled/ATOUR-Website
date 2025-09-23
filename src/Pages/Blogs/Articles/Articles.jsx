import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import CardsArticles from "./CardsArticals";
import content from "../../../Components/Languages/translations";



const Articles = () => {
  const { currentLanguage } = useLanguage();
  return (
    <>
      <HelmetInfo titlePage={content.navMenu.articles[currentLanguage]} />

      <div className="blogs-page">
        <header>
          {/* ============== START SLIDER BLOGS =========== */}
          {/* <SliderArticles /> */}
          {/* ============== END SLIDER BLOGS =========== */}
        </header>
        <main>
          {/* ============== START CONTAINER ============ */}
          <ContainerMedia>
            <CardsArticles />
          </ContainerMedia>
          {/* ============== END CONTAINER ============ */}
        </main>
      </div>
    </>
  );
};

export default Articles;
