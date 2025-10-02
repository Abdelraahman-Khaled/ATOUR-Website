import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RatesComments.css";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"; // for empty stars
import ReadMoreText from "Components/Ui/ReadMoreText/ReadMoreText";
import imageUser_1 from "../../../../../../assets/images/users/02.png";
import ImageModal from '../../../../../../Components/CustomModal/ImageModal/ImageModal';
import { useState } from 'react';


const UserCommentRate = ({ imageUser, userName, timeAdd, comment, rate, images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert rate to number (API gives it as string)
  const stars = Array.from({ length: 5 }, (_, i) => i < Number(rate));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="user-comment-rate">
      <div className="data-user-info d-flex align-items-center gap-2">
        <div className="img-user-rate">
          <img
            src={imageUser || imageUser_1}
            alt="userImage"
            width="50"
            height="50"
            onError={(e) => {
              // @ts-ignore
              e.target.src = imageUser_1;
            }}
          />
        </div>

        <div className="info-user w-100">
          {/* Dynamic stars */}
          <div className="rate-stars d-flex align-items-center gap-1">
            {stars.map((filled, index) => (
              <span className="rate-star-icon" key={index}>
                <FontAwesomeIcon icon={filled ? solidStar : regularStar} />
              </span>
            ))}
          </div>

          {/* User name & time */}
          <div className="main-user-info d-flex align-items-center justify-content-between gap-1 w-100">
            <h2 className="name-user ">{userName}</h2>
            <p className="time-add">
              {timeAdd}
            </p>
          </div>
        </div>
      </div>

      {/* Comment text */}
      <div className="content-info">
        <ReadMoreText newClass="mt-2" text={comment} maxLength={120} />
        {images && images.length > 0 && (
          <div className="comment-images-thumbnail mt-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img.file}
                alt={`Comment thumbnail ${index + 1}`}
                className="comment-thumbnail"
                onClick={openModal}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && <ImageModal images={images} onClose={closeModal} open={isModalOpen} />}
    </div>
  );
};

export default UserCommentRate;
