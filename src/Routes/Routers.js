import { Outlet, createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Layout from "../Components/Layout/Layout";
import NotFound from "../Pages/NotFound/NotFound";
import FavoritePage from "Pages/FavoritePage/FavoritePage";
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
import PrivateRoute from "./PrivateRoute";
import GiftDetail from "Components/Ui/Gifts/GiftDetail";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
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
            element: <DetailsTripInfoPage />
          }
        ]
      },
      { path: "favoritePage", element: <FavoritePage /> },
      {
        path: "blogsPage",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          { path: "", element: <Blogs /> },
          { path: ":idCardDetailsBlog", element: <DetailsBlogCard /> }
        ]
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
          { path: ":id", element: <DetailsCardEvent /> }
        ]
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
          { path: ":detailsTripInfo", element: <DetailsTripInfoPage /> }
        ]
      },
      {
        path: "gifts/:id",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          { path: "", element: <GiftDetail /> },
        ]
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
          { path: ":detailsTripInfo", element: <DetailsTripInfoPage /> }
        ]
      },
      {
        path: "tripsPage",
        element: (
          <>
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          </>
        ),
        children: [
          { path: "", element: <TripsPage /> },
          { path: ":detailsTripInfo", element: <DetailsTripInfoPage /> }
        ]
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
        ]
      },
      { path: "natureDventuresPage", element: <NatureDventuresPage /> },
      { path: "payConfirmPage", element: <PayConfirmPage /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default routers;
