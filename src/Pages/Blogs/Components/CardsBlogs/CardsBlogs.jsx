
import CardBlog from "../CardBlog/CardBlog";
import imageBlog from "../../../../assets/images/blogs/01.png";
import img_1 from "../../../../assets/images/users/01.png";
import { useEffect, useState, useContext } from "react";
import GeneralAPI from "api/generalApi";
import content from "../../../../Components/Languages/translations";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "Components/Languages/LanguageContext";
import Loader from "Components/Auth/Components/Loader/Loader";

const CardsBlogs = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

  const [blogData, setBlogData] = useState([]); // State to store home data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await GeneralAPI.getBlogs(currentLanguage); // Fetch data from the API
        setBlogData(data.data); // Set the fetched data to state
      } catch (err) {
        console.error("Error fetching home data:", err);
        toast.error("Failed to load home data. Please try again later.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchBlogData(); // Call the API on component mount
  }, [currentLanguage]);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return null; // No need to display error here, toast will handle it
  }

  return (
    <div className="cards-blog-content padding-80">
      {/* =========== START ROW =========== */}
      <div className="row g-4">
        {blogData.length > 0 ? blogData.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 d-flex">
            <CardBlog
              routeBlogCard={`/blogsPage/${item.id}`}
              imageBlog={item.photo}
              titleBlog={item.title}
              imageUserBlog={item.publisherphoto}
              nameUserBlog={item.publisher_name}
              timeAddedBlog={item.created_at}
              description={item.description}
            />
          </div>
        )) : (
          <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found">
            {content.common.noData[currentLanguage]}{" "}
            <Link
              to="/"
              className="fs-6 fw-medium text-danger text-decoration-underline"
            >
              {content.common.home[currentLanguage]}
            </Link>
          </p>
        )}
      </div>
      {/* =========== END ROW =========== */}
    </div>
  );
};

export default CardsBlogs;
