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
// import air from "./assets/images/airplan/02.png";
import { useEffect, useState } from "react";
import { ProfileProvider } from "context/ProfileContext";
function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);
  // SHOW LOCATION PAGE TO SHOW ONLY IN HOME PAGE
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  const location = window.location.pathname;
  const isHomePage = location === "/";

  return (
    <AosAnimation>
      <LanguageProvider>
        <ProfileProvider>
          <div className={`App`}>
            {/* <WindowLoader /> */}
            <ToastContainerApp />
            {/* <div className={`air-plan  ${isHomePage ? "show" : "hidden"}`}>
            <div className="airPlan-dot" />
              <img src={air} className="object-fit-cover" alt="airplan" /> 
          </div> */}

            <HelmetProvider>
              <RouterProvider router={routers} />

              {showSplash && (
                <div className="splash-overlay">
                  <img
                    src="/icon/ico.svg" // Replace with your actual logo path
                    alt="Logo"
                    className="splash-logo"
                  />
                </div>
              )}
            </HelmetProvider>
            <ScrollToTopButton />
          </div>
        </ProfileProvider>
      </LanguageProvider>
    </AosAnimation>
  );
}

export default App;
