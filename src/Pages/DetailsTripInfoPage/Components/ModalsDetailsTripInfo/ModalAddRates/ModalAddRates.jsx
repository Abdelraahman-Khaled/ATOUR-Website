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
    ar: "تم إضافة صور من تجربتك",
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
    ar: "إرسال التقييم",
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
  existsImage: {
    ar: "هذه الصورة موجودة بالفعل.",
    en: "This image already exists.",
    fr: "Cette image existe déjà.",
    de: "Diese Bilddatei existiert bereits.",
    es: "Esta imagen ya existe.",
    tr: "Bu görüntü zaten var.",
    ru: "Этот файл изображения уже существует.",
    zh: "此图像文件已存在。",
    ko: "이 이미지 파일은 이미 존재합니다.",
    pt: "Esta imagem já existe.",
    ur: "اسکاوی میں اس صورة موجود ہے.",
    ja: "この画像ファイルは既に存在します。",
  },
  ratingStar: {
    ar: " يرجى إضافة تقييم النجوم",
    en: "Please add a rating star.",
    fr: "Veuillez ajouter une note étoile.",
    de: "Bitte fügen Sie eine Sternnote hinzu.",
    es: "Por favor, agregue una calificación estrella.",
    tr: "Lütfen bir yıldız puanı ekleyin.",
    ru: "Пожалуйста, добавьте звезду рейтинга.",
    zh: "请添加一个星号评分。",
    ko: "별점을 추가하세요.",
    pt: "Por favor, adicione uma avaliação estrela.",
    ur: "يرجى إضافة تقييم ستار.",
    ja: "星を追加してください。",
  },
  removeImage: {
    ar: "تم حذف الصورة",
    en: "Image removed",
    fr: "Image supprimée",
    de: "Bild entfernt",
    es: "Imagen eliminada",
    tr: "Görüntü kaldırıldı",
    ru: "Изображение удалено",
    zh: "图片已删除",
    ko: "이미지가 삭제되었습니다",
    pt: "Imagem removida",
    ur: "تصویر ہٹا دی گئی",
    ja: "画像が削除されました",
  },
  invalidRates: {
    ar: "بيانات التقييم غير صحيحة.",
    en: "Invalid review data.",
    fr: "Données d'avis invalides.",
    de: "Ungültige Bewertungsdaten.",
    es: "Datos de reseña no válidos.",
    tr: "Geçersiz yorum verisi.",
    ru: "Неверные данные отзыва.",
    zh: "无效的评论数据。",
    ko: "잘못된 리뷰 데이터입니다.",
    pt: "Dados de avaliação inválidos.",
    ur: "غلط ریویو ڈیٹا۔",
    ja: "無効なレビュー データです。",
  },
  successSend: {
    ar: "تم إرسال التقييم بنجاح.",
    en: "Review submitted successfully.",
    fr: "Avis envoyé avec succès.",
    de: "Bewertung erfolgreich gesendet.",
    es: "Reseña enviada con éxito.",
    tr: "Yorum başarıyla gönderildi.",
    ru: "Отзыв успешно отправлен.",
    zh: "评价提交成功。",
    ko: "리뷰가 성공적으로 제출되었습니다.",
    pt: "Avaliação enviada com sucesso.",
    ur: "ریویو کامیابی سے بھیجا گیا۔",
    ja: "レビューが正常に送信されました。",
  },
  errorSend: {
    ar: "حدث خطأ أثناء الإرسال.",
    en: "An error occurred while sending.",
    fr: "Une erreur s'est produite lors de l'envoi.",
    de: "Beim Senden ist ein Fehler aufgetreten.",
    es: "Ocurrió un error al enviar.",
    tr: "Gönderim sırasında bir hata oluştu.",
    ru: "Произошла ошибка при отправке.",
    zh: "发送时出错。",
    ko: "전송 중 오류가 발생했습니다.",
    pt: "Ocorreu um erro ao enviar.",
    ur: "بھیجتے وقت ایک خرابی پیش آئی۔",
    ja: "送信中にエラーが発生しました。",
  },
  thanks: {
    ar: "نشكرك على مشاركتنا بتجربتك.",
    en: "Thank you for your feedback.",
    fr: "Merci pour votre feedback.",
    de: "Vielen Dank für Ihre Feedback.",
    es: "Gracias por su retroalimentación.",
    tr: "Teşekkürler için geri bildiriminiz.",
    ru: "Спасибо за ваше отзыв.",
    zh: "感谢您的反馈。",
    ko: "감사합니다. 피드백을 남겨주세요.",
    pt: "Obrigado pelo seu feedback.",
    ur: "کمک کے لیے آپ کا رีวิว بھیجیں۔",
    ja: "フィードバックをありがとうございます。",
  },
  confirm: {
    ar: "تم",
    en: "Done",
    fr: "Fait",
    de: "Fertig",
    es: "Hecho",
    tr: "Tamam",
    ru: "Готово",
    zh: "完成",
    ko: "완료",
    pt: "Feito",
    ur: "تم",
    ja: "完了",
  }

};

const ModalAddRates = ({ showModalAddRate, hideModalAddRate, modelId, modelType }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { saveRate } = useRates();
  const { currentLanguage } = useLanguage(); // 👈 current language

  const handleRating = (rate) => setRating(rate);

  const onDrop = (acceptedFiles) => {
    const newImages = [];
    acceptedFiles.forEach((file) => {
      if (images.every((image) => image.name !== file.name)) {
        newImages.push(file);
        toast.success(translations.addImages[currentLanguage]);
      } else {
        toast.error(translations.existsImage[currentLanguage]);
      }
    });
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    toast.success(translations.removeImage[currentLanguage]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const [showsuccessModalSend, setShowsuccessModalSend] = useState(false);
  const hideSuccessModalSend = () => setShowsuccessModalSend(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error(translations.ratingStar[currentLanguage]);
      return;
    }
    if (!modelId || !modelType) {
      toast.error(translations.invalidRates[currentLanguage]);
      return;
    }

    setLoading(true);
    try {
      const payload = { rate: rating, comment, model_id: modelId, model_type: modelType, images };
      await saveRate(payload);
      setShowsuccessModalSend(true);
      hideModalAddRate();
      toast.success(translations.successSend[currentLanguage]);
      setRating(0);
      setComment("");
      setImages([]);
    } catch (err) {
      toast.error(translations.errorSend[currentLanguage]);
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
        titleSend={translations.successSend[currentLanguage]}
        isTrueText={true}
        textSend={translations.thanks[currentLanguage]}
        textButton={translations.confirm[currentLanguage]}
      />
      <CustomModal
        show={showModalAddRate}
        onHide={hideModalAddRate}
        title={translations.title[currentLanguage]}
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
                {translations.labelComment[currentLanguage]}
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="form-teaxtarea"
                maxLength={300}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>

          <div className="add-image-modal mt-3">
            <h2 className="title mb-3">{translations.addImages[currentLanguage]}</h2>
            <div className="all-uploaded-image">
              <div className="uploade-image-text" {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="content-info-title d-flex justify-content-center align-items-center gap-2">
                  <FontAwesomeIcon icon={faPlus} /> {translations.addImages[currentLanguage]}
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
            {loading ? translations.sending[currentLanguage] : translations.send[currentLanguage]}
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default ModalAddRates;
