import AosAnimation from "./Components/AosAnimation/AosAnimation";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import routers from "./Routes/Routers";
import ScrollToTopButton from "./Components/ButtonScroll/ButtonScroll";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/swiper-bundle.css";
import "./App.css";
import ToastContainerApp from "Components/ToastContainerApp/ToastContainerApp";
import {
  LanguageProvider,
} from "Components/Languages/LanguageContext";
import {
  CurrencyProvider,
} from "Components/Currencies/CurrencyContext";
// import air from "./assets/images/airplan/02.png";
import { useEffect } from "react";
import { ProfileProvider } from "context/ProfileContext";
import { HomeProvider } from "context/HomeContext";
import { ThemeProvider } from "context/ThemeContext";
// import AdPopup from "./Components/AdPopup/AdPopup";
import WhatsAppButton from "./Components/WhatsAppButton/WhatsAppButton";
import { RatesProvider } from "context/RatesContext";
import { BookingProvider } from "./context/BookingContext";
import FooterProvider from "./context/FooterContext";
import { BiographyProvider } from "context/BiographyContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// AppContent component to use hooks that depend on providers
const AppContent = () => {
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
      {/* {loading === false && <AdPopup />} */}
      {/* <div className={`air-plan  ${isHomePage ? "show" : "hidden"}`}>
      <div className="airPlan-dot" />
        <img src={air} className="object-fit-cover" alt="airplan" />
    </div> */}
      <HelmetProvider>
        <RouterProvider router={routers} />
      </HelmetProvider>
      <ScrollToTopButton />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AosAnimation>
          <LanguageProvider>
            <CurrencyProvider>
              <ProfileProvider>
                <RatesProvider>
                  <BookingProvider>
                    <HomeProvider>
                      <FooterProvider>
                        <BiographyProvider>
                          <AppContent />
                        </BiographyProvider>
                      </FooterProvider>
                    </HomeProvider>
                  </BookingProvider>
                </RatesProvider>
              </ProfileProvider>
            </CurrencyProvider>
          </LanguageProvider>
        </AosAnimation>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
