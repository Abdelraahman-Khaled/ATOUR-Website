import React, { useEffect, useState } from 'react';
import './ContactUsPage.css';
import GeneralAPI from '../../api/generalApi';
import { toast } from 'react-toastify';
import { useLanguage } from 'Components/Languages/LanguageContext';
import { isAuthenticated } from '../../api/axiosInstance';
import FormAuth from '../../Components/Auth/FormAuth/FormAuth';

const contactUsTranslations = {
  ar: {
    welcomeTitle: "مرحبا بك في جولة",
    welcomeText: "يسعدنا التواصل معك في أي وقت",
    inquiryTitle: "لديك مشكلة أو إستفسار؟",
    inquiryText: "يمكنك إرسال تذكرة وسنقوم بالتواصل معك في أقرب وقت",
    titlePlaceholder: "العنوان",
    descriptionPlaceholder: "وصف",
    send: "إرسال",
    sending: "جاري الإرسال...",
    toastEmpty: "العنوان والوصف لا يمكن أن يكونا فارغين.",
    toastSuccess: "تم إرسال التذكرة بنجاح!",
    toastFail: "فشل في إرسال التذكرة.",
    toastFooterFail: "غير قادر على جلب بيانات التذييل. حاول مرة أخرى لاحقًا.",
  },
  en: {
    welcomeTitle: "Welcome to Atour",
    welcomeText: "We are happy to connect with you anytime",
    inquiryTitle: "Do you have a problem or inquiry?",
    inquiryText: "You can send a ticket and we will contact you as soon as possible",
    titlePlaceholder: "Title",
    descriptionPlaceholder: "Description",
    send: "Send",
    sending: "Sending...",
    toastEmpty: "Title and description cannot be empty.",
    toastSuccess: "Ticket sent successfully!",
    toastFail: "Failed to send ticket.",
    toastFooterFail: "Unable to fetch footer data. Please try again later.",
  },
  fr: {
    welcomeTitle: "Bienvenue à Atour",
    welcomeText: "Nous sommes heureux de vous contacter à tout moment",
    inquiryTitle: "Vous avez un problème ou une question ?",
    inquiryText: "Vous pouvez envoyer un ticket et nous vous contacterons dès que possible",
    titlePlaceholder: "Titre",
    descriptionPlaceholder: "Description",
    send: "Envoyer",
    sending: "Envoi...",
    toastEmpty: "Le titre et la description ne peuvent pas être vides.",
    toastSuccess: "Ticket envoyé avec succès !",
    toastFail: "Échec de l'envoi du ticket.",
    toastFooterFail: "Impossible de récupérer les données du pied de page. Veuillez réessayer plus tard.",
  },
  de: {
    welcomeTitle: "Willkommen bei Atour",
    welcomeText: "Wir freuen uns, jederzeit mit Ihnen in Kontakt zu treten",
    inquiryTitle: "Haben Sie ein Problem oder eine Anfrage?",
    inquiryText: "Sie können ein Ticket senden und wir werden Sie so schnell wie möglich kontaktieren",
    titlePlaceholder: "Titel",
    descriptionPlaceholder: "Beschreibung",
    send: "Senden",
    sending: "Wird gesendet...",
    toastEmpty: "Titel und Beschreibung dürfen nicht leer sein.",
    toastSuccess: "Ticket erfolgreich gesendet!",
    toastFail: "Fehler beim Senden des Tickets.",
    toastFooterFail: "Fußzeilendaten konnten nicht abgerufen werden. Bitte versuchen Sie es später erneut.",
  },
  es: {
    welcomeTitle: "Bienvenido a Atour",
    welcomeText: "Estamos felices de conectarnos contigo en cualquier momento",
    inquiryTitle: "¿Tienes un problema o consulta?",
    inquiryText: "Puedes enviar un ticket y nos pondremos en contacto contigo lo antes posible",
    titlePlaceholder: "Título",
    descriptionPlaceholder: "Descripción",
    send: "Enviar",
    sending: "Enviando...",
    toastEmpty: "El título y la descripción no pueden estar vacíos.",
    toastSuccess: "¡Ticket enviado con éxito!",
    toastFail: "Error al enviar el ticket.",
    toastFooterFail: "No se pueden obtener los datos del pie de página. Inténtelo de nuevo más tarde.",
  },
  tr: {
    welcomeTitle: "Atour'ya hoş geldiniz",
    welcomeText: "Sizinle her zaman iletişim kurmaktan mutluluk duyarız",
    inquiryTitle: "Bir sorununuz veya sorunuz mu var?",
    inquiryText: "Bir bilet gönderebilirsiniz, en kısa sürede sizinle iletişime geçeceğiz",
    titlePlaceholder: "Başlık",
    descriptionPlaceholder: "Açıklama",
    send: "Gönder",
    sending: "Gönderiliyor...",
    toastEmpty: "Başlık ve açıklama boş olamaz.",
    toastSuccess: "Bilet başarıyla gönderildi!",
    toastFail: "Bilet gönderilemedi.",
    toastFooterFail: "Altbilgi verileri alınamadı. Lütfen daha sonra tekrar deneyin.",
  },
  ru: {
    welcomeTitle: "Добро пожаловать в Atour",
    welcomeText: "Мы рады связаться с вами в любое время",
    inquiryTitle: "У вас есть проблема или вопрос?",
    inquiryText: "Вы можете отправить заявку, и мы свяжемся с вами как можно скорее",
    titlePlaceholder: "Заголовок",
    descriptionPlaceholder: "Описание",
    send: "Отправить",
    sending: "Отправка...",
    toastEmpty: "Заголовок и описание не могут быть пустыми.",
    toastSuccess: "Заявка успешно отправлена!",
    toastFail: "Не удалось отправить заявку.",
    toastFooterFail: "Не удалось получить данные подвала. Пожалуйста, попробуйте позже.",
  },
  zh: {
    welcomeTitle: "欢迎来到 Atour",
    welcomeText: "我们随时乐意与您联系",
    inquiryTitle: "您有问题或疑问吗？",
    inquiryText: "您可以提交工单，我们会尽快与您联系",
    titlePlaceholder: "标题",
    descriptionPlaceholder: "描述",
    send: "发送",
    sending: "发送中...",
    toastEmpty: "标题和描述不能为空。",
    toastSuccess: "工单提交成功！",
    toastFail: "工单提交失败。",
    toastFooterFail: "无法获取页脚数据。请稍后再试。",
  },
  ko: {
    welcomeTitle: "Atour에 오신 것을 환영합니다",
    welcomeText: "언제든지 연락드리게 되어 기쁩니다",
    inquiryTitle: "문제나 문의사항이 있습니까?",
    inquiryText: "티켓을 보내주시면 가능한 한 빨리 연락드리겠습니다",
    titlePlaceholder: "제목",
    descriptionPlaceholder: "설명",
    send: "보내기",
    sending: "전송 중...",
    toastEmpty: "제목과 설명은 비워둘 수 없습니다.",
    toastSuccess: "티켓이 성공적으로 전송되었습니다!",
    toastFail: "티켓 전송에 실패했습니다.",
    toastFooterFail: "푸터 데이터를 가져올 수 없습니다. 나중에 다시 시도해주세요.",
  },
  pt: {
    welcomeTitle: "Bem-vindo ao Atour",
    welcomeText: "Temos prazer em nos conectar com você a qualquer momento",
    inquiryTitle: "Você tem um problema ou dúvida?",
    inquiryText: "Você pode enviar um ticket e entraremos em contato o mais rápido possível",
    titlePlaceholder: "Título",
    descriptionPlaceholder: "Descrição",
    send: "Enviar",
    sending: "Enviando...",
    toastEmpty: "O título e a descrição não podem estar vazios.",
    toastSuccess: "Ticket enviado com sucesso!",
    toastFail: "Falha ao enviar o ticket.",
    toastFooterFail: "Não foi possível buscar os dados do rodapé. Por favor, tente novamente mais tarde.",
  },
  ur: {
    welcomeTitle: "جولا میں خوش آمدید",
    welcomeText: "ہم آپ سے کسی بھی وقت جڑنے پر خوش ہیں",
    inquiryTitle: "کیا آپ کو کوئی مسئلہ یا استفسار ہے؟",
    inquiryText: "آپ ٹکٹ بھیج سکتے ہیں اور ہم جلد از جلد آپ سے رابطہ کریں گے",
    titlePlaceholder: "عنوان",
    descriptionPlaceholder: "تفصیل",
    send: "بھیجیں",
    sending: "بھیجا جا رہا ہے...",
    toastEmpty: "عنوان اور تفصیل خالی نہیں ہو سکتے۔",
    toastSuccess: "ٹکٹ کامیابی سے بھیج دیا گیا!",
    toastFail: "ٹکٹ بھیجنے میں ناکام رہا۔",
    toastFooterFail: "فوٹر ڈیٹا حاصل نہیں کیا جا سکا۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",
  },
  ja: {
    welcomeTitle: "Atourへようこそ",
    welcomeText: "いつでもご連絡いただければ幸いです",
    inquiryTitle: "問題やお問い合わせがありますか？",
    inquiryText: "チケットを送信していただければ、できるだけ早くご連絡いたします",
    titlePlaceholder: "タイトル",
    descriptionPlaceholder: "説明",
    send: "送信",
    sending: "送信中...",
    toastEmpty: "タイトルと説明を空にすることはできません。",
    toastSuccess: "チケットが正常に送信されました！",
    toastFail: "チケットの送信に失敗しました。",
    toastFooterFail: "フッターデータを取得できません。後でもう一度お試しください。",
  },
};



const ContactUsPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [footerData, setFooterData] = useState(null);
  const { currentLanguage } = useLanguage();
  const [isAuth, setIsAuth] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const authenticated = isAuthenticated();
    setIsAuth(authenticated);
    // Removed: if (!authenticated) { setShowAuthModal(true); }
    const fetchFooterData = async () => {
      try {
        const response = await GeneralAPI.getFooterSocial();
        setFooterData(response.data);
      } catch (err) {
        console.error("Failed to fetch footer data:", err);
        toast.error("Unable to fetch footer data. Please try again later.");
      }
    };
    fetchFooterData();
  }, []);

  const handleSubmit = async () => {
    if (!isAuth) {
      setShowAuthModal(true);
      return;
    }
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      await GeneralAPI.sendTicket({ title, description });
      toast.success('Ticket sent successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to send ticket.');
      console.error('Error sending ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-page">
      <div className="content-section">
        <div className="welcome-message mb-3">
          <h2 className='mb-1'>{contactUsTranslations[currentLanguage].welcomeTitle}</h2>
          <p className="mb-2">{contactUsTranslations[currentLanguage].welcomeText}</p>
        </div>
        <div className="social-media-icons">
          {footerData?.footer_linkedin && (
            <a href={footerData.footer_linkedin} target="_blank" rel="noopener noreferrer" className="icon-circle"><i className="fab fa-linkedin-in"></i></a>
          )}
          {footerData?.footer_tiktok && (
            <a href={footerData.footer_tiktok} target="_blank" rel="noopener noreferrer" className="icon-circle"><i className="fab fa-tiktok"></i></a>
          )}
          {footerData?.footer_instagram && (
            <a href={footerData.footer_instagram} target="_blank" rel="noopener noreferrer" className="icon-circle"><i className="fab fa-instagram"></i></a>
          )}
          {footerData?.footer_twitter && (
            <a href={footerData.footer_twitter} target="_blank" rel="noopener noreferrer" className="icon-circle"><i className="fab fa-twitter"></i></a>
          )}
          {footerData?.footer_snapchat && (
            <a href={footerData.footer_snapchat} target="_blank" rel="noopener noreferrer" className="icon-circle"><i className="fab fa-snapchat-ghost"></i></a>
          )}
        </div>
        <div className="contact-info">
          <div className="contact-card">
            <i className="fas fa-envelope"></i>
            <span>{footerData?.email}</span>
          </div>
          <div className="contact-card">
            <i className="fas fa-phone"></i>
            <span>{footerData?.phone}</span>
          </div>
        </div>
        <div className="inquiry-section mt-3">
          <h3 className="mb-2">{contactUsTranslations[currentLanguage].inquiryTitle}</h3>
          <p className="mb-3">{contactUsTranslations[currentLanguage].inquiryText}</p>
          <input type="text" placeholder={contactUsTranslations[currentLanguage].titlePlaceholder} className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} />
          <textarea placeholder={contactUsTranslations[currentLanguage].descriptionPlaceholder} className="textarea-field" value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading}></textarea>
          <button
            className="send-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? contactUsTranslations[currentLanguage].sending
              : contactUsTranslations[currentLanguage].send}
          </button>
        </div>
      </div>
      <FormAuth showModalForm={showAuthModal} hideModalForm={() => setShowAuthModal(false)} />
    </div>
  );
};

export default ContactUsPage;