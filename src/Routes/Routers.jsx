import { lazy, Suspense } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

// Home + Layout stay in the main bundle (first paint of the landing page).
import Home from "../Pages/Home/Home";
import Layout from "../Components/Layout/Layout";

// Every other page is split into its own chunk and only downloaded when visited.
// React Router waits for the chunk before switching, so the current page stays
// on screen during navigation (no blank flash).
const page = (load) => ({
  lazy: async () => ({ Component: (await load()).default }),
});

const loadNotFound = () => import("../Pages/NotFound/NotFound");
const loadDetailsTripInfo = () =>
  import("Pages/DetailsTripInfoPage/DetailsTripInfoPage");

// errorElement can't use route.lazy, so NotFound (lottie + 500KB json) goes through React.lazy
const NotFoundLazy = lazy(loadNotFound);
const notFoundElement = (
  <Suspense fallback={null}>
    <NotFoundLazy />
  </Suspense>
);

const outlet = <Outlet />;

let routers = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      errorElement: notFoundElement,
      children: [
        {
          path: "",
          element: outlet,
          children: [
            { index: true, element: <Home /> },
            {
              path: "detailsTripInfoId/:detailsTripInfo",
              ...page(loadDetailsTripInfo),
            },
          ],
        },
        {
          path: "favoritePage",
          ...page(() => import("Pages/FavoritePage/FavoritePage")),
        },
        {
          path: "blogsPage",
          element: outlet,
          children: [
            { path: "", ...page(() => import("Pages/Blogs/Blogs")) },
            {
              path: ":idCardDetailsBlog",
              ...page(() =>
                import("Pages/Blogs/Components/DetailsBlogCard/DetailsBlogCard")
              ),
            },
          ],
        },
        {
          path: "eventsPage",
          element: outlet,
          children: [
            {
              path: "",
              ...page(() => import("Pages/Effectivenes/EffectivenesPage")),
            },
            {
              path: ":id",
              ...page(() =>
                import("Pages/Events/Components/DetailsCardEvent/DetailsCardEvent")
              ),
            },
          ],
        },
        {
          path: "offers",
          element: outlet,
          children: [
            { path: "", ...page(() => import("../Pages/Offers/Offers")) },
            { path: ":detailsTripInfo", ...page(loadDetailsTripInfo) },
          ],
        },
        {
          path: "gifts/:id",
          element: outlet,
          children: [
            { path: "", ...page(() => import("Components/Ui/Gifts/GiftDetail")) },
          ],
        },
        {
          path: "accountUser",
          ...page(() => import("../Pages/AccountUser/AccountUser")),
        },
        {
          path: "reservations",
          ...page(() => import("Pages/Reservations/Reservations")),
        },
        {
          path: "biographyPage/:id",
          element: outlet,
          children: [
            { path: "", ...page(() => import("Pages/BiographyPage/BiographyPage")) },
            { path: ":detailsTripInfo", ...page(loadDetailsTripInfo) },
          ],
        },
        {
          path: "country/:id",
          element: outlet,
          children: [{ path: "", ...page(() => import("Pages/Country/Country")) }],
        },
        {
          path: "tripsPage",
          element: outlet,
          children: [
            { path: "", ...page(() => import("Pages/TripsPage/TripsPage")) },
            { path: ":detailsTripInfo", ...page(loadDetailsTripInfo) },
          ],
        },
        {
          path: "tripsPage/:id",
          element: outlet,
          children: [{ path: "", ...page(loadDetailsTripInfo) }],
        },
        {
          path: "natureDventuresPage",
          ...page(() => import("Pages/NatureDventuresPage/NatureDventuresPage")),
        },
        {
          path: "payConfirmPage",
          ...page(() => import("../Pages/PayConfirmPage/PayConfirmPage")),
        },
        { path: "aboutUs", ...page(() => import("Pages/AboutUs/AboutUs")) },
        { path: "help", ...page(() => import("Pages/Help/Help")) },
        {
          path: "termsConditions",
          ...page(() => import("../Pages/TermsConditions/TermsConditions")),
        },
        { path: "faq", ...page(() => import("../Pages/Faq/FaqPage")) },
        { path: "rewards", ...page(() => import("../Pages/Rewards/Rewards")) },
        {
          path: "contactUs",
          ...page(() => import("../Pages/ContactUs/ContactUsPage")),
        },
        {
          path: "notification",
          ...page(() => import("../Pages/NotificationPage/NotificationPage")),
        },
        {
          path: "news",
          element: outlet,
          children: [{ path: "", ...page(() => import("../Pages/News/News")) }],
        },
        {
          path: "news/:id",
          element: outlet,
          children: [
            {
              path: "",
              ...page(() =>
                import("../Pages/News/Components/NewsDetails/NewsDetails")
              ),
            },
          ],
        },
        {
          path: "articals",
          element: outlet,
          children: [
            { path: "", ...page(() => import("Pages/Blogs/Articles/Articles")) },
          ],
        },
        {
          path: "articals/:id",
          element: outlet,
          children: [
            {
              path: "",
              ...page(() => import("Pages/Blogs/Articles/ArticalsDetails")),
            },
          ],
        },
        { path: "*", ...page(loadNotFound) },
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
