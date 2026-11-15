import { lazy, Suspense } from "react";
import ScrollToTopPage from "Components/ScrollToTopPage/ScrollToTopPage";
import Footer from "../../Components/Footer/Footer";
import NavbarMenu from "../../Components/NavbarMenu/NavbarMenu";

import { Outlet } from "react-router-dom";

// Floating widget: load it after the page instead of in the main bundle
const ChatBot = lazy(() => import("../../Components/ChatBot/ChatBot"));

const Layout = () => {
  return (
    <>
      <NavbarMenu />
      <Outlet />
      <ScrollToTopPage />
      <Footer />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </>
  );
};

export default Layout;
