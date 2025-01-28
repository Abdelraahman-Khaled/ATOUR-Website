import { Link } from "react-router-dom";
import "./CardBlog.css";
const CardBlog = ({
  routeBlogCard,
  imageBlog,
  titleBlog,
  imageUserBlog,
  nameUserBlog,
  timeAddedBlog
}) => {
  return (
    <Link to={routeBlogCard} className="card-blog-one">
      {/* ============= START IMAGE CARD BLOG ============== */}
      <div className="image-card-blog position-relative overlay-bg">
        <img
          src={imageBlog}
          alt="img blog"
          className="image-blog-src object-fit-cover"
        />
      </div>
      {/* ============= END IMAGE CARD BLOG ============== */}
      {/* ============= START CONTENT INFO CARD BLOG ========== */}
      <div className="content-info-card-blog">
        <h2 className="title">{titleBlog}</h2>
        <div className="info-blog-added d-flex align-items-center gap-3">
          <img
            src={imageUserBlog}
            alt="img person"
            className="object-fit-cover"
            width={"45px"}
            height={"45px"}
          />
          <div className="content-info">
            <h2 className="name">{nameUserBlog}</h2>
            <div className="time-add">{timeAddedBlog}</div>
          </div>
        </div>
      </div>
      {/* ============= END CONTENT INFO CARD BLOG ========== */}
    </Link>
  );
};

export default CardBlog;
