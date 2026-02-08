import { useLanguage } from "Components/Languages/LanguageContext";
import { Helmet } from "react-helmet-async";

const HelmetInfo = ({
  titlePage = "Atour - Your Gateway to Saudi Tourism",
  titlePageAr = "جولة - بوابتك للسياحة السعودية",
  description = "Atour منصة سعودية تقدم الجولات السياحية، التجارب الثقافية، المغامرات الصحراوية، التراث، والفعاليات المميزة في المملكة العربية السعودية.",
  descriptionAr = "Atour منصة سعودية تقدم الجولات السياحية، التجارب الثقافية، المغامرات الصحراوية، التراث، والفعاليات المميزة في المملكة العربية السعودية.",
  url = null,
  image = "https://atour.sa/assets/images/logo.svg",
  type = "home", // "trip" | "product" | "event" | "home"
  data = null,
}) => {

  const keywords = `
  Atour, جولة, منصة جولة, Atour جولة, موقع جولة السياحي
    السياحة في السعودية, الجولات السياحية السعودية, تجارب ثقافية سعودية, التراث السعودي, السياحة الداخلية السعودية, السياحة الثقافية في السعودية,
    جولات الرياض السياحية, جولة حافة العالم, رحلات السفاري السعودية, مغامرات في السعودية, جولات الغوص, جولات الجزر السعودية,
    أكلات شعبية سعودية, الأكل الجيزاني, أكلات القصيم, السليق الطائفي, الكليجا السعودية, البن السعودي, القط العسيري,
    الحرف اليدوية السعودية, الهدايا التذكارية, المنتجات التراثية السعودية, مشغولات يدوية, التسوق من الحرفيين السعوديين,
    مهرجانات سعودية, بازار شعبي, الفعاليات التراثية, الأسواق الشعبية, فعاليات ثقافية, مهرجانات البازارات,
    المتاحف في السعودية, المتحف الوطني, مدائن صالح, الدرعية التاريخية, جدة التاريخية, العلا, جزر فرسان, منتزه عسير الوطني, كورنيش جدة
  `;

  const keywordsEn = `
tour, tour, tour platform, tour tour, tour site
Tourism in Saudi Arabia, Saudi tourist tourism, Saudi cultural experiences, Saudi heritage, Saudi domestic tourism, cultural tourism in Saudi Arabia,
Tourist trips, quick trips to the edge of the world, Saudi safaris, adventures in Saudi Arabia, speed diving, southern Saudi islands,
Saudi folk dishes, Jizani dishes, Qassim dishes, Taif saliki, Saudi klijah, Saudi cuisine, Asiri cat,
Saudi handicrafts, library closing, Saudi heritage products, handicrafts, shopping from Saudi artisans,
Saudi festivals, folk bazaar, heritage events, folk diversity, cultural events, bazaar festivals,
Museums in Saudi Arabia, National Museum, Madain Saleh, Historic Diriyah, Historic Jeddah, AlUla, Farasan Islands, Asir National Park, Jeddah Corniche
`;
  const baseSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Atour",
      "alternateName": ["جولة", "Atour", "منصة جولة", "Atour Saudi Tours"],
      "url": "https://atour.sa/",
      "logo": "https://atour.sa/assets/images/logo.svg",
      "sameAs": [
        "https://www.linkedin.com/company/atour/",
        "https://x.com/atour_sa",
        "https://www.instagram.com/atour_sa/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Atour",
      "alternateName": ["جولة", "Atour", "منصة جولة", "Atour Saudi Tours"],
      "url": "https://atour.sa/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://atour.sa/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "SiteNavigationElement", "position": 1, "name": "الجولات", "url": "https://atour.sa/tripsPage" },
        { "@type": "SiteNavigationElement", "position": 2, "name": "المنتجات", "url": "https://atour.sa/offers" },
        { "@type": "SiteNavigationElement", "position": 3, "name": "الفعاليات", "url": "https://atour.sa/eventsPage" },
        { "@type": "SiteNavigationElement", "position": 4, "name": "اتصل بنا", "url": "https://atour.sa/contactUs" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "شركة منصة جولة للخدمات التسويقيه (Atour)",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "واجهة روشن للاعمال",
        "addressLocality": "الرياض",
        "addressCountry": "SA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.9520,
        "longitude": 46.6930
      },
      "openingHours": ["Sa-Th 09:00-18:00"],
      "url": "https://atour.sa/",
      "telephone": "+966000000000"
    }
  ];

  // ✅ Schemas ديناميكية حسب نوع الصفحة
  let dynamicSchema = null;

  if (type === "trip" && data) {
    dynamicSchema = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": data.title,
      "description": data.description,
      "image": data.attachments || [image],
      "url": `https://atour.sa/tripsPage/${data.id}`,
      "touristType": data.sub_categories.map((item) => item.category) || "LeisureTravel",
      "offers": {
        "@type": "Offer",
        "price": data.customer_price || 0,
        "priceCurrency": data.currency || "SAR",
        "availability": "https://schema.org/InStock"
      },
      "startDate": data.startDate || "",
      "endDate": data.endDate || "",
      "location": {
        "@type": "Place",
        "name": data.city.title || "",
        "address": data.locationAddress || ""
      }
    };
  }

  if (type === "product" && data) {
    dynamicSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.title,
      "image": data.attachments || [image],
      "description": data.description,
      "brand": { "@type": "Organization", "name": "Atour" },
      "offers": {
        "@type": "Offer",
        "url": `https://atour.sa/offers/${data.id}`,
        "priceCurrency": data.currency || "SAR",
        "price": data.customer_price || 0,
        "availability": "https://schema.org/InStock"
      }
    };
  }

  if (type === "event" && data) {
    dynamicSchema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": data.title,
      "description": data.description,
      "startDate": data.from_date,
      "endDate": data.to_date,
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "image": data.attachments || [image],
      "location": {
        "@type": "Place",
        "name": data.location,
        "address": data.location
      },
      "offers": {
        "@type": "Offer",
        "price": data.customer_price || 0,
        "priceCurrency": data.currency || "SAR",
        "availability": "https://schema.org/InStock"
      }
    };
  }

  const allSchemas = dynamicSchema
    ? [...baseSchemas, dynamicSchema]
    : baseSchemas;

  const { currentLanguage } = useLanguage()
  const pageTitle = currentLanguage === "ar" ? titlePageAr : titlePage;
  const pageDescription = currentLanguage === "ar" ? descriptionAr : description;

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{pageTitle} | {currentLanguage === 'ar' ? 'جولة' : 'Atour'}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={currentLanguage === "ar" ? keywords : keywordsEn} />
      <meta property="og:site_name" content={currentLanguage === "ar" ? "جولة" : "Atour"} />

      {/* OG */}
      <meta property="og:url" content={url ? `https://atour.sa/${url}` : "https://atour.sa/"} />
      <meta property="og:type" content={type === "product" ? "product" : type === "event" ? "event" : "website"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url ? `https://atour.sa/${url}` : "https://atour.sa/"} />

      {/* Schemas */}
      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default HelmetInfo;