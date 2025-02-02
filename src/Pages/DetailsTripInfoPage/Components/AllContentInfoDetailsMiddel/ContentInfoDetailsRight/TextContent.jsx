import ReadMoreText from "Components/Ui/ReadMoreText/ReadMoreText";
import WhatsAppIcon from "assets/Icons/WhatsAppIcon";
import { useLanguage } from "Components/Languages/LanguageContext";

const TextContent = () => {
  const { currentLanguage } = useLanguage(); // Get the current language

  // Enhanced content for both languages
  const content = {
    whyBook: {
      ar: "لماذا يجب أن تحجز رحلتك معنا؟",
      en: "Why Should You Book Your Trip With Us?",
    },
    cancellationPolicy: {
      ar: "سياسة مرنة لإلغاء الحجز",
      en: "Flexible Cancellation Policy",
    },
    companyRequests: {
      ar: "لحجوزات الشركات و الجهات الحكومية و الطلبات الخاصة",
      en: "For Group Bookings and Corporate Inquiries",
    },
    text: {
      ar: `نحن نقدم لك تجربة سفر استثنائية تتميز بالجودة والراحة والاهتمام بكل التفاصيل. معنا، يمكنك استكشاف العالم بكل سهولة واطمئنان، مع ضمان تجربة لا تُنسى.`,
      en: `We offer you an exceptional travel experience characterized by quality, comfort, and attention to every detail. With us, you can explore the world with ease and confidence, ensuring a journey you'll never forget.`,
    },
    cancellationText: {
      ar: `نفهم أن الخطط قد تتغير. لذلك، نوفر لك سياسة إلغاء مرنة تتيح لك تعديل أو إلغاء حجزك بسهولة ودون أي قلق.`,
      en: `We understand that plans can change. That’s why we provide a flexible cancellation policy, allowing you to modify or cancel your booking with ease and peace of mind.`,
    },
    whatsapp: {
      ar: "تواصل معنا عبر واتساب",
      en: "Contact Us via WhatsApp",
    },
  };

  return (
    <div className="all-text-content-info margin-top-1 d-flex flex-column gap-3">
      {/* ============ START TEXT CONTENT ONE =========== */}
      <div className="text-content-one border-top pt-3">
        <h2 className="title">{content.whyBook[currentLanguage]}</h2>
        <ReadMoreText
          newClass="mt-2"
          text={content.text[currentLanguage]}
          maxLength={120}
        />
      </div>
      {/* ============ END TEXT CONTENT ONE =========== */}

      {/* ============ START TEXT CONTENT TWO =========== */}
      <div className="text-content-one border-top pt-3">
        <h2 className="title">{content.cancellationPolicy[currentLanguage]}</h2>
        <ReadMoreText
          newClass="mt-2"
          text={content.cancellationText[currentLanguage]}
          maxLength={120}
        />
      </div>
      {/* ============ END TEXT CONTENT TWO =========== */}

      {/* ============ START CONTACT US ============ */}
      <div className="contact-us-content border-top pt-4 d-flex justify-content-between align-items-center gap-2 flex-wrap">
        <h2 className="title">{content.companyRequests[currentLanguage]}</h2>
        <a
          href="https://wa.me/01211456847"
          target="_blank"
          className="link-whatsapp btn-main"
          rel="noreferrer"
        >
          {content.whatsapp[currentLanguage]} <WhatsAppIcon />
        </a>
      </div>
      {/* ============ END CONTACT US ============ */}
    </div>
  );
};

export default TextContent;
