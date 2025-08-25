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
import { HomeProvider, useHome } from "context/HomeContext";
import ChatBot from "./Components/ChatBot/ChatBot";

// AppContent component to use hooks that depend on providers
const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { loading } = useHome(); // Get loading state from HomeContext
  const location = window.location.pathname;
  const isHomePage = location === "/";
  
  // Keep splash screen visible until loading is complete
  useEffect(() => {
    // Only hide splash when loading is complete
    if (!loading && showSplash) {
      // Wait a bit after loading completes to ensure everything is ready
      const timer = setTimeout(() => {
        // Add fade-out animation before hiding
        const splashElement = document.querySelector('.splash-overlay');
        if (splashElement) {
          splashElement.style.animation = 'fadeOutSplash 0.8s forwards';
          
          setTimeout(() => {
            setShowSplash(false);
          }, 800); // Match the animation duration
        }
      }, 500); // Small delay after loading completes
      
      return () => clearTimeout(timer);
    }
  }, [loading, showSplash]);
  
  // Fallback timer to hide splash screen after 15 seconds even if loading doesn't complete
  // This ensures the splash screen doesn't stay forever if there's a loading issue
  useEffect(() => {
    const timer = setTimeout(() => {
      // Add fade-out animation before hiding
      const splashElement = document.querySelector('.splash-overlay');
      if (splashElement && showSplash) {
        splashElement.style.animation = 'fadeOutSplash 0.5s forwards';
        
        setTimeout(() => {
          setShowSplash(false);
        }, 500); // Match the animation duration
      }
    }, 15000); // Extended maximum time to show splash screen

    return () => clearTimeout(timer);
  }, [showSplash]);
  
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
      <ChatBot />
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
