import React from "react";
import SliderNature from "./Components/SliderNature/SliderNature";
import ContentNatureInfo from "./Components/ContentNatureInfo/ContentNatureInfo";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./NatureDventuresPage.css"
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
const NatureDventuresPage = () => {
  return (
   <>
   <HelmetInfo titlePage={"الطبيعة والمغامرات"} />

     <div className="nature-adventures-page">
       {/* ============  START HEADER  ============== */}
       <header>
         <SliderNature />
       </header>
       {/* ============  END HEADER  ============== */}
       {/* ============ START MAIN =============== */}
       <main>
         <ContainerMedia>
           <ContentNatureInfo />
           
         </ContainerMedia>
       </main>
       {/* ============ END MAIN =============== */}
     </div>
   </>
  );
};

export default NatureDventuresPage;
