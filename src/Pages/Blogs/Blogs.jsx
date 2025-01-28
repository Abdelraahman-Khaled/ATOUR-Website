import React from "react";
import SliderBlogs from "./Components/SliderBlogs/SliderBlogs";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import CardsBlogs from "./Components/CardsBlogs/CardsBlogs";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";

const Blogs = () => {
  return (
    <>
      <HelmetInfo titlePage={"المدونة"} />

      <div className="blogs-page">
        <header>
          {/* ============== START SLIDER BLOGS =========== */}
          <SliderBlogs />
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
