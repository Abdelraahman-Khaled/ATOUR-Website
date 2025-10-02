import ReadMoreText from "Components/Ui/ReadMoreText/ReadMoreText";
import WhatsAppIcon from "assets/Icons/WhatsAppIcon";
import { useLanguage } from "Components/Languages/LanguageContext";
import WhyBookingAtour from "./WhyBookingAtour";
import { useFooter } from "context/FooterContext";

const TextContent = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { footerData } = useFooter()
  // Multi-language translations
  const content = {
    whyBook: {
      ar: "لماذا يجب أن تحجز جولة معنا؟",
      en: "Why Should You Book Your Trip With Us?",
      fr: "Pourquoi réserver votre voyage avec nous ?",
      de: "Warum sollten Sie Ihre Reise bei uns buchen?",
      es: "¿Por qué deberías reservar tu viaje con nosotros?",
      tr: "Neden bizimle seyahatinizi rezerve etmelisiniz?",
      ru: "Почему вы должны забронировать поездку у нас?",
      zh: "为什么要和我们预订旅行？",
      ko: "왜 우리와 함께 여행을 예약해야 합니까?",
      pt: "Por que deve reservar a sua viagem connosco?",
      ur: "آپ کو ہمارے ساتھ اپنا سفر کیوں بک کرنا چاہئے؟",
      ja: "なぜ私たちと一緒に旅行を予約すべきですか？",
    },
    cancellationPolicy: {
      ar: "سياسة مرنة لإلغاء الحجز",
      en: "Flexible Cancellation Policy",
      fr: "Politique d'annulation flexible",
      de: "Flexible Stornierungsrichtlinie",
      es: "Política de cancelación flexible",
      tr: "Esnek İptal Politikası",
      ru: "Гибкая политика отмены",
      zh: "灵活的取消政策",
      ko: "유연한 취소 정책",
      pt: "Política de cancelamento flexível",
      ur: "لچکدار منسوخی کی پالیسی",
      ja: "柔軟なキャンセルポリシー",
    },
    companyRequests: {
      ar: "لحجوزات الشركات و الجهات الحكومية و الطلبات الخاصة",
      en: "For Group Bookings and Corporate Inquiries",
      fr: "Pour les réservations de groupe et les demandes d'entreprise",
      de: "Für Gruppenbuchungen und Firmenanfragen",
      es: "Para reservas grupales y consultas corporativas",
      tr: "Grup Rezervasyonları ve Kurumsal Talepler İçin",
      ru: "Для групповых бронирований и корпоративных запросов",
      zh: "团体预订和企业咨询",
      ko: "단체 예약 및 기업 문의",
      pt: "Para reservas de grupo e pedidos corporativos",
      ur: "گروپ بکنگز اور کارپوریٹ استفسارات کے لئے",
      ja: "団体予約や法人のお問い合わせ",
    },
    text: {
      ar: `نحن نقدم لك تجربة سفر استثنائية تتميز بالجودة والراحة والاهتمام بكل التفاصيل. معنا، يمكنك استكشاف العالم بكل سهولة واطمئنان، مع ضمان تجربة لا تُنسى.`,
      en: `We offer you an exceptional travel experience characterized by quality, comfort, and attention to every detail. With us, you can explore the world with ease and confidence, ensuring a journey you'll never forget.`,
      fr: `Nous vous offrons une expérience de voyage exceptionnelle caractérisée par la qualité, le confort et l'attention portée à chaque détail. Avec nous, vous pouvez explorer le monde en toute simplicité et confiance, garantissant un voyage inoubliable.`,
      de: `Wir bieten Ihnen ein außergewöhnliches Reiseerlebnis, das durch Qualität, Komfort und Liebe zum Detail geprägt ist. Mit uns können Sie die Welt mühelos und mit Vertrauen erkunden und ein unvergessliches Erlebnis genießen.`,
      es: `Le ofrecemos una experiencia de viaje excepcional caracterizada por la calidad, la comodidad y la atención a cada detalle. Con nosotros, puede explorar el mundo con facilidad y confianza, asegurando un viaje inolvidable.`,
      tr: `Size kalite, konfor ve her detaya özen gösterilen olağanüstü bir seyahat deneyimi sunuyoruz. Bizimle dünyayı kolaylıkla ve güvenle keşfedin, unutulmaz bir yolculuk yaşayın.`,
      ru: `Мы предлагаем вам исключительный туристический опыт, характеризующийся качеством, комфортом и вниманием к каждой детали. С нами вы сможете легко и уверенно исследовать мир и получить незабываемое путешествие.`,
      zh: `我们为您提供卓越的旅行体验，以质量、舒适和对细节的关注为特色。与我们一起，您可以轻松、自信地探索世界，确保一段难忘的旅程。`,
      ko: `품질, 편안함 및 세심한 배려가 특징인 특별한 여행 경험을 제공합니다. 저희와 함께라면 세상을 쉽고 자신 있게 탐험하여 잊지 못할 여행을 보장합니다.`,
      pt: `Oferecemos-lhe uma experiência de viagem excecional caracterizada pela qualidade, conforto e atenção a cada detalhe. Connosco, pode explorar o mundo com facilidade e confiança, garantindo uma viagem inesquecível.`,
      ur: `ہم آپ کو ایک غیرمعمولی سفری تجربہ فراہم کرتے ہیں جس کی خصوصیات معیار، آرام اور ہر تفصیل پر توجہ دینا ہے۔ ہمارے ساتھ آپ دنیا کو آسانی اور اعتماد کے ساتھ دریافت کر سکتے ہیں اور ایک ناقابلِ فراموش سفر کو یقینی بنا سکتے ہیں۔`,
      ja: `私たちは、品質、快適さ、そして細部へのこだわりを特徴とする特別な旅行体験を提供します。私たちと一緒なら、安心して世界を探索でき、忘れられない旅が保証されます。`,
    },
    cancellationText: {
      ar: `نفهم أن الخطط قد تتغير. لذلك، نوفر لك سياسة إلغاء مرنة تتيح لك تعديل أو إلغاء حجزك بسهولة ودون أي قلق.`,
      en: `We understand that plans can change. That’s why we provide a flexible cancellation policy, allowing you to modify or cancel your booking with ease and peace of mind.`,
      fr: `Nous comprenons que les plans puissent changer. C'est pourquoi nous proposons une politique d'annulation flexible, vous permettant de modifier ou d'annuler facilement votre réservation en toute tranquillité.`,
      de: `Wir verstehen, dass sich Pläne ändern können. Deshalb bieten wir eine flexible Stornierungsrichtlinie an, mit der Sie Ihre Buchung einfach und sorgenfrei ändern oder stornieren können.`,
      es: `Entendemos que los planes pueden cambiar. Por eso ofrecemos una política de cancelación flexible que le permite modificar o cancelar su reserva fácilmente y con tranquilidad.`,
      tr: `Planların değişebileceğini anlıyoruz. Bu yüzden, rezervasyonunuzu kolayca ve endişe duymadan değiştirmenize veya iptal etmenize olanak tanıyan esnek bir iptal politikası sunuyoruz.`,
      ru: `Мы понимаем, что планы могут измениться. Поэтому мы предоставляем гибкую политику отмены, позволяющую вам легко изменить или отменить бронирование без лишних забот.`,
      zh: `我们理解计划可能会改变。因此，我们提供灵活的取消政策，让您可以轻松修改或取消预订，安心无忧。`,
      ko: `계획은 변할 수 있다는 것을 이해합니다. 그래서 우리는 유연한 취소 정책을 제공하여 예약을 쉽게 변경하거나 취소할 수 있도록 하고 있습니다.`,
      pt: `Compreendemos que os planos podem mudar. É por isso que oferecemos uma política de cancelamento flexível, permitindo-lhe modificar ou cancelar a sua reserva com facilidade e tranquilidade.`,
      ur: `ہم سمجھتے ہیں کہ منصوبے بدل سکتے ہیں۔ اسی لئے ہم ایک لچکدار منسوخی کی پالیسی فراہم کرتے ہیں جو آپ کو اپنی بکنگ کو آسانی سے اور سکون کے ساتھ منسوخ یا تبدیل کرنے کی اجازت دیتی ہے۔`,
      ja: `計画は変わることがあると理解しています。そのため、柔軟なキャンセルポリシーを提供し、予約を簡単かつ安心して変更またはキャンセルできるようにしています。`,
    },
    whatsapp: {
      ar: "تواصل معنا عبر واتساب",
      en: "Contact Us via WhatsApp",
      fr: "Contactez-nous via WhatsApp",
      de: "Kontaktieren Sie uns über WhatsApp",
      es: "Contáctenos a través de WhatsApp",
      tr: "WhatsApp ile bizimle iletişime geçin",
      ru: "Свяжитесь с нами через WhatsApp",
      zh: "通过WhatsApp联系我们",
      ko: "WhatsApp으로 문의하기",
      pt: "Contacte-nos via WhatsApp",
      ur: "واٹس ایپ کے ذریعے ہم سے رابطہ کریں",
      ja: "WhatsAppでお問い合わせください",
    },
  };

  return (
    <div className="all-text-content-info margin-top-1 d-flex flex-column gap-3">
      {/* ============ START TEXT CONTENT ONE =========== */}
      {/* <WhyBookingAtour /> */}

      {/* ============ START TEXT CONTENT TWO =========== */}
      <div className="text-content-one pt-3">
        <h2 className="title">{content.cancellationPolicy[currentLanguage]}</h2>
        <ReadMoreText
          newClass="mt-2"
          text={content.cancellationText[currentLanguage]}
          maxLength={120}
        />
      </div>

      {/* ============ START CONTACT US ============ */}
      <div className="contact-us-content border-top pt-4 d-flex justify-content-between align-items-center gap-2 flex-wrap">
        <h2 className="title">{content.companyRequests[currentLanguage]}</h2>
        <a
          href={`https://wa.me/${footerData.whatsapp}`}
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
