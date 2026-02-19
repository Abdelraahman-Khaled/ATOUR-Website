const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Placeholder domain - User should update this
const BASE_DOMAIN = "https://atour-eg.com";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://backend.atour.sa/api/v1";

// Static routes to include
const STATIC_ROUTES = [
  "/",
  "/aboutUs",
  "/contactUs",
  "/termsConditions",
  "/faq",
  "/rewards",
  "/help",
  "/blogsPage",
  "/eventsPage",
  "/offers",
  "/tripsPage",
  "/news",
  "/articals",
];

// Helper to create XML item
const createUrlEntry = (url, changefreq = "weekly", priority = "0.8") => {
  return `
  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

// Fetch data from API
const fetchData = async (endpoint, lang = "en") => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: { lang },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return [];
  }
};

const generateSitemap = async () => {
  console.log("Generating sitemap...");
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 1. Add Static Routes
  console.log("Adding static routes...");
  STATIC_ROUTES.forEach((route) => {
    sitemapContent += createUrlEntry(
      `${BASE_DOMAIN}${route}`,
      "monthly",
      "0.5",
    );
  });

  // 2. Add Dynamic Routes

  // Trips
  console.log("Fetching Trips...");
  const tripsResponse = await fetchData("/trips");
  const trips = tripsResponse.data || [];
  trips.forEach((trip) => {
    sitemapContent += createUrlEntry(
      `${BASE_DOMAIN}/tripsPage/${trip.id}`,
      "daily",
      "1.0",
    );
  });

  // Blogs
  console.log("Fetching Blogs...");
  const blogsResponse = await fetchData("/blogs");
  const blogs = blogsResponse.data || [];
  blogs.forEach((blog) => {
    sitemapContent += createUrlEntry(
      `${BASE_DOMAIN}/blogsPage/${blog.id}`,
      "weekly",
      "0.9",
    );
  });

  // Events (Effectiveness)
  console.log("Fetching Events...");
  const eventsResponse = await fetchData("/effectivenes"); // Note spelling 'effectivenes' from API structure
  const events = eventsResponse.data || [];
  events.forEach((event) => {
    sitemapContent += createUrlEntry(
      `${BASE_DOMAIN}/eventsPage/${event.id}`,
      "weekly",
      "0.9",
    );
  });

  // Gifts (Offsets)
  console.log("Fetching Gifts...");
  const giftsResponse = await fetchData("/gifts");
  const gifts = giftsResponse.data || [];
  gifts.forEach((gift) => {
    sitemapContent += createUrlEntry(
      `${BASE_DOMAIN}/gifts/${gift.id}`,
      "weekly",
      "0.8",
    );
  });

  // News
  console.log("Fetching News...");
  const newsResponse = await fetchData("/news");
  const news = newsResponse.data || [];
  news.forEach((item) => {
    sitemapContent += createUrlEntry(
      `${BASE_DOMAIN}/news/${item.id}`,
      "weekly",
      "0.7",
    );
  });

  // Articles
  console.log("Fetching Articles...");
  const articlesResponse = await fetchData("/articles");
  const articles = articlesResponse.data || [];
  articles.forEach((article) => {
    sitemapContent += createUrlEntry(
      `${BASE_DOMAIN}/articals/${article.id}`,
      "weekly",
      "0.7",
    );
  });

  sitemapContent += `
</urlset>`;

  // Write to file
  const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(outputPath, sitemapContent);
  console.log(`Sitemap generated successfully at ${outputPath}`);
};

generateSitemap();
