import CustomModal from "Components/CustomModal/CustomModal";
import img from "../../../../../assets/images/rate/01.svg";
import "./ModalAddRates.css";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import TrashIcon from "assets/Icons/TrashIcon";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";

const ModalAddRates = ({ showModalAddRate, hideModalAddRate }) => {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  // FILE UPLOAD
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = [];
    acceptedFiles.forEach((file) => {
      if (images.every((image) => image.name !== file.name)) {
        newImages.push(file);
        toast.success("تم رفع الصورة بنجاح.");
      } else {
        toast.error(`هذه الصورة موجودة بالفعل.`);
      }
    });
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    toast.success(`تم حذف الصورة بنجاح.`);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*"
  });

  // SUCCESS MODAL
  const [showsuccessModalSend, setShowsuccessModalSend] = useState(false);
  const buttonShowSuccess = () => {
    setShowsuccessModalSend(true);
    hideModalAddRate();
  };
  const hideSuccessModalSend = () => {
    setShowsuccessModalSend(false);
  };

  return (
    <>
      <SuccessSend
        showsuccessModalSend={showsuccessModalSend}
        hideSuccessModalSend={hideSuccessModalSend}
        titleModal={"تم ارسال التقييم بنجاح."}
        titleSend={"تم ارسال التقييم بنجاح."}
        isTrueText={true}
        textSend={
          "نشكرك على مشاركتنا بتجربتك حيث بذلك يمكننا تحسين وتقديم أفضل الخدمات لإرضاء عملاؤنا"
        }
        textButton={"تم"}
      />
      <CustomModal
        show={showModalAddRate}
        onHide={hideModalAddRate}
        title={"إضافة تقييم"}
        newClass={"modal-add-rate modal-width-content"}
      >
        {/* =============== START ALL MODAL ADD RATE =============== */}
        <div className="all-modal-add-rate">
          {/* ================ START HEADER CONTENT RATE ============ */}
          <div className="header-content-rate">
            <div className="d-flex flex-column w-100 gap-3  align-items-center justify-content-center">
              <img src={img} alt="imageRate" className="image-rate" />
              <Rating onClick={handleRating} />
            </div>
            <form action="">
              <div className="form-header mt-3 d-flex flex-column gap-2 w-100">
                <label htmlFor="form-teaxtarea" className=" form-label">
                  يهمنا نعرف تجربتك - شارك بتعليق
                </label>
                <textarea
                  className=" form-control"
                  rows={5}
                  name=""
                  id="form-teaxtarea"
                ></textarea>
              </div>
            </form>
          </div>
          {/* ================ END HEADER CONTENT RATE ============ */}
          {/* ================ START ADD IMAGE MODAL RATE ============ */}
          <div className="add-image-modal mt-3">
            <h2 className="title mb-3">أضف صور من تجربتك</h2>
            <div className="all-uploaded-image">
              <div className="uploade-image-text " {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="content-info-title d-flex justify-content-center align-items-center gap-2">
                  <FontAwesomeIcon icon={faPlus} /> أضف صور من تجربتك
                </p>
              </div>
              <div className="row g-3 mt-3">
                {images.map((image, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="image-uploaded position-relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index}`}
                        className="image-style-upload"
                      />
                      <button
                        className="btn-trash-image"
                        onClick={() => removeImage(index)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ================ END ADD IMAGE MODAL RATE ============ */}
          <button
            onClick={buttonShowSuccess}
            className="send-content btn-main rounded-5 mt-3"
          >
            إرسال التعليق
          </button>
        </div>
        {/* =============== END ALL MODAL ADD RATE =============== */}
      </CustomModal>
    </>
  );
};

export default ModalAddRates;
