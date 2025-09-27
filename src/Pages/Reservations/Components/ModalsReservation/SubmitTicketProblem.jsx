import CustomModal from "Components/CustomModal/CustomModal";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import TextAreaInput from "Components/Forms/TextArea";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";
import { useState } from "react";
import * as Yup from "yup";
import GeneralAPI from "api/generalApi";
import { toast } from "react-toastify";
import { useLanguage } from "Components/Languages/LanguageContext";

const SubmitTicketProblem = ({ showSubmitTicket, hideSubmitTicket }) => {
  const { currentLanguage } = useLanguage();

  const content = {
    ar: {
      modalTitle: "إرسال تذكرة",
      modalQuestion: "هل تواجه أي مشكلة في الحجز ؟",
      modalText: "يمكنك إرسال تذكرة وسنقوم بالتواصل معك في أقرب وقت",
      titleProblem: "عنوان المشكلة",
      detailsProblem: "التفاصيل",
      placeholderTitle: "عنوان المشكلة",
      placeholderDetails: "التفاصيل",
      send: "إرسال",
      sending: "جاري الإرسال...",
      successTitle: "إرسال التذكرة",
      successMessage: "تم إرسال التذكرة بنجاح!",
      successText: "لقد تم إرسال التذكرة بنجاح وسيتم التواصل معك في أقرب وقت",
      buttonText: "حجوزاتي",
      requiredTitle: "يرجى إدخال عنوان المشكلة",
      requiredDetails: "يرجى إدخال التفاصيل",
      ticketSentSuccess: "تم إرسال التذكرة بنجاح",
      ticketSentFailure: "فشل إرسال التذكرة"
    },
    en: {
      modalTitle: "Submit Ticket",
      modalQuestion: "Are you facing any problem with booking?",
      modalText: "You can submit a ticket and we will contact you shortly.",
      titleProblem: "Problem Title",
      detailsProblem: "Details",
      placeholderTitle: "Enter problem title",
      placeholderDetails: "Enter details",
      send: "Submit",
      sending: "Sending...",
      successTitle: "Ticket Submitted",
      successMessage: "Ticket sent successfully!",
      successText: "Your ticket has been sent successfully and we will contact you soon.",
      buttonText: "My Bookings",
      requiredTitle: "Please enter the problem title",
      requiredDetails: "Please enter the details",
      ticketSentSuccess: "Ticket sent successfully",
      ticketSentFailure: "Failed to send ticket"
    },
    fr: {
      modalTitle: "Soumettre un ticket",
      modalQuestion: "Rencontrez-vous un problème avec la réservation ?",
      modalText: "Vous pouvez soumettre un ticket et nous vous contacterons rapidement.",
      titleProblem: "Titre du problème",
      detailsProblem: "Détails",
      placeholderTitle: "Entrez le titre du problème",
      placeholderDetails: "Entrez les détails",
      send: "Soumettre",
      sending: "Envoi en cours...",
      successTitle: "Ticket soumis",
      successMessage: "Ticket envoyé avec succès !",
      successText: "Votre ticket a été envoyé avec succès et nous vous contacterons bientôt.",
      buttonText: "Mes réservations",
      requiredTitle: "Veuillez entrer le titre du problème",
      requiredDetails: "Veuillez entrer les détails",
      ticketSentSuccess: "Ticket envoyé avec succès",
      ticketSentFailure: "Échec de l'envoi du ticket"
    },
    de: {
      modalTitle: "Ticket einreichen",
      modalQuestion: "Haben Sie ein Problem mit der Buchung?",
      modalText: "Sie können ein Ticket einreichen und wir werden Sie bald kontaktieren.",
      titleProblem: "Problem Titel",
      detailsProblem: "Details",
      placeholderTitle: "Problemtitel eingeben",
      placeholderDetails: "Details eingeben",
      send: "Einreichen",
      sending: "Senden...",
      successTitle: "Ticket eingereicht",
      successMessage: "Ticket erfolgreich gesendet!",
      successText: "Ihr Ticket wurde erfolgreich gesendet und wir werden Sie bald kontaktieren.",
      buttonText: "Meine Buchungen",
      requiredTitle: "Bitte geben Sie den Problemtitel ein",
      requiredDetails: "Bitte geben Sie die Details ein",
      ticketSentSuccess: "Ticket erfolgreich gesendet",
      ticketSentFailure: "Ticket konnte nicht gesendet werden"
    },
    es: {
      modalTitle: "Enviar ticket",
      modalQuestion: "¿Tiene algún problema con la reserva?",
      modalText: "Puede enviar un ticket y nos pondremos en contacto con usted pronto.",
      titleProblem: "Título del problema",
      detailsProblem: "Detalles",
      placeholderTitle: "Ingrese el título del problema",
      placeholderDetails: "Ingrese los detalles",
      send: "Enviar",
      sending: "Enviando...",
      successTitle: "Ticket enviado",
      successMessage: "¡Ticket enviado con éxito!",
      successText: "Su ticket ha sido enviado con éxito y nos pondremos en contacto pronto.",
      buttonText: "Mis reservas",
      requiredTitle: "Por favor ingrese el título del problema",
      requiredDetails: "Por favor ingrese los detalles",
      ticketSentSuccess: "¡Ticket enviado con éxito!",
      ticketSentFailure: "Error al enviar el ticket"
    },
    tr: {
      modalTitle: "Bilet Gönder",
      modalQuestion: "Rezervasyonla ilgili bir sorun mu yaşıyorsunuz?",
      modalText: "Bir bilet gönderebilirsiniz, kısa süre içinde sizinle iletişime geçeceğiz.",
      titleProblem: "Sorun Başlığı",
      detailsProblem: "Detaylar",
      placeholderTitle: "Sorun başlığını girin",
      placeholderDetails: "Detayları girin",
      send: "Gönder",
      sending: "Gönderiliyor...",
      successTitle: "Bilet Gönderildi",
      successMessage: "Bilet başarıyla gönderildi!",
      successText: "Biletiniz başarıyla gönderildi, kısa süre içinde sizinle iletişime geçeceğiz.",
      buttonText: "Rezervasyonlarım",
      requiredTitle: "Lütfen sorun başlığını girin",
      requiredDetails: "Lütfen detayları girin",
      ticketSentSuccess: "Bilet başarıyla gönderildi",
      ticketSentFailure: "Bilet gönderme başarısız oldu"
    },
    ru: {
      modalTitle: "Отправить заявку",
      modalQuestion: "У вас возникли проблемы с бронированием?",
      modalText: "Вы можете отправить заявку, и мы свяжемся с вами в ближайшее время.",
      titleProblem: "Заголовок проблемы",
      detailsProblem: "Детали",
      placeholderTitle: "Введите заголовок проблемы",
      placeholderDetails: "Введите детали",
      send: "Отправить",
      sending: "Отправка...",
      successTitle: "Заявка отправлена",
      successMessage: "Заявка успешно отправлена!",
      successText: "Ваша заявка успешно отправлена, мы свяжемся с вами в ближайшее время.",
      buttonText: "Мои бронирования",
      requiredTitle: "Пожалуйста, введите заголовок проблемы",
      requiredDetails: "Пожалуйста, введите детали",
      ticketSentSuccess: "Заявка успешно отправлена",
      ticketSentFailure: "Не удалось отправить заявку"
    },
    zh: {
      modalTitle: "提交工单",
      modalQuestion: "您在预订时遇到问题了吗？",
      modalText: "您可以提交工单，我们会尽快与您联系。",
      titleProblem: "问题标题",
      detailsProblem: "详情",
      placeholderTitle: "输入问题标题",
      placeholderDetails: "输入详情",
      send: "提交",
      sending: "提交中...",
      successTitle: "工单已提交",
      successMessage: "工单提交成功！",
      successText: "您的工单已成功提交，我们会尽快与您联系。",
      buttonText: "我的预订",
      requiredTitle: "请输入问题标题",
      requiredDetails: "请输入详情",
      ticketSentSuccess: "工单提交成功",
      ticketSentFailure: "工单提交失败"
    },
    ko: {
      modalTitle: "티켓 제출",
      modalQuestion: "예약에 문제가 있나요?",
      modalText: "티켓을 제출하시면 곧 연락드리겠습니다.",
      titleProblem: "문제 제목",
      detailsProblem: "세부 사항",
      placeholderTitle: "문제 제목 입력",
      placeholderDetails: "세부 사항 입력",
      send: "제출",
      sending: "제출 중...",
      successTitle: "티켓 제출됨",
      successMessage: "티켓이 성공적으로 제출되었습니다!",
      successText: "티켓이 성공적으로 제출되었으며 곧 연락드리겠습니다.",
      buttonText: "내 예약",
      requiredTitle: "문제 제목을 입력하세요",
      requiredDetails: "세부 사항을 입력하세요",
      ticketSentSuccess: "티켓이 성공적으로 제출되었습니다",
      ticketSentFailure: "티켓 제출 실패"
    },
    pt: {
      modalTitle: "Enviar Ticket",
      modalQuestion: "Você está enfrentando algum problema com a reserva?",
      modalText: "Você pode enviar um ticket e entraremos em contato em breve.",
      titleProblem: "Título do problema",
      detailsProblem: "Detalhes",
      placeholderTitle: "Digite o título do problema",
      placeholderDetails: "Digite os detalhes",
      send: "Enviar",
      sending: "Enviando...",
      successTitle: "Ticket enviado",
      successMessage: "Ticket enviado com sucesso!",
      successText: "Seu ticket foi enviado com sucesso e entraremos em contato em breve.",
      buttonText: "Minhas reservas",
      requiredTitle: "Por favor insira o título do problema",
      requiredDetails: "Por favor insira os detalhes",
      ticketSentSuccess: "Ticket enviado com sucesso",
      ticketSentFailure: "Falha ao enviar ticket"
    },
    ur: {
      modalTitle: "ٹکٹ جمع کریں",
      modalQuestion: "کیا آپ کو بکنگ میں کوئی مسئلہ درپیش ہے؟",
      modalText: "آپ ایک ٹکٹ جمع کر سکتے ہیں اور ہم جلد آپ سے رابطہ کریں گے۔",
      titleProblem: "مسئلے کا عنوان",
      detailsProblem: "تفصیلات",
      placeholderTitle: "مسئلے کا عنوان درج کریں",
      placeholderDetails: "تفصیلات درج کریں",
      send: "جمع کریں",
      sending: "جمع کیا جا رہا ہے...",
      successTitle: "ٹکٹ جمع ہو گیا",
      successMessage: "ٹکٹ کامیابی سے بھیج دیا گیا!",
      successText: "آپ کا ٹکٹ کامیابی سے جمع کر دیا گیا ہے اور ہم جلد آپ سے رابطہ کریں گے۔",
      buttonText: "میری بکنگز",
      requiredTitle: "براہ کرم مسئلے کا عنوان درج کریں",
      requiredDetails: "براہ کرم تفصیلات درج کریں",
      ticketSentSuccess: "ٹکٹ کامیابی سے بھیج دیا گیا",
      ticketSentFailure: "ٹکٹ بھیجنے میں ناکامی"
    },
    ja: {
      modalTitle: "チケットを送信",
      modalQuestion: "予約に問題がありますか？",
      modalText: "チケットを送信すると、すぐにご連絡いたします。",
      titleProblem: "問題のタイトル",
      detailsProblem: "詳細",
      placeholderTitle: "問題のタイトルを入力",
      placeholderDetails: "詳細を入力",
      send: "送信",
      sending: "送信中...",
      successTitle: "チケット送信済み",
      successMessage: "チケットが正常に送信されました！",
      successText: "チケットは正常に送信され、すぐにご連絡いたします。",
      buttonText: "私の予約",
      requiredTitle: "問題のタイトルを入力してください",
      requiredDetails: "詳細を入力してください",
      ticketSentSuccess: "チケットが正常に送信されました",
      ticketSentFailure: "チケットの送信に失敗しました"
    }
  };

  const validationSchema = Yup.object().shape({
    titleProblem: Yup.string().required(content[currentLanguage].requiredTitle),
    detailsProblem: Yup.string().required(content[currentLanguage].requiredDetails),
  });

  const initialValues = {
    titleProblem: "",
    detailsProblem: "",
  };

  const [successSend, setSuccessSend] = useState(false);
  const successSendButton = () => {
    setSuccessSend(true);
    hideSubmitTicket();
  };
  const hidesuccessSendButton = () => {
    setSuccessSend(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      await GeneralAPI.sendTicket({
        title: values.titleProblem,
        description: values.detailsProblem,
      });
      resetForm();
      hideSubmitTicket();
      successSendButton();
      toast.success(content[currentLanguage].ticketSentSuccess);
    } catch (error) {
      toast.error(content[currentLanguage].ticketSentFailure);
      console.error("Error sending ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SuccessSend
        showsuccessModalSend={successSend}
        hideSuccessModalSend={hidesuccessSendButton}
        titleModal={content[currentLanguage].successTitle}
        titleSend={content[currentLanguage].successMessage}
        isTrueText={true}
        textSend={content[currentLanguage].successText}
        textButton={content[currentLanguage].buttonText}
      />
      <CustomModal
        show={showSubmitTicket}
        onHide={hideSubmitTicket}
        title={content[currentLanguage].modalTitle}
        newClass={"modal-sumbit-ticket"}
      >
        <div className="all-info-ticket-submit">
          <h2 className="title">{content[currentLanguage].modalQuestion}</h2>
          <p className="text">{content[currentLanguage].modalText}</p>
          <div className="form-sumbit-ticket">
            <FormField
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <InputFiled
                label={content[currentLanguage].titleProblem}
                name="titleProblem"
                type="text"
                placeholder={content[currentLanguage].placeholderTitle}
                success
              />
              <TextAreaInput
                label={content[currentLanguage].detailsProblem}
                name="detailsProblem"
                type="text"
                placeholder={content[currentLanguage].placeholderDetails}
                success
              />
              <button type="submit" className="btn-main btn-submit  mt-3" disabled={isLoading}>
                {isLoading ? content[currentLanguage].sending : content[currentLanguage].send}
              </button>
            </FormField>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default SubmitTicketProblem;
