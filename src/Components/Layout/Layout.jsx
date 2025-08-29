import ScrollToTopPage from "Components/ScrollToTopPage/ScrollToTopPage";
import Footer from "../../Components/Footer/Footer";
import NavbarMenu from "../../Components/NavbarMenu/NavbarMenu";
import ChatBot from "../../Components/ChatBot/ChatBot";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavbarMenu />
      <Outlet />
      <ScrollToTopPage />
      <Footer />
      <ChatBot />
    </>
  );
};

export default Layout;
