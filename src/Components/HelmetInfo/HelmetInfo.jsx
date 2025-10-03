import { useLanguage } from "Components/Languages/LanguageContext";
import { Helmet } from "react-helmet-async";

const HelmetInfo = ({
  titlePage = "Atour - Your Gateway to Saudi Tourism",
  description = "Atour منصة سعودية تقدم الجولات السياحية، التجارب الثقافية، المغامرات الصحراوية، التراث، والفعاليات المميزة في المملكة العربية السعودية.",
  url = null,
  image = "https://atour.sa/assets/images/logo.svg",
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

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Atour",
      "alternateName": ["Atour", "atour", "ATOUR", "جولة"],
      "url": "https://atour.sa/",
      "logo": "https://atour.sa/assets/images/logo.svg",
      "sameAs": [
        "https://www.linkedin.com/company/atour/",
        "https://x.com/atour_sa",
        "https://www.instagram.com/atour_sa/",
        "https://www.snapchat.com/@atour.sa",
        "https://www.tiktok.com/@atour_sa",
        "https://apps.apple.com/us/app/atour-%D8%AC%D9%88%D9%84%D8%A9/id6743371891?platform=iphone",
        "https://play.google.com/store/apps/details?id=com.app.atour"
      ],
      "description": "Atour (جولة) هي منصة سعودية رائدة تقدم الجولات السياحية، التجارب الثقافية، الفعاليات والمغامرات في المملكة العربية السعودية والعالم العربي."
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
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
        { "@type": "SiteNavigationElement", "position": 2, "name": "العروض والمنتجات", "url": "https://atour.sa/offers" },
        { "@type": "SiteNavigationElement", "position": 3, "name": "الفعاليات", "url": "https://atour.sa/eventsPage" },
        { "@type": "SiteNavigationElement", "position": 4, "name": "اتصل بنا", "url": "https://atour.sa/contactUs" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "SiteNavigationElement", "position": 1, "name": "Trips", "url": "https://atour.sa/tripsPage" },
        { "@type": "SiteNavigationElement", "position": 2, "name": "Offers & Products", "url": "https://atour.sa/offers" },
        { "@type": "SiteNavigationElement", "position": 3, "name": "Events", "url": "https://atour.sa/eventsPage" },
        { "@type": "SiteNavigationElement", "position": 4, "name": "Contact Us", "url": "https://atour.sa/contactUs" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": "جولات سياحية في السعودية",
      "description": "جولات ثقافية، رحلات سفاري، مغامرات صحراوية وتجارب تراثية في المملكة العربية السعودية.",
      "touristType": ["Adventure", "Culture", "Heritage", "Religious"],
      "provider": { "@type": "Organization", "name": "Atour", "url": "https://atour.sa/" },
      "offers": {
        "@type": "Offer",
        "url": "https://atour.sa/tripsPage",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "هدايا ومنتجات تراثية سعودية",
      "image": [
        "https://atour.sa/assets/images/products/gift1.jpg",
        "https://atour.sa/assets/images/products/gift2.jpg"
      ],
      "description": "منتجات وهدايا تراثية سعودية تعكس الثقافة المحلية، مثالية للهدايا التذكارية.",
      "brand": { "@type": "Organization", "name": "Atour" },
      "offers": {
        "@type": "Offer",
        "url": "https://atour.sa/offers",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
      }
    }
  ];

  const { currentLanguage } = useLanguage()
  return (
    <Helmet>
      <title>{titlePage} | {currentLanguage === 'ar' ? 'جولة' : 'Atour'}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Atour Website" />
      <meta name="application-name" content="Atour" />
      <meta name="og:site_name" content="Atour | جولة" />

      {/* Open Graph */}
      <meta property="og:url" content={url ? `https://atour.sa/${url}` : "https://atour.sa/"} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titlePage} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url ? `https://atour.sa/${url}` : "https://atour.sa/"} />
      <meta name="twitter:title" content={titlePage} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url ? `https://atour.sa/${url}` : "https://atour.sa/"} />

      {/* ✅ All Schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default HelmetInfo;
