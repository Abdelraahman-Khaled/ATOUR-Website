import React from 'react';
import './ImageModal.css';
import CustomModal from '../CustomModal';

const ImageModal = ({ images, onClose, open }) => {
  return (
    <CustomModal
      show={open}
      onHide={onClose}
      title={""}
      newClass={"transparent-modal"}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <div className="image-modal-gallery">
        {images.map((image, index) => (
          <img key={index} src={image.file} alt={`Comment image ${index + 1}`} className="modal-image" />
        ))}
      </div>
    </CustomModal>
  );
};

export default ImageModal;