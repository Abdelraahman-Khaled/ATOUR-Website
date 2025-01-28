import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RatesComments.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReadMoreText from "Components/Ui/ReadMoreText/ReadMoreText";
const UserCommentRate = ({imageUser,userName,timeAdd,timeText,comment}) => {

  return (
    <div className="user-comment-rate">
      <div className="data-user-info d-flex align-items-center gap-2">
        <div className="img-user-rate">
          <img src={imageUser} alt="userImage" width={"50px"} height={"50px"} />
        </div>
        <div className="info-user">
          <div className="rate-stars d-flex align-items-center gap-1">
            <span className="rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="rate-star-icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          <div className="main-user-info d-flex align-items-center gap-1">
          <h2 className="name-user">{userName}</h2>
          <p className="time-add">منذ {timeAdd} {timeText}</p>
          </div>
        </div>
      
      </div>
      <div className="content-info">
      <ReadMoreText newClass="mt-2" text={comment} maxLength={120} />
    </div>
    </div>
  );
};

export default UserCommentRate;

