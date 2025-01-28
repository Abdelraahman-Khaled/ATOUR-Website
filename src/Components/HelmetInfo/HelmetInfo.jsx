
import { Helmet } from "react-helmet-async";

const HelmetInfo = ({ titlePage }) => {
  return (
    <Helmet>
      <title>{titlePage}</title>
      <link rel="shortcut icon" type="image/png" href="/icon/ico.svg" />

      {/* description */}
      <meta
        name="description"
        content="atour Discription Content info atour  Discription Content info atour Discription Content info"
      />

      {/* keywords */}
      <meta
        name="keywords"
        content="atour  KeyWords atour  KeyWords atour  KeyWords"
      />
      {/*  <!-- #author --> */}
      <meta name="author" content="atour Website" />
      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="atour Link Url" />
      <meta property="og:type" content="atour website" />
      <meta property="og:title" content="atour Services" />
      <meta
        property="og:description"
        content="atour A concise description of your page content"
      />
      <meta property="og:image" content="atour Image" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="atour Domain Link Url" />
      <meta property="twitter:url" content="atour Url" />
      <meta name="twitter:title" content="atour" />
      <meta
        name="twitter:description"
        content="atour description of your page content"
      />
      <meta name="twitter:image" content="atour  Image" />

      {/* LINK URL WEBSITE atour */}
      <link rel="canonical" href="https://www.example.com/your-page" />
    </Helmet>
  );
};

export default HelmetInfo;
