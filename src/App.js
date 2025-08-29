import AosAnimation from "./Components/AosAnimation/AosAnimation";
import SplashScreen from "./Components/SplashScreen/SplashScreen";
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
// import air from "./assets/images/airplan/02.png";
import { useEffect, useState } from "react";
import { ProfileProvider } from "context/ProfileContext";
import { HomeProvider, useHome } from "context/HomeContext";
import ChatBot from "./Components/ChatBot/ChatBot";
import AdPopup from "./Components/AdPopup/AdPopup";

// AppContent component to use hooks that depend on providers
const AppContent = () => {
  const { loading } = useHome(); // Use the HomeContext
  const location = window.location.pathname;
  const isHomePage = location === "/";

  // SHOW LOCATION PAGE TO SHOW ONLY IN HOME PAGE
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className={`App`}>
      {/* <WindowLoader /> */}
      <ToastContainerApp />
      {loading === false && <AdPopup />}
      {/* <div className={`air-plan  ${isHomePage ? "show" : "hidden"}`}>
      <div className="airPlan-dot" />
        <img src={air} className="object-fit-cover" alt="airplan" />
    </div> */}
      <HelmetProvider>
        <RouterProvider router={routers} />
        <SplashScreen />
      </HelmetProvider>
      <ScrollToTopButton />
    </div>
  );
};

function App() {
  return (
    <AosAnimation>
      <LanguageProvider>
        <ProfileProvider>
          <HomeProvider>
            <AppContent />
          </HomeProvider>
        </ProfileProvider>
      </LanguageProvider>
    </AosAnimation>
  );
}

export default App;
