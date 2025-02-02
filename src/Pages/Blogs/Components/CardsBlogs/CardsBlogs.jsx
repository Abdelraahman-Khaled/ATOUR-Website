
import CardBlog from "../CardBlog/CardBlog";
import imageBlog from "../../../../assets/images/blogs/01.png";
import img_1 from "../../../../assets/images/users/01.png";
import { useEffect, useState } from "react";
import GeneralAPI from "api/generalApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { Link } from "react-router-dom";


const text = {
  ar: {
    noData: "لا يوجد بيانات متاحة.",
    home: "الصفحة الرئيسية",
  },
  en: {
    noData: "No data available.",
    home: "Home",
  },
};

const CardsBlogs = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

  const [blogData, setBlogData] = useState([]); // State to store home data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await GeneralAPI.getBlogs(); // Fetch data from the API
        setBlogData(data.data); // Set the fetched data to state
      } catch (err) {
        console.error("Error fetching home data:", err);
        setError("Failed to load home data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchBlogData(); // Call the API on component mount
  }, []);


  if (loading) {
    return (
      <div className="airPlan-dot" />
    );
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  console.log(blogData.length > 0 && blogData[0].title_en);


  return (
    <div className="cards-blog-content padding-80">
      {/* =========== START ROW =========== */}
      <div className="row g-3 gy-4">
        {blogData.length > 0 ? blogData.map((item) => {
          return (
            <>
              {/* ========== START COL ========== */}
              <div key={item.id} className="col-12 col-sm-6 col-md-4">
                <CardBlog
                  routeBlogCard={`/blogsPage/${item.id}`}
                  imageBlog={item.photo}
                  titleBlog={currentLanguage === "ar" ? item.title_ar.slice(1, -1) : item.title_en.slice(1, -1)}
                  imageUserBlog={item.publisherphoto}
                  nameUserBlog={item.publisher_name}
                  timeAddedBlog={item.created_at}
                />
              </div>
              {/* ========== END COL ========== */}
            </>
          );
        }) : (
          <p className="text-section-api fs-6 fw-medium text-center pt-5">
            {text[currentLanguage].noData}{" "}
            <Link
              to="/"
              className="fs-6 fw-medium text-danger text-decoration-underline"
            >
              {text[currentLanguage].home}
            </Link>
          </p>
        )}
      </div>
      {/* =========== END ROW =========== */}
    </div>
  );
};

export default CardsBlogs;
