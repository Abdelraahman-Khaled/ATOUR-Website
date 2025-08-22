import { useProfile } from "context/ProfileContext";
import imgUserPlaceholder from "../../../assets/images/users/user.png";

const UserInfo = () => {
  const { profile, loading } = useProfile();

  if (loading) return <div>Loading...</div>;

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
      <h2 className="name-user-info">{profile?.name}</h2>
    </div>
  );
};

export default UserInfo;
