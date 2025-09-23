import React from "react";
import SliderBlogs from "./Components/SliderBlogs/SliderBlogs";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import CardsBlogs from "./Components/CardsBlogs/CardsBlogs";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import content from "../../Components/Languages/translations";
import { useLanguage } from "Components/Languages/LanguageContext";
const Blogs = () => {
  const { currentLanguage } = useLanguage();
  return (
    <>
      <HelmetInfo titlePage={content.navMenu.blog[currentLanguage]} />

      <div className="blogs-page">
        <header>
          {/* ============== START SLIDER BLOGS =========== */}
          {/* <SliderBlogs /> */}
          {/* ============== END SLIDER BLOGS =========== */}
        </header>
        <main>
          {/* ============== START CONTAINER ============ */}
          <ContainerMedia>
            <CardsBlogs />
          </ContainerMedia>
          {/* ============== END CONTAINER ============ */}
        </main>
      </div>
    </>
  );
};

export default Blogs;
