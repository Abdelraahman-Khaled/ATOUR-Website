import { useProfile } from "context/ProfileContext";
import imgUserPlaceholder from "../../../assets/images/users/user.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarAndCrescent,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

const UserInfo = () => {
  const { profile, loading, isAuthenticated } = useProfile();
  const navigate = useNavigate();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      navigate("/");
    }
  }, [loading, navigate, isAuthenticated]);

  if (loading) return <div>Loading...</div>;

  // Don't render anything if not authenticated
  if (!isAuthenticated()) return null;

  return (
    <div className="header-user-info-profile">
      <div className="image-user">
        <img
          src={profile?.photo || imgUserPlaceholder}
          alt="User"
          className="object-fit-cover rounded-5"
          width="82"
          height="82"
        />
      </div>
      <h2 className="name-user-info">{profile?.name || "Guest"}</h2>
      <p className="name-user-info"> C-{profile?.code || "Guest"}</p>
      <div className="d-flex flex-wrap gap-2 justify-content-center mt-1">
        {profile?.rating_statistics?.total_ratings > 0 ? (
          <div className="rate-stars-details d-flex align-items-center gap-1">
            <span className="icon-star-details rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="icon-star-details rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="icon-star-details rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="icon-star-details rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="icon-star-details rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
        ) : (
          <div className="rate-stars-details d-flex  align-items-center gap-1">
            <span className="icon-star-details rate-star-icon">
              <i className="fa-regular fa-star"></i>
            </span>
            <span className="icon-star-details rate-star-icon">
              <i className="fa-regular fa-star"></i>
            </span>
            <span className="icon-star-details rate-star-icon">
              <i className="fa-regular fa-star"></i>
            </span>
            <span className="icon-star-details rate-star-icon">
              <i className="fa-regular fa-star"></i>
            </span>
            <span className="icon-star-details rate-star-icon">
              <i className="fa-regular fa-star"></i>
            </span>
          </div>
        )}
        {profile?.rating_statistics?.total_ratings > 0 ? (
          <>
            (
            {profile?.rating_statistics?.total_ratings
              ? profile.rating_statistics?.total_ratings.toFixed(1)
              : 0}
            )
          </>
        ) : (
          <>(0)</>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
