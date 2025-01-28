
import CardBlog from "../CardBlog/CardBlog";
import imageBlog from "../../../../assets/images/blogs/01.png";
import img_1 from "../../../../assets/images/users/01.png";

const CardsBlogs = () => {
  const cardsBlog = [
    {
      id: 0,
      image: imageBlog,
      title: "7 نصائح للسفر وكيفية تجنب الخسائر",
      imageUser: img_1,
      name: "أميرة محمود",
      timeAdded: "منذ 3 دقائق"
    },
    {
      id: 1,
      image: imageBlog,
      title: "7 نصائح للسفر وكيفية تجنب الخسائر",
      imageUser: img_1,
      name: "أميرة محمود",
      timeAdded: "منذ 3 دقائق"
    },
    {
      id: 2,
      image: imageBlog,
      title: "7 نصائح للسفر وكيفية تجنب الخسائر",
      imageUser: img_1,
      name: "أميرة محمود",
      timeAdded: "منذ 3 دقائق"
    },
    {
      id: 3,
      image: imageBlog,
      title: "7 نصائح للسفر وكيفية تجنب الخسائر",
      imageUser: img_1,
      name: "أميرة محمود",
      timeAdded: "منذ 3 دقائق"
    },
    {
      id: 4,
      image: imageBlog,
      title: "7 نصائح للسفر وكيفية تجنب الخسائر",
      imageUser: img_1,
      name: "أميرة محمود",
      timeAdded: "منذ 3 دقائق"
    },
    {
      id: 5,
      image: imageBlog,
      title: "7 نصائح للسفر وكيفية تجنب الخسائر",
      imageUser: img_1,
      name: "أميرة محمود",
      timeAdded: "منذ 3 دقائق"
    }
  ];
  return (
    <div className="cards-blog-content padding-80">
      {/* =========== START ROW =========== */}
      <div className="row g-3 gy-4">
        {cardsBlog.map((item) => {
          return (
            <>
              {/* ========== START COL ========== */}
              <div key={item.id} className="col-12 col-sm-6 col-md-4">
                <CardBlog
                  routeBlogCard={`/blogsPage/${item.id}`}
                  imageBlog={item.image}
                  titleBlog={item.title}
                  imageUserBlog={item.imageUser}
                  nameUserBlog={item.name}
                  timeAddedBlog={item.timeAdded}
                />
              </div>
              {/* ========== END COL ========== */}
            </>
          );
        })}
      </div>
      {/* =========== END ROW =========== */}
    </div>
  );
};

export default CardsBlogs;
