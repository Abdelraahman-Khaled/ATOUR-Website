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
import { useRates } from "context/RatesContext";
import { useLanguage } from "Components/Languages/LanguageContext";

// ========== TRANSLATIONS ==========
const translations = {
  title: {
    ar: "إضافة تقييم",
    en: "Add Review",
    fr: "Ajouter un avis",
    de: "Bewertung hinzufügen",
    es: "Agregar reseña",
    tr: "Yorum Ekle",
    ru: "Добавить отзыв",
    zh: "添加评价",
    ko: "리뷰 추가",
    pt: "Adicionar avaliação",
    ur: "ریویو شامل کریں",
    ja: "レビューを追加",
  },
  labelComment: {
    ar: "يهمنا نعرف تجربتك - شارك بتعليق",
    en: "We care about your experience - share a comment",
    fr: "Votre avis compte - partagez un commentaire",
    de: "Ihre Erfahrung ist uns wichtig - hinterlassen Sie einen Kommentar",
    es: "Tu experiencia importa - comparte un comentario",
    tr: "Deneyiminiz önemli - yorum paylaşın",
    ru: "Нам важен ваш опыт - оставьте комментарий",
    zh: "分享您的体验 - 留下评论",
    ko: "당신의 경험이 중요합니다 - 댓글 남겨주세요",
    pt: "Sua experiência importa - deixe um comentário",
    ur: "آپ کا تجربہ ہمارے لیے اہم ہے - تبصرہ کریں",
    ja: "あなたの体験を共有してください - コメントを残す",
  },
  addImages: {
    ar: "أضف صور من تجربتك",
    en: "Add images from your experience",
    fr: "Ajoutez des images de votre expérience",
    de: "Fügen Sie Bilder aus Ihrer Erfahrung hinzu",
    es: "Agrega imágenes de tu experiencia",
    tr: "Deneyiminizden resimler ekleyin",
    ru: "Добавьте фотографии из вашего опыта",
    zh: "添加您的体验图片",
    ko: "경험 사진 추가",
    pt: "Adicione imagens da sua experiência",
    ur: "اپنے تجربے کی تصاویر شامل کریں",
    ja: "体験の写真を追加",
  },
  send: {
    ar: "إرسال التعليق",
    en: "Send Review",
    fr: "Envoyer l'avis",
    de: "Bewertung senden",
    es: "Enviar reseña",
    tr: "Yorumu Gönder",
    ru: "Отправить отзыв",
    zh: "提交评价",
    ko: "리뷰 전송",
    pt: "Enviar avaliação",
    ur: "ریویو بھیجیں",
    ja: "レビュー送信",
  },
  sending: {
    ar: "جاري الإرسال...",
    en: "Sending...",
    fr: "Envoi...",
    de: "Wird gesendet...",
    es: "Enviando...",
    tr: "Gönderiliyor...",
    ru: "Отправка...",
    zh: "正在发送...",
    ko: "전송 중...",
    pt: "Enviando...",
    ur: "بھیجا جا رہا ہے...",
    ja: "送信中...",
  },
};

const ModalAddRates = ({ showModalAddRate, hideModalAddRate, modelId, modelType }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { saveRate } = useRates();
  const { language } = useLanguage(); // 👈 current language

  const handleRating = (rate) => setRating(rate);

  const onDrop = (acceptedFiles) => {
    const newImages = [];
    acceptedFiles.forEach((file) => {
      if (images.every((image) => image.name !== file.name)) {
        newImages.push(file);
        toast.success(translations.addImages[language] + " ✅");
      } else {
        toast.error("هذه الصورة موجودة بالفعل.");
      }
    });
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    toast.success("تم حذف الصورة بنجاح.");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const [showsuccessModalSend, setShowsuccessModalSend] = useState(false);
  const hideSuccessModalSend = () => setShowsuccessModalSend(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("من فضلك قم بإضافة تقييم النجوم");
      return;
    }
    if (!modelId || !modelType) {
      toast.error("معلومات التقييم غير صحيحة");
      return;
    }

    setLoading(true);
    try {
      const payload = { rate: rating, comment, model_id: modelId, model_type: modelType, images };
      await saveRate(payload);
      setShowsuccessModalSend(true);
      hideModalAddRate();
      toast.success("تم ارسال التقييم بنجاح.");
      setRating(0);
      setComment("");
      setImages([]);
    } catch (err) {
      toast.error("حدث خطأ أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessSend
        showsuccessModalSend={showsuccessModalSend}
        hideSuccessModalSend={hideSuccessModalSend}
        titleModal="✅"
        titleSend="تم ارسال التقييم"
        isTrueText={true}
        textSend="نشكرك على مشاركتنا بتجربتك."
        textButton="تم"
      />
      <CustomModal
        show={showModalAddRate}
        onHide={hideModalAddRate}
        title={translations.title[language]}
        newClass="modal-add-rate modal-width-content"
      >
        <div className="all-modal-add-rate">
          <div className="header-content-rate">
            <div className="d-flex flex-column w-100 gap-3 align-items-center justify-content-center">
              <img src={img} alt="imageRate" className="image-rate" />
              <Rating onClick={handleRating} initialValue={rating} />
            </div>
            <div className="form-header mt-3 d-flex flex-column gap-2 w-100">
              <label htmlFor="form-teaxtarea" className="form-label">
                {translations.labelComment[language]}
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="form-teaxtarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>

          <div className="add-image-modal mt-3">
            <h2 className="title mb-3">{translations.addImages[language]}</h2>
            <div className="all-uploaded-image">
              <div className="uploade-image-text" {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="content-info-title d-flex justify-content-center align-items-center gap-2">
                  <FontAwesomeIcon icon={faPlus} /> {translations.addImages[language]}
                </p>
              </div>
              <div className="row g-3 mt-3">
                {images.map((image, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="image-uploaded position-relative">
                      <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} className="image-style-upload" />
                      <button type="button" className="btn-trash-image" onClick={() => removeImage(index)}>
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={loading} className="send-content btn-main rounded-5 mt-3">
            {loading ? translations.sending[language] : translations.send[language]}
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default ModalAddRates;
