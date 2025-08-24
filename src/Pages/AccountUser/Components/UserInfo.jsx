import { useProfile } from "context/ProfileContext";
import imgUserPlaceholder from "../../../assets/images/users/user.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    </div>
  );
};

export default UserInfo;
