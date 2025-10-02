import { Outlet, createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Layout from "../Components/Layout/Layout";
import NotFound from "../Pages/NotFound/NotFound";
import FavoritePage from "Pages/FavoritePage/FavoritePage";
import NotificationPage from "../Pages/NotificationPage/NotificationPage";
import Blogs from "Pages/Blogs/Blogs";
import DetailsBlogCard from "Pages/Blogs/Components/DetailsBlogCard/DetailsBlogCard";
import Events from "Pages/Events/Events";
import DetailsCardEvent from "Pages/Events/Components/DetailsCardEvent/DetailsCardEvent";
import Offers from "../Pages/Offers/Offers";
import AccountUser from "../Pages/AccountUser/AccountUser";
import Reservations from "Pages/Reservations/Reservations";
import BiographyPage from "Pages/BiographyPage/BiographyPage";
import TripsPage from "Pages/TripsPage/TripsPage";
import NatureDventuresPage from "Pages/NatureDventuresPage/NatureDventuresPage";
import PayConfirmPage from "../Pages/PayConfirmPage/PayConfirmPage";
import DetailsTripInfoPage from "Pages/DetailsTripInfoPage/DetailsTripInfoPage";
import GiftDetail from "Components/Ui/Gifts/GiftDetail";
import TermsConditions from "../Pages/TermsConditions/TermsConditions";
import FaqPage from "../Pages/Faq/FaqPage";
import News from "../Pages/News/News";
import NewsDetails from "../Pages/News/Components/NewsDetails/NewsDetails";
import Rewards from "../Pages/Rewards/Rewards";
import ContactUsPage from "../Pages/ContactUs/ContactUsPage";
import Articles from "Pages/Blogs/Articles/Articles";
import Country from "Pages/Country/Country";
import ArticalsDetails from "Pages/Blogs/Articles/ArticalsDetails";
import AboutUs from "Pages/AboutUs/AboutUs";
import Help from "Pages/Help/Help";

let routers = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            { index: true, element: <Home /> },
            {
              path: "detailsTripInfoId/:detailsTripInfo",
              element: <DetailsTripInfoPage />,
            },
          ],
        },
        {
          path: "favoritePage",
          element: (
            <>
              <FavoritePage />
            </>
          ),
        },
        {
          path: "blogsPage",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            { path: "", element: <Blogs /> },
            { path: ":idCardDetailsBlog", element: <DetailsBlogCard /> },
          ],
        },
        {
          path: "eventsPage",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            { path: "", element: <Events /> },
            { path: ":id", element: <DetailsCardEvent /> },
          ],
        },
        {
          path: "offers",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            { path: "", element: <Offers /> },
            { path: ":detailsTripInfo", element: <DetailsTripInfoPage /> },
          ],
        },
        {
          path: "gifts/:id",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [{ path: "", element: <GiftDetail /> }],
        },
        { path: "accountUser", element: <AccountUser /> },
        { path: "reservations", element: <Reservations /> },
        {
          path: "biographyPage/:id",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            { path: "", element: <BiographyPage /> },
            { path: ":detailsTripInfo", element: <DetailsTripInfoPage /> },
          ],
        },
        {
          path: "country/:id",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [{ path: "", element: <Country /> }],
        },
        {
          path: "tripsPage",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            { path: "", element: <TripsPage /> },
            { path: ":detailsTripInfo", element: <DetailsTripInfoPage /> },
          ],
        },
        {
          path: "tripsPage/:id",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            { path: "", element: <DetailsTripInfoPage /> },
            // { path: ":detailsTripInfo", element: <DetailsTripInfoPage /> }
          ],
        },
        { path: "natureDventuresPage", element: <NatureDventuresPage /> },
        { path: "payConfirmPage", element: <PayConfirmPage /> },
        { path: "aboutUs", element: <AboutUs /> },
        { path: "help", element: <Help /> },
        { path: "termsConditions", element: <TermsConditions /> },
        { path: "faq", element: <FaqPage /> },
        { path: "rewards", element: <Rewards /> },
        { path: "contactUs", element: <ContactUsPage /> },
        { path: "notification", element: <NotificationPage /> },
        {
          path: "news",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [{ path: "", element: <News /> }],
        },
        {
          path: "news/:id",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [{ path: "", element: <NewsDetails /> }],
        },
        {
          path: "articals",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [{ path: "", element: <Articles /> }],
        },
        {
          path: "articals/:id",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [{ path: "", element: <ArticalsDetails /> }],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      unstable_skipActionErrorRevalidation: true, // Opt into future behavior
    },
  }
);

export default routers;
