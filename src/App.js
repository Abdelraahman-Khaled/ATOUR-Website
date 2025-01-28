import AosAnimation from "./Components/AosAnimation/AosAnimation";
import WindowLoader from "./Components/WindowLoader/WindowLoader";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routers";
import ScrollToTopButton from "./Components/ButtonScroll/ButtonScroll";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/swiper-bundle.css";
import "./App.css";
import ToastContainerApp from "Components/ToastContainerApp/ToastContainerApp";
import { LanguageProvider } from "Components/Languages/LanguageContext";
import air from "./assets/images/airplan/02.png";
function App() {
  // SHOW LOCATION PAGE TO SHOW ONLY IN HOME PAGE
  const location = window.location.pathname;
  const isHomePage = location === "/";
  return (
    <AosAnimation>
      <LanguageProvider>
        <div className={`App`}>
          <WindowLoader />
          <ToastContainerApp />
          <div className={`air-plan  ${isHomePage ? "show" : "hidden"}`}>
            <div className="airPlan-dot" />
            {/* <img src={air} className="object-fit-cover" alt="airplan" /> */}
          </div>
          <HelmetProvider>
            <RouterProvider router={routers} />
          </HelmetProvider>
          <ScrollToTopButton />
        </div>
      </LanguageProvider>
    </AosAnimation>
  );
}

export default App;
