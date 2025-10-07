import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import { useProfile } from 'context/ProfileContext';
import { Link } from 'react-router-dom';
import './ChatBot.css';
import lailaAvatar from '../../assets/images/chatbot/lilia-avatar.png';
import userPlaceholder from '../../assets/images/users/user.png';

const ChatBot = () => {
  const { currentLanguage } = useLanguage();
  const { profile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  // name of bot 
  const lilaName = {
    "en": "Lily",
    "ar": "ليلي",
    "fr": "Lily",
    "de": "Lily",
    "es": "Lily",
    "tr": "Lily",
    "ru": "Лили",
    "zh": "莉莉",
    "ko": "릴리",
    "pt": "Lily",
    "ur": "لیلی",
    "ja": "リリー"
  }

  // Toggle chatbot visibility
  const toggleChatBot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Initialize chat with welcome message
      setTimeout(() => {
        addBotMessage(getConversationData().welcome);
        setTimeout(() => {
          addBotMessage(getConversationData().initialPrompt, getConversationData().initialOptions);
        }, 1000);
      }, 500);
    }
  };

  // Add bot message
  const addBotMessage = (text, options = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: text,
        options: options,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random typing delay
  };

  // Add user message
  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date()
    }]);
  };

  // Handle option click
  const handleOptionClick = (optionId, optionText) => {
    // Add user message
    addUserMessage(optionText);

    // Process the conversation flow
    setTimeout(() => {
      handleConversationFlow(optionId);
    }, 500);
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Conversation data with multilingual support
  const conversationData = {
    ar: {
      welcome: "معك ليلى من جولة! 🌟 نورت جولة وأهلاً بك 🤍",
      initialPrompt: "هنا سوف تستكشف اكثر عن السعودية من خلال منصة جولة ومقدمي خدماتها المميزين. راح تعيش تجربة ثقافية 🕌، وتذوق أحلى الأكلات الاصيلة والتراثية بنكهتها وطريقتها الاصلية 🍲، وتزور أجمل الأماكن الأثرية والسياحية وأماكن ماتقدر توصل لها 🏰🌄. يمكنك الضغط على احد الخيارات لمساعدتك:",
      initialOptions: [
        { id: "services", text: " الخدمات" },
        { id: "bookings", text: " الحجوزات" },
        { id: "payment", text: " الدفع" },
        { id: "auth", text: " التسجيل والدخول" },
        { id: "customer_service", text: " التواصل مع خدمة العملاء" }
      ]
    },
    en: {
      welcome: "I'm Layla from Atour! 🌟 Welcome to Atour 🤍",
      initialPrompt: "Here you will explore more about Saudi Arabia through the Atour platform and its distinguished service providers. You will experience cultural adventures 🕌, taste the most delicious authentic and traditional foods with their original flavor and method 🍲, and visit the most beautiful archaeological and tourist places that you can't reach elsewhere 🏰🌄. You can click on one of the options to help you:",
      initialOptions: [
        { id: "services", text: " Services" },
        { id: "bookings", text: " Bookings" },
        { id: "payment", text: " Payment" },
        { id: "auth", text: " Registration & Login" },
        { id: "customer_service", text: " Customer Service" }
      ]
    },
    fr: {
      welcome: "Je suis Layla de Atour! 🌟 Bienvenue à Atour 🤍",
      initialPrompt: "Ici, vous découvrirez davantage sur l'Arabie Saoudite à travers la plateforme Atour et ses prestataires de services distingués. Vous vivrez des aventures culturelles 🕌, goûterez aux délicieux plats authentiques et traditionnels avec leur saveur et méthode originales 🍲, et visiterez les plus beaux sites archéologiques et touristiques que vous ne pourrez pas atteindre ailleurs 🏰🌄. Vous pouvez cliquer sur l'une des options pour vous aider:",
      initialOptions: [
        { id: "services", text: " Services" },
        { id: "bookings", text: " Réservations" },
        { id: "payment", text: " Paiement" },
        { id: "auth", text: " Inscription & Connexion" },
        { id: "customer_service", text: " Service Client" }
      ]
    },
    de: {
      welcome: "Ich bin Layla von Atour! 🌟 Willkommen bei Atour 🤍",
      initialPrompt: "Hier werden Sie mehr über Saudi-Arabien durch die Atour-Plattform und ihre ausgezeichneten Dienstleister entdecken. Sie werden kulturelle Abenteuer erleben 🕌, die köstlichsten authentischen und traditionellen Speisen mit ihrem ursprünglichen Geschmack und ihrer ursprünglichen Methode probieren 🍲 und die schönsten archäologischen und touristischen Orte besuchen, die Sie anderswo nicht erreichen können 🏰🌄. Sie können auf eine der Optionen klicken, um Ihnen zu helfen:",
      initialOptions: [
        { id: "services", text: " Dienstleistungen" },
        { id: "bookings", text: " Buchungen" },
        { id: "payment", text: " Zahlung" },
        { id: "auth", text: " Registrierung & Anmeldung" },
        { id: "customer_service", text: " Kundendienst" }
      ]
    },
    es: {
      welcome: "¡Soy Layla de Atour! 🌟 Bienvenido a Atour 🤍",
      initialPrompt: "Aquí explorarás más sobre Arabia Saudita a través de la plataforma Atour y sus distinguidos proveedores de servicios. Experimentarás aventuras culturales 🕌, probarás las comidas auténticas y tradicionales más deliciosas con su sabor y método original 🍲, y visitarás los lugares arqueológicos y turísticos más hermosos a los que no puedes llegar en otro lugar 🏰🌄. Puedes hacer clic en una de las opciones para ayudarte:",
      initialOptions: [
        { id: "services", text: " Servicios" },
        { id: "bookings", text: " Reservas" },
        { id: "payment", text: " Pago" },
        { id: "auth", text: " Registro e Inicio de Sesión" },
        { id: "customer_service", text: " Servicio al Cliente" }
      ]
    },
    tr: {
      welcome: "Ben Atour'dan Layla! 🌟 Atour'ya hoş geldiniz 🤍",
      initialPrompt: "Burada Atour platformu ve seçkin hizmet sağlayıcıları aracılığıyla Suudi Arabistan hakkında daha fazla bilgi edineceksiniz. Kültürel maceralar yaşayacak 🕌, orijinal lezzet ve yöntemiyle en lezzetli otantik ve geleneksel yemekleri tadacak 🍲 ve başka bir yerde ulaşamayacağınız en güzel arkeolojik ve turistik yerleri ziyaret edeceksiniz 🏰🌄. Size yardımcı olmak için seçeneklerden birine tıklayabilirsiniz:",
      initialOptions: [
        { id: "services", text: " Hizmetler" },
        { id: "bookings", text: " Rezervasyonlar" },
        { id: "payment", text: " Ödeme" },
        { id: "auth", text: " Kayıt ve Giriş" },
        { id: "customer_service", text: " Müşteri Hizmetleri" }
      ]
    },
    ru: {
      welcome: "Я Лейла из Джавла! 🌟 Добро пожаловать в Джавла 🤍",
      initialPrompt: "Здесь вы узнаете больше о Саудовской Аравии через платформу Джавла и ее выдающихся поставщиков услуг. Вы испытаете культурные приключения 🕌, попробуете самые вкусные аутентичные и традиционные блюда с их оригинальным вкусом и методом приготовления 🍲, и посетите самые красивые археологические и туристические места, которых вы не можете достичь в другом месте 🏰🌄. Вы можете нажать на один из вариантов, чтобы помочь вам:",
      initialOptions: [
        { id: "services", text: " Услуги" },
        { id: "bookings", text: " Бронирования" },
        { id: "payment", text: " Оплата" },
        { id: "auth", text: " Регистрация и Вход" },
        { id: "customer_service", text: " Служба поддержки" }
      ]
    },
    zh: {
      welcome: "我是来自Atour的莉莉！🌟 欢迎来到Atour 🤍",
      initialPrompt: "在这里，您将通过Atour平台及其杰出的服务提供商探索更多关于沙特阿拉伯的信息。您将体验文化冒险 🕌，品尝最美味的正宗传统食物，享受其原始风味和制作方法 🍲，并参观您在其他地方无法到达的最美丽的考古和旅游景点 🏰🌄。您可以点击以下选项之一来获取帮助：",
      initialOptions: [
        { id: "services", text: " 服务" },
        { id: "bookings", text: " 预订" },
        { id: "payment", text: " 支付" },
        { id: "auth", text: " 注册和登录" },
        { id: "customer_service", text: " 客户服务" }
      ]
    },
    ko: {
      welcome: "저는 Atour의 릴리입니다! 🌟 Atour에 오신 것을 환영합니다 🤍",
      initialPrompt: "여기에서 Atour 플랫폼과 그 우수한 서비스 제공업체를 통해 사우디 아라비아에 대해 더 많이 탐색하게 됩니다. 문화적 모험을 경험하고 🕌, 원래의 맛과 방법으로 가장 맛있는 정통 및 전통 음식을 맛보며 🍲, 다른 곳에서는 도달할 수 없는 가장 아름다운 고고학적 및 관광 장소를 방문하게 됩니다 🏰🌄. 도움을 받으려면 다음 옵션 중 하나를 클릭하세요:",
      initialOptions: [
        { id: "services", text: " 서비스" },
        { id: "bookings", text: " 예약" },
        { id: "payment", text: " 결제" },
        { id: "auth", text: " 등록 및 로그인" },
        { id: "customer_service", text: " 고객 서비스" }
      ]
    },
    pt: {
      welcome: "Sou Layla da Atour! 🌟 Bem-vindo à Atour 🤍",
      initialPrompt: "Aqui você explorará mais sobre a Arábia Saudita através da plataforma Atour e seus distintos prestadores de serviços. Você experimentará aventuras culturais 🕌, provará as comidas autênticas e tradicionais mais deliciosas com seu sabor e método original 🍲, e visitará os mais belos lugares arqueológicos e turísticos que você não pode alcançar em outro lugar 🏰🌄. Você pode clicar em uma das opções para ajudá-lo:",
      initialOptions: [
        { id: "services", text: " Serviços" },
        { id: "bookings", text: " Reservas" },
        { id: "payment", text: " Pagamento" },
        { id: "auth", text: " Registro e Login" },
        { id: "customer_service", text: " Atendimento ao Cliente" }
      ]
    },
    ur: {
      welcome: "میں جولہ سے لیلیٰ ہوں! 🌟 جولہ میں خوش آمدید 🤍",
      initialPrompt: "یہاں آپ جولہ پلیٹ فارم اور اس کے ممتاز خدمت فراہم کنندگان کے ذریعے سعودی عرب کے بارے میں مزید دریافت کریں گے۔ آپ ثقافتی مہمات کا تجربہ کریں گے 🕌، اصل ذائقے اور طریقے سے سب سے لذیذ اصلی اور روایتی کھانے چکھیں گے 🍲، اور سب سے خوبصورت آثار قدیمہ اور سیاحتی مقامات کا دورہ کریں گے جہاں آپ کہیں اور نہیں پہنچ سکتے 🏰🌄۔ آپ کی مدد کے لیے آپ ان اختیارات میں سے ایک پر کلک کر سکتے ہیں:",
      initialOptions: [
        { id: "services", text: " خدمات" },
        { id: "bookings", text: " بکنگز" },
        { id: "payment", text: " ادائیگی" },
        { id: "auth", text: " رجسٹریشن اور لاگ ان" },
        { id: "customer_service", text: " کسٹمر سروس" }
      ]
    },
    ja: {
      welcome: "ジャウラのリリーです！🌟 ジャウラへようこそ 🤍",
      initialPrompt: "ここでは、ジャウラプラットフォームとその優れたサービスプロバイダーを通じて、サウジアラビアについてさらに探索することができます。文化的な冒険を体験し 🕌、本来の風味と方法で最も美味しい本格的な伝統料理を味わい 🍲、他の場所では行けない最も美しい考古学的および観光地を訪れることができます 🏰🌄。お手伝いするために、次のオプションのいずれかをクリックしてください：",
      initialOptions: [
        { id: "services", text: " サービス" },
        { id: "bookings", text: " 予約" },
        { id: "payment", text: " 支払い" },
        { id: "auth", text: " 登録とログイン" },
        { id: "customer_service", text: " カスタマーサービス" }
      ]
    }
  };





  // Handle conversation flow
  const handleConversationFlow = (optionId) => {
    // Service options text by language
    const serviceOptions = {
      ar: {
        prompt: 'اختر نوع الخدمة التي تريدها:',
        tour: 'جولة سياحية 🏞️',
        gift: 'هدية تذكارية 🎁',
        event: 'مهرجان او فعالية 🎉',
        back: 'العودة للقائمة الرئيسية'
      },
      en: {
        prompt: 'Choose the type of service you want:',
        tour: 'Tourist Tour 🏞️',
        gift: 'Souvenir Gift 🎁',
        event: 'Festival or Event 🎉',
        back: 'Back to Main Menu'
      },
      fr: {
        prompt: 'Choisissez le type de service que vous souhaitez:',
        tour: 'Tour Touristique 🏞️',
        gift: 'Cadeau Souvenir 🎁',
        event: 'Festival ou Événement 🎉',
        back: 'Retour au Menu Principal'
      },
      de: {
        prompt: 'Wählen Sie die Art des Services, den Sie wünschen:',
        tour: 'Touristische Tour 🏞️',
        gift: 'Souvenir Geschenk 🎁',
        event: 'Festival oder Veranstaltung 🎉',
        back: 'Zurück zum Hauptmenü'
      },
      es: {
        prompt: 'Elija el tipo de servicio que desea:',
        tour: 'Tour Turístico 🏞️',
        gift: 'Regalo Recuerdo 🎁',
        event: 'Festival o Evento 🎉',
        back: 'Volver al Menú Principal'
      },
      tr: {
        prompt: 'İstediğiniz hizmet türünü seçin:',
        tour: 'Turistik Tur 🏞️',
        gift: 'Hatıra Hediye 🎁',
        event: 'Festival veya Etkinlik 🎉',
        back: 'Ana Menüye Dön'
      },
      ru: {
        prompt: 'Выберите тип услуги, который вы хотите:',
        tour: 'Туристический Тур 🏞️',
        gift: 'Сувенирный Подарок 🎁',
        event: 'Фестиваль или Мероприятие 🎉',
        back: 'Вернуться в Главное Меню'
      },
      zh: {
        prompt: '选择您想要的服务类型：',
        tour: '旅游观光 🏞️',
        gift: '纪念品礼物 🎁',
        event: '节日或活动 🎉',
        back: '返回主菜单'
      },
      ko: {
        prompt: '원하는 서비스 유형을 선택하세요:',
        tour: '관광 투어 🏞️',
        gift: '기념품 선물 🎁',
        event: '축제 또는 이벤트 🎉',
        back: '메인 메뉴로 돌아가기'
      },
      pt: {
        prompt: 'Escolha o tipo de serviço que deseja:',
        tour: 'Tour Turístico 🏞️',
        gift: 'Presente Lembrança 🎁',
        event: 'Festival ou Evento 🎉',
        back: 'Voltar ao Menu Principal'
      },
      ur: {
        prompt: 'اپنی مطلوبہ خدمت کی قسم منتخب کریں:',
        tour: 'سیاحتی دورہ 🏞️',
        gift: 'یادگاری تحفہ 🎁',
        event: 'تہوار یا تقریب 🎉',
        back: 'مین مینو پر واپس جائیں'
      },
      ja: {
        prompt: 'ご希望のサービスタイプを選択してください：',
        tour: '観光ツアー 🏞️',
        gift: 'お土産ギフト 🎁',
        event: 'フェスティバルまたはイベント 🎉',
        back: 'メインメニューに戻る'
      }
    };

    // Get language-specific text or fallback to English
    const getLangText = (textObj) => textObj[currentLanguage] || textObj['en'];

    switch (optionId) {
      case 'services':
        addBotMessage(
          getLangText(serviceOptions).prompt,
          [
            { id: 'tour_service', text: getLangText(serviceOptions).tour },
            { id: 'gift_service', text: getLangText(serviceOptions).gift },
            { id: 'event_service', text: getLangText(serviceOptions).event },
            { id: 'main_menu', text: getLangText(serviceOptions).back }
          ]
        );
        break;

      case 'tour_service':
        // Tour service options text by language
        const tourOptions = {
          ar: {
            prompt: 'اكتشف أجمل الجولات السياحية في السعودية مع مرشدين محليين متخصصين 🗺️',
            view: 'شاهد الجولات المتاحة',
            back: 'العودة لقائمة الخدمات'
          },
          en: {
            prompt: 'Explore the most beautiful tourist tours in Saudi Arabia with specialized local guides 🗺️',
            view: 'View Available Tours',
            back: 'Back to Services'
          },
          fr: {
            prompt: 'Découvrez les plus beaux circuits touristiques en Arabie Saoudite avec des guides locaux spécialisés 🗺️',
            view: 'Voir les Tours Disponibles',
            back: 'Retour aux Services'
          },
          de: {
            prompt: 'Entdecken Sie die schönsten Touristentouren in Saudi-Arabien mit spezialisierten lokalen Führern 🗺️',
            view: 'Verfügbare Touren Anzeigen',
            back: 'Zurück zu Dienstleistungen'
          },
          es: {
            prompt: 'Descubre los tours turísticos más hermosos en Arabia Saudita con guías locales especializados 🗺️',
            view: 'Ver Tours Disponibles',
            back: 'Volver a Servicios'
          },
          tr: {
            prompt: 'Uzman yerel rehberlerle Suudi Arabistan\'daki en güzel turistik turları keşfedin 🗺️',
            view: 'Mevcut Turları Görüntüle',
            back: 'Hizmetlere Geri Dön'
          },
          ru: {
            prompt: 'Откройте для себя самые красивые туристические туры в Саудовской Аравии со специализированными местными гидами 🗺️',
            view: 'Посмотреть Доступные Туры',
            back: 'Вернуться к Услугам'
          },
          zh: {
            prompt: '与专业当地导游一起探索沙特阿拉伯最美丽的旅游路线 🗺️',
            view: '查看可用旅游',
            back: '返回服务'
          },
          ko: {
            prompt: '전문 현지 가이드와 함께 사우디 아라비아에서 가장 아름다운 관광 투어를 발견하세요 🗺️',
            view: '이용 가능한 투어 보기',
            back: '서비스로 돌아가기'
          },
          pt: {
            prompt: 'Descubra os mais belos passeios turísticos na Arábia Saudita com guias locais especializados 🗺️',
            view: 'Ver Tours Disponíveis',
            back: 'Voltar para Serviços'
          },
          ur: {
            prompt: 'مخصوص مقامی گائیڈز کے ساتھ سعودی عرب میں خوبصورت سیاحتی دورے دریافت کریں 🗺️',
            view: 'دستیاب دورے دیکھیں',
            back: 'خدمات پر واپس جائیں'
          },
          ja: {
            prompt: '専門の現地ガイドと一緒にサウジアラビアで最も美しい観光ツアーを発見しましょう 🗺️',
            view: '利用可能なツアーを見る',
            back: 'サービスに戻る'
          }
        };

        addBotMessage(
          getLangText(tourOptions).prompt,
          [
            { id: 'view_tours', text: getLangText(tourOptions).view, link: '/tripsPage' },
            { id: 'services', text: getLangText(tourOptions).back }
          ]
        );
        break;

      case 'gift_service':
        // Gift service options text by language
        const giftOptions = {
          ar: {
            prompt: 'اختر من مجموعة متنوعة من الهدايا التذكارية الأصيلة والتراثية 🎁',
            view: 'تصفح الهدايا',
            back: 'العودة لقائمة الخدمات'
          },
          en: {
            prompt: 'Choose from a variety of authentic and traditional souvenir gifts 🎁',
            view: 'Browse Gifts',
            back: 'Back to Services'
          },
          fr: {
            prompt: 'Choisissez parmi une variété de cadeaux souvenirs authentiques et traditionnels 🎁',
            view: 'Parcourir les Cadeaux',
            back: 'Retour aux Services'
          },
          de: {
            prompt: 'Wählen Sie aus einer Vielzahl von authentischen und traditionellen Souvenir-Geschenken 🎁',
            view: 'Geschenke Durchsuchen',
            back: 'Zurück zu Dienstleistungen'
          },
          es: {
            prompt: 'Elija entre una variedad de regalos de recuerdo auténticos y tradicionales 🎁',
            view: 'Explorar Regalos',
            back: 'Volver a Servicios'
          },
          tr: {
            prompt: 'Çeşitli otantik ve geleneksel hediyelik eşyalar arasından seçim yapın 🎁',
            view: 'Hediyelere Göz At',
            back: 'Hizmetlere Geri Dön'
          },
          ru: {
            prompt: 'Выберите из разнообразия аутентичных и традиционных сувенирных подарков 🎁',
            view: 'Просмотреть Подарки',
            back: 'Вернуться к Услугам'
          },
          zh: {
            prompt: '从各种正宗和传统的纪念品礼物中选择 🎁',
            view: '浏览礼物',
            back: '返回服务'
          },
          ko: {
            prompt: '다양한 정통 및 전통 기념품 선물 중에서 선택하세요 🎁',
            view: '선물 둘러보기',
            back: '서비스로 돌아가기'
          },
          pt: {
            prompt: 'Escolha entre uma variedade de presentes de lembrança autênticos e tradicionais 🎁',
            view: 'Navegar por Presentes',
            back: 'Voltar para Serviços'
          },
          ur: {
            prompt: 'اصل اور روایتی یادگاری تحفوں کی متنوع رینج میں سے منتخب کریں 🎁',
            view: 'تحفے براؤز کریں',
            back: 'خدمات پر واپس جائیں'
          },
          ja: {
            prompt: '様々な本格的で伝統的なお土産ギフトからお選びください 🎁',
            view: 'ギフトを閲覧',
            back: 'サービスに戻る'
          }
        };

        addBotMessage(
          getLangText(giftOptions).prompt,
          [
            { id: 'view_gifts', text: getLangText(giftOptions).view, link: '/offers' },
            { id: 'services', text: getLangText(giftOptions).back }
          ]
        );
        break;

      case 'event_service':
        // Event service options text by language
        const eventOptions = {
          ar: {
            prompt: 'شارك في أجمل المهرجانات والفعاليات الثقافية والتراثية 🎉',
            view: 'استكشف الفعاليات',
            back: 'العودة لقائمة الخدمات'
          },
          en: {
            prompt: 'Participate in the most beautiful cultural and heritage festivals and events 🎉',
            view: 'Explore Events',
            back: 'Back to Services'
          },
          fr: {
            prompt: 'Participez aux plus beaux festivals et événements culturels et patrimoniaux 🎉',
            view: 'Explorer les Événements',
            back: 'Retour aux Services'
          },
          de: {
            prompt: 'Nehmen Sie an den schönsten Kultur- und Erbe-Festivals und Veranstaltungen teil 🎉',
            view: 'Veranstaltungen Erkunden',
            back: 'Zurück zu Dienstleistungen'
          },
          es: {
            prompt: 'Participe en los más hermosos festivales y eventos culturales y patrimoniales 🎉',
            view: 'Explorar Eventos',
            back: 'Volver a Servicios'
          },
          tr: {
            prompt: 'En güzel kültürel ve miras festivalleri ve etkinliklerine katılın 🎉',
            view: 'Etkinlikleri Keşfedin',
            back: 'Hizmetlere Geri Dön'
          },
          ru: {
            prompt: 'Участвуйте в самых красивых культурных и наследственных фестивалях и мероприятиях 🎉',
            view: 'Исследовать События',
            back: 'Вернуться к Услугам'
          },
          zh: {
            prompt: '参与最美丽的文化和遗产节日和活动 🎉',
            view: '探索活动',
            back: '返回服务'
          },
          ko: {
            prompt: '가장 아름다운 문화 및 유산 축제와 이벤트에 참여하세요 🎉',
            view: '이벤트 탐색',
            back: '서비스로 돌아가기'
          },
          pt: {
            prompt: 'Participe nos mais belos festivais e eventos culturais e patrimoniais 🎉',
            view: 'Explorar Eventos',
            back: 'Voltar para Serviços'
          },
          ur: {
            prompt: 'خوبصورت ثقافتی اور ورثہ کے تہواروں اور تقریبات میں شرکت کریں 🎉',
            view: 'تقریبات دریافت کریں',
            back: 'خدمات پر واپس جائیں'
          },
          ja: {
            prompt: '最も美しい文化と遺産の祭りやイベントに参加しましょう 🎉',
            view: 'イベントを探索',
            back: 'サービスに戻る'
          }
        };

        addBotMessage(
          getLangText(eventOptions).prompt,
          [
            { id: 'view_events', text: getLangText(eventOptions).view, link: '/eventsPage' },
            { id: 'services', text: getLangText(eventOptions).back }
          ]
        );
        break;

      case 'main_menu':
        // Main menu options text by language
        const mainMenuOptions = {
          ar: {
            prompt: 'أهلاً بك مرة أخرى في القائمة الرئيسية. كيف يمكنني مساعدتك؟',
            services: 'استكشاف الخدمات',
            bookings: 'حجوزاتي',
            payment: 'خيارات الدفع',
            auth: 'تسجيل الدخول/إنشاء حساب',
            customer: 'خدمة العملاء'
          },
          en: {
            prompt: 'Welcome back to the main menu. How can I help you?',
            services: 'Explore Services',
            bookings: 'My Bookings',
            payment: 'Payment Options',
            auth: 'Login/Register',
            customer: 'Customer Service'
          },
          fr: {
            prompt: 'Bienvenue à nouveau dans le menu principal. Comment puis-je vous aider?',
            services: 'Explorer les Services',
            bookings: 'Mes Réservations',
            payment: 'Options de Paiement',
            auth: 'Connexion/Inscription',
            customer: 'Service Client'
          },
          de: {
            prompt: 'Willkommen zurück im Hauptmenü. Wie kann ich Ihnen helfen?',
            services: 'Dienstleistungen Erkunden',
            bookings: 'Meine Buchungen',
            payment: 'Zahlungsoptionen',
            auth: 'Anmelden/Registrieren',
            customer: 'Kundendienst'
          },
          es: {
            prompt: 'Bienvenido de nuevo al menú principal. ¿Cómo puedo ayudarte?',
            services: 'Explorar Servicios',
            bookings: 'Mis Reservas',
            payment: 'Opciones de Pago',
            auth: 'Iniciar Sesión/Registrarse',
            customer: 'Servicio al Cliente'
          },
          tr: {
            prompt: 'Ana menüye tekrar hoş geldiniz. Size nasıl yardımcı olabilirim?',
            services: 'Hizmetleri Keşfedin',
            bookings: 'Rezervasyonlarım',
            payment: 'Ödeme Seçenekleri',
            auth: 'Giriş/Kayıt',
            customer: 'Müşteri Hizmetleri'
          },
          ru: {
            prompt: 'Добро пожаловать обратно в главное меню. Чем я могу вам помочь?',
            services: 'Изучить Услуги',
            bookings: 'Мои Бронирования',
            payment: 'Варианты Оплаты',
            auth: 'Вход/Регистрация',
            customer: 'Обслуживание Клиентов'
          },
          zh: {
            prompt: '欢迎回到主菜单。我能帮您什么？',
            services: '探索服务',
            bookings: '我的预订',
            payment: '支付选项',
            auth: '登录/注册',
            customer: '客户服务'
          },
          ko: {
            prompt: '메인 메뉴로 돌아오신 것을 환영합니다. 어떻게 도와드릴까요?',
            services: '서비스 탐색',
            bookings: '내 예약',
            payment: '결제 옵션',
            auth: '로그인/등록',
            customer: '고객 서비스'
          },
          pt: {
            prompt: 'Bem-vindo de volta ao menu principal. Como posso ajudá-lo?',
            services: 'Explorar Serviços',
            bookings: 'Minhas Reservas',
            payment: 'Opções de Pagamento',
            auth: 'Login/Registro',
            customer: 'Atendimento ao Cliente'
          },
          ur: {
            prompt: 'مین مینو میں واپس خوش آمدید۔ میں آپ کی کیسے مدد کر سکتا ہوں؟',
            services: 'خدمات دریافت کریں',
            bookings: 'میری بکنگز',
            payment: 'ادائیگی کے اختیارات',
            auth: 'لاگ ان/رجسٹر',
            customer: 'کسٹمر سروس'
          },
          ja: {
            prompt: 'メインメニューへようこそ。どのようにお手伝いできますか？',
            services: 'サービスを探索',
            bookings: '予約状況',
            payment: '支払いオプション',
            auth: 'ログイン/登録',
            customer: 'カスタマーサービス'
          }
        };

        addBotMessage(
          getLangText(mainMenuOptions).prompt,
          [
            { id: 'services', text: getLangText(mainMenuOptions).services },
            { id: 'bookings', text: getLangText(mainMenuOptions).bookings },
            { id: 'payment', text: getLangText(mainMenuOptions).payment },
            { id: 'auth', text: getLangText(mainMenuOptions).auth },
            { id: 'customer_service', text: getLangText(mainMenuOptions).customer }
          ]
        );
        break;

      case 'bookings':
        // Bookings options text by language
        const bookingsOptions = {
          ar: {
            prompt: 'اختر ما تريد معرفته عن الحجوزات:',
            create: 'طريقة الحجز ؟',
            manage: 'إدارة حجوزاتي 📋',
            view: 'شاهد حجوزاتك 📂',
            back: 'العودة للقائمة الرئيسية'
          },
          en: {
            prompt: 'Choose what you want to know about bookings:',
            create: 'How to Book?',
            manage: 'Manage My Bookings 📋',
            view: 'View Your Bookings 📂',
            back: 'Back to Main Menu'
          },
          fr: {
            prompt: 'Choisissez ce que vous voulez savoir sur les réservations:',
            create: 'Comment Réserver?',
            manage: 'Gérer Mes Réservations 📋',
            view: 'Voir Vos Réservations 📂',
            back: 'Retour au Menu Principal'
          },
          de: {
            prompt: 'Wählen Sie, was Sie über Buchungen wissen möchten:',
            create: 'Wie Buche Ich?',
            manage: 'Meine Buchungen Verwalten 📋',
            view: 'Ihre Buchungen Anzeigen 📂',
            back: 'Zurück zum Hauptmenü'
          },
          es: {
            prompt: 'Elija lo que quiere saber sobre las reservas:',
            create: '¿Cómo Reservar?',
            manage: 'Gestionar Mis Reservas 📋',
            view: 'Ver Sus Reservas 📂',
            back: 'Volver al Menú Principal'
          },
          tr: {
            prompt: 'Rezervasyonlar hakkında bilmek istediğinizi seçin:',
            create: 'Nasıl Rezervasyon Yapılır?',
            manage: 'Rezervasyonlarımı Yönet 📋',
            view: 'Rezervasyonlarınızı Görüntüleyin 📂',
            back: 'Ana Menüye Dön'
          },
          ru: {
            prompt: 'Выберите, что вы хотите узнать о бронированиях:',
            create: 'Как Забронировать?',
            manage: 'Управление Моими Бронированиями 📋',
            view: 'Просмотр Ваших Бронирований 📂',
            back: 'Вернуться в Главное Меню'
          },
          zh: {
            prompt: '选择您想了解的预订信息：',
            create: '如何预订？',
            manage: '管理我的预订 📋',
            view: '查看您的预订 📂',
            back: '返回主菜单'
          },
          ko: {
            prompt: '예약에 대해 알고 싶은 것을 선택하세요:',
            create: '예약 방법은?',
            manage: '내 예약 관리 📋',
            view: '예약 보기 📂',
            back: '메인 메뉴로 돌아가기'
          },
          pt: {
            prompt: 'Escolha o que deseja saber sobre reservas:',
            create: 'Como Reservar?',
            manage: 'Gerenciar Minhas Reservas 📋',
            view: 'Ver Suas Reservas 📂',
            back: 'Voltar ao Menu Principal'
          },
          ur: {
            prompt: 'منتخب کریں کہ آپ بکنگز کے بارے میں کیا جاننا چاہتے ہیں:',
            create: 'بک کرنے کا طریقہ؟',
            manage: 'میری بکنگز کا انتظام کریں 📋',
            view: 'اپنی بکنگز دیکھیں 📂',
            back: 'مین مینو پر واپس جائیں'
          },
          ja: {
            prompt: '予約について知りたいことを選択してください：',
            create: '予約方法は？',
            manage: '予約の管理 📋',
            view: '予約を表示 📂',
            back: 'メインメニューに戻る'
          }
        };

        addBotMessage(
          getLangText(bookingsOptions).prompt,
          [
            { id: 'booking_method', text: getLangText(bookingsOptions).create },
            { id: 'manage_bookings', text: getLangText(bookingsOptions).manage },
            { id: 'view_bookings', text: getLangText(bookingsOptions).view },
            { id: 'main_menu', text: getLangText(bookingsOptions).back }
          ]
        );
        break;

      case 'payment':
        // Payment options text by language
        const paymentOptions = {
          ar: {
            prompt: 'نقبل جميع أنواع الدفع 💳، بوابة الدفع في التطبيق تدعم معظم أنواع الدفع الإلكتروني ⚡.',
            back: 'العودة للقائمة الرئيسية'
          },
          en: {
            prompt: 'We accept all payment types 💳, the in-app payment gateway supports most electronic payment methods ⚡.',
            back: 'Back to Main Menu'
          },
          fr: {
            prompt: 'Nous acceptons tous les types de paiement 💳, la passerelle de paiement dans l\'application prend en charge la plupart des méthodes de paiement électronique ⚡.',
            back: 'Retour au Menu Principal'
          },
          de: {
            prompt: 'Wir akzeptieren alle Zahlungsarten 💳, das In-App-Zahlungsgateway unterstützt die meisten elektronischen Zahlungsmethoden ⚡.',
            back: 'Zurück zum Hauptmenü'
          },
          es: {
            prompt: 'Aceptamos todos los tipos de pago 💳, la pasarela de pago en la aplicación admite la mayoría de los métodos de pago electrónico ⚡.',
            back: 'Volver al Menú Principal'
          },
          tr: {
            prompt: 'Tüm ödeme türlerini kabul ediyoruz 💳, uygulama içi ödeme ağ geçidi çoğu elektronik ödeme yöntemini destekler ⚡.',
            back: 'Ana Menüye Dön'
          },
          ru: {
            prompt: 'Мы принимаем все типы оплаты 💳, платежный шлюз в приложении поддерживает большинство методов электронной оплаты ⚡.',
            back: 'Вернуться в Главное Меню'
          },
          zh: {
            prompt: '我们接受所有支付类型 💳，应用内支付网关支持大多数电子支付方式 ⚡.',
            back: '返回主菜单'
          },
          ko: {
            prompt: '모든 결제 유형을 수락합니다 💳, 앱 내 결제 게이트웨이는 대부분의 전자 결제 방법을 지원합니다 ⚡.',
            back: '메인 메뉴로 돌아가기'
          },
          pt: {
            prompt: 'Aceitamos todos os tipos de pagamento 💳, o gateway de pagamento no aplicativo suporta a maioria dos métodos de pagamento eletrônico ⚡.',
            back: 'Voltar ao Menu Principal'
          },
          ur: {
            prompt: 'ہم تمام قسم کی ادائیگی قبول کرتے ہیں 💳، ایپ میں ادائیگی کا گیٹ وے زیادہ تر الیکٹرانک ادائیگی کے طریقوں کی حمایت کرتا ہے ⚡.',
            back: 'مین مینو پر واپس جائیں'
          },
          ja: {
            prompt: 'すべての支払いタイプを受け付けています 💳、アプリ内の支払いゲートウェイはほとんどの電子決済方法をサポートしています ⚡.',
            back: 'メインメニューに戻る'
          }
        };

        addBotMessage(
          getLangText(paymentOptions).prompt,
          [
            { id: 'main_menu', text: getLangText(paymentOptions).back }
          ]
        );
        break;

      case 'auth':
        // Auth options text by language
        const authOptions = {
          ar: {
            prompt: 'اختر ما تريد القيام به:',
            reset: 'إعادة تعيين كلمة المرور 🔑',
            support: 'تواصل مع الدعم ☎️',
            customer: 'سجل كعميل 🧑‍💼',
            provider: 'سجل كمورد 🏪',
            back: 'العودة للقائمة الرئيسية'
          },
          en: {
            prompt: 'Choose what you want to do:',
            reset: 'Reset Password 🔑',
            support: 'Contact Support ☎️',
            customer: 'Register as Customer 🧑‍💼',
            provider: 'Register as Provider 🏪',
            back: 'Back to Main Menu'
          },
          fr: {
            prompt: 'Choisissez ce que vous voulez faire:',
            reset: 'Réinitialiser le Mot de Passe 🔑',
            support: 'Contacter le Support ☎️',
            customer: 'S\'inscrire en tant que Client 🧑‍💼',
            provider: 'S\'inscrire en tant que Fournisseur 🏪',
            back: 'Retour au Menu Principal'
          },
          de: {
            prompt: 'Wählen Sie, was Sie tun möchten:',
            reset: 'Passwort Zurücksetzen 🔑',
            support: 'Support Kontaktieren ☎️',
            customer: 'Als Kunde Registrieren 🧑‍💼',
            provider: 'Als Anbieter Registrieren 🏪',
            back: 'Zurück zum Hauptmenü'
          },
          es: {
            prompt: 'Elija lo que quiere hacer:',
            reset: 'Restablecer Contraseña 🔑',
            support: 'Contactar con Soporte ☎️',
            customer: 'Registrarse como Cliente 🧑‍💼',
            provider: 'Registrarse como Proveedor 🏪',
            back: 'Volver al Menú Principal'
          },
          tr: {
            prompt: 'Ne yapmak istediğinizi seçin:',
            reset: 'Şifreyi Sıfırla 🔑',
            support: 'Desteğe Başvur ☎️',
            customer: 'Müşteri Olarak Kaydol 🧑‍💼',
            provider: 'Sağlayıcı Olarak Kaydol 🏪',
            back: 'Ana Menüye Dön'
          },
          ru: {
            prompt: 'Выберите, что вы хотите сделать:',
            reset: 'Сбросить Пароль 🔑',
            support: 'Связаться с Поддержкой ☎️',
            customer: 'Зарегистрироваться как Клиент 🧑‍💼',
            provider: 'Зарегистрироваться как Поставщик 🏪',
            back: 'Вернуться в Главное Меню'
          },
          zh: {
            prompt: '选择您想做的事：',
            reset: '重置密码 🔑',
            support: '联系支持 ☎️',
            customer: '注册为客户 🧑‍💼',
            provider: '注册为提供商 🏪',
            back: '返回主菜单'
          },
          ko: {
            prompt: '하고 싶은 것을 선택하세요:',
            reset: '비밀번호 재설정 🔑',
            support: '지원팀에 문의 ☎️',
            customer: '고객으로 등록 🧑‍💼',
            provider: '제공자로 등록 🏪',
            back: '메인 메뉴로 돌아가기'
          },
          pt: {
            prompt: 'Escolha o que deseja fazer:',
            reset: 'Redefinir Senha 🔑',
            support: 'Contatar Suporte ☎️',
            customer: 'Registrar como Cliente 🧑‍💼',
            provider: 'Registrar como Fornecedor 🏪',
            back: 'Voltar ao Menu Principal'
          },
          ur: {
            prompt: 'منتخب کریں کہ آپ کیا کرنا چاہتے ہیں:',
            reset: 'پاس ورڈ دوبارہ ترتیب دیں 🔑',
            support: 'سپورٹ سے رابطہ کریں ☎️',
            customer: 'کسٹمر کے طور پر رجسٹر کریں 🧑‍💼',
            provider: 'فراہم کنندہ کے طور پر رجسٹر کریں 🏪',
            back: 'مین مینو پر واپس جائیں'
          },
          ja: {
            prompt: '何をしたいか選択してください：',
            reset: 'パスワードをリセット 🔑',
            support: 'サポートに連絡 ☎️',
            customer: '顧客として登録 🧑‍💼',
            provider: 'プロバイダーとして登録 🏪',
            back: 'メインメニューに戻る'
          }
        };

        addBotMessage(
          getLangText(authOptions).prompt,
          [
            { id: 'reset_password', text: getLangText(authOptions).reset },
            { id: 'contact_support', text: getLangText(authOptions).support },
            { id: 'register_customer', text: getLangText(authOptions).customer },
            { id: 'register_provider', text: getLangText(authOptions).provider },
            { id: 'main_menu', text: getLangText(authOptions).back }
          ]
        );
        break;

      case 'customer_service':
        // Customer service options text by language
        const customerServiceOptions = {
          ar: {
            prompt: 'يمكنك التواصل مع فريق خدمة العملاء عبر الطرق التالية:',
            contact: 'معلومات التواصل 📞',
            back: 'العودة للقائمة الرئيسية'
          },
          en: {
            prompt: 'You can contact our customer service team through the following methods:',
            contact: 'Contact Information 📞',
            back: 'Back to Main Menu'
          },
          fr: {
            prompt: 'Vous pouvez contacter notre équipe de service client par les méthodes suivantes:',
            contact: 'Informations de Contact 📞',
            back: 'Retour au Menu Principal'
          },
          de: {
            prompt: 'Sie können unser Kundendienstteam über folgende Methoden kontaktieren:',
            contact: 'Kontaktinformationen 📞',
            back: 'Zurück zum Hauptmenü'
          },
          es: {
            prompt: 'Puede contactar con nuestro equipo de servicio al cliente a través de los siguientes métodos:',
            contact: 'Información de Contacto 📞',
            back: 'Volver al Menú Principal'
          },
          tr: {
            prompt: 'Müşteri hizmetleri ekibimizle aşağıdaki yöntemlerle iletişime geçebilirsiniz:',
            contact: 'İletişim Bilgileri 📞',
            back: 'Ana Menüye Dön'
          },
          ru: {
            prompt: 'Вы можете связаться с нашей службой поддержки клиентов следующими способами:',
            contact: 'Контактная Информация 📞',
            back: 'Вернуться в Главное Меню'
          },
          zh: {
            prompt: '您可以通过以下方式联系我们的客户服务团队：',
            contact: '联系信息 📞',
            back: '返回主菜单'
          },
          ko: {
            prompt: '다음 방법을 통해 고객 서비스 팀에 문의할 수 있습니다:',
            contact: '연락처 정보 📞',
            back: '메인 메뉴로 돌아가기'
          },
          pt: {
            prompt: 'Você pode entrar em contato com nossa equipe de atendimento ao cliente através dos seguintes métodos:',
            contact: 'Informações de Contato 📞',
            back: 'Voltar ao Menu Principal'
          },
          ur: {
            prompt: 'آپ درج ذیل طریقوں سے ہماری کسٹمر سروس ٹیم سے رابطہ کر سکتے ہیں:',
            contact: 'رابطہ کی معلومات 📞',
            back: 'مین مینو پر واپس جائیں'
          },
          ja: {
            prompt: '以下の方法でカスタマーサービスチームにお問い合わせいただけます：',
            contact: '連絡先情報 📞',
            back: 'メインメニューに戻る'
          }
        };

        addBotMessage(
          getLangText(customerServiceOptions).prompt,
          [
            { id: 'contact_info', text: getLangText(customerServiceOptions).contact },
            { id: 'main_menu', text: getLangText(customerServiceOptions).back }
          ]
        );
        break;

      case 'booking_method':
        // Booking method options text by language
        const bookingMethodOptions = {
          ar: {
            prompt: 'يمكنك الحجز بسهولة من خلال تصفح الخدمات المتاحة واختيار ما يناسبك، ثم اتباع خطوات الحجز البسيطة 📝',
            back: 'العودة لقائمة الحجوزات'
          },
          en: {
            prompt: 'You can easily book by browsing available services and choosing what suits you, then following simple booking steps 📝',
            back: 'Back to Bookings'
          },
          fr: {
            prompt: 'Vous pouvez facilement réserver en parcourant les services disponibles et en choisissant ce qui vous convient, puis en suivant les étapes simples de réservation 📝',
            back: 'Retour aux Réservations'
          },
          de: {
            prompt: 'Sie können ganz einfach buchen, indem Sie die verfügbaren Dienste durchsuchen und auswählen, was Ihnen gefällt, und dann den einfachen Buchungsschritten folgen 📝',
            back: 'Zurück zu Buchungen'
          },
          es: {
            prompt: 'Puede reservar fácilmente navegando por los servicios disponibles y eligiendo lo que le convenga, luego siguiendo los sencillos pasos de reserva 📝',
            back: 'Volver a Reservas'
          },
          tr: {
            prompt: 'Mevcut hizmetlere göz atarak ve size uygun olanı seçerek, ardından basit rezervasyon adımlarını izleyerek kolayca rezervasyon yapabilirsiniz 📝',
            back: 'Rezervasyonlara Dön'
          },
          ru: {
            prompt: 'Вы можете легко забронировать, просматривая доступные услуги и выбирая то, что вам подходит, а затем следуя простым шагам бронирования 📝',
            back: 'Вернуться к Бронированиям'
          },
          zh: {
            prompt: '您可以通过浏览可用服务并选择适合您的服务，然后按照简单的预订步骤轻松预订 📝',
            back: '返回预订'
          },
          ko: {
            prompt: '이용 가능한 서비스를 탐색하고 적합한 것을 선택한 다음 간단한 예약 단계를 따라 쉽게 예약할 수 있습니다 📝',
            back: '예약으로 돌아가기'
          },
          pt: {
            prompt: 'Você pode reservar facilmente navegando pelos serviços disponíveis e escolhendo o que lhe convém, depois seguindo os passos simples de reserva 📝',
            back: 'Voltar para Reservas'
          },
          ur: {
            prompt: 'آپ دستیاب خدمات کو براؤز کرکے اور اپنی پسند کا انتخاب کرکے، پھر آسان بکنگ اقدامات کی پیروی کرکے آسانی سے بک کر سکتے ہیں 📝',
            back: 'بکنگز پر واپس جائیں'
          },
          ja: {
            prompt: '利用可能なサービスを閲覧して自分に合ったものを選び、簡単な予約手順に従うだけで簡単に予約できます 📝',
            back: '予約に戻る'
          }
        };

        addBotMessage(
          getLangText(bookingMethodOptions).prompt,
          [
            { id: 'bookings', text: getLangText(bookingMethodOptions).back }
          ]
        );
        break;

      case 'manage_bookings':
      case 'view_bookings':
        // Manage bookings options text by language
        const manageBookingsOptions = {
          ar: {
            prompt: 'يمكنك إدارة ومشاهدة جميع حجوزاتك من خلال صفحة الحجوزات 📋',
            goTo: 'انتقل إلى صفحة الحجوزات',
            back: 'العودة لقائمة الحجوزات'
          },
          en: {
            prompt: 'You can manage and view all your bookings through the bookings page 📋',
            goTo: 'Go to Bookings Page',
            back: 'Back to Bookings'
          },
          fr: {
            prompt: 'Vous pouvez gérer et consulter toutes vos réservations via la page des réservations 📋',
            goTo: 'Aller à la Page des Réservations',
            back: 'Retour aux Réservations'
          },
          de: {
            prompt: 'Sie können alle Ihre Buchungen über die Buchungsseite verwalten und einsehen 📋',
            goTo: 'Zur Buchungsseite',
            back: 'Zurück zu Buchungen'
          },
          es: {
            prompt: 'Puede gestionar y ver todas sus reservas a través de la página de reservas 📋',
            goTo: 'Ir a la Página de Reservas',
            back: 'Volver a Reservas'
          },
          tr: {
            prompt: 'Tüm rezervasyonlarınızı rezervasyon sayfası üzerinden yönetebilir ve görüntüleyebilirsiniz 📋',
            goTo: 'Rezervasyon Sayfasına Git',
            back: 'Rezervasyonlara Dön'
          },
          ru: {
            prompt: 'Вы можете управлять и просматривать все свои бронирования через страницу бронирований 📋',
            goTo: 'Перейти на Страницу Бронирований',
            back: 'Вернуться к Бронированиям'
          },
          zh: {
            prompt: '您可以通过预订页面管理和查看所有预订 📋',
            goTo: '前往预订页面',
            back: '返回预订'
          },
          ko: {
            prompt: '예약 페이지를 통해 모든 예약을 관리하고 볼 수 있습니다 📋',
            goTo: '예약 페이지로 이동',
            back: '예약으로 돌아가기'
          },
          pt: {
            prompt: 'Você pode gerenciar e visualizar todas as suas reservas através da página de reservas 📋',
            goTo: 'Ir para a Página de Reservas',
            back: 'Voltar para Reservas'
          },
          ur: {
            prompt: 'آپ بکنگز پیج کے ذریعے اپنی تمام بکنگز کا انتظام اور دیکھ سکتے ہیں 📋',
            goTo: 'بکنگز پیج پر جائیں',
            back: 'بکنگز پر واپس جائیں'
          },
          ja: {
            prompt: '予約ページから全ての予約を管理・閲覧できます 📋',
            goTo: '予約ページへ移動',
            back: '予約に戻る'
          }
        };

        addBotMessage(
          getLangText(manageBookingsOptions).prompt,
          [
            { id: 'go_to_bookings', text: getLangText(manageBookingsOptions).goTo, link: '/reservations' },
            { id: 'bookings', text: getLangText(manageBookingsOptions).back }
          ]
        );
        break;

      case 'contact_info':
        // Contact info options text by language
        const contactInfoOptions = {
          ar: {
            prompt: 'يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف. فريقنا متاح لمساعدتك في أي وقت 📞✉️',
            back: 'العودة لخدمة العملاء'
          },
          en: {
            prompt: 'You can contact us via email or phone. Our team is available to help you anytime 📞✉️',
            back: 'Back to Customer Service'
          },
          fr: {
            prompt: 'Vous pouvez nous contacter par e-mail ou par téléphone. Notre équipe est disponible pour vous aider à tout moment 📞✉️',
            back: 'Retour au Service Client'
          },
          de: {
            prompt: 'Sie können uns per E-Mail oder Telefon kontaktieren. Unser Team steht Ihnen jederzeit zur Verfügung 📞✉️',
            back: 'Zurück zum Kundendienst'
          },
          es: {
            prompt: 'Puede contactarnos por correo electrónico o teléfono. Nuestro equipo está disponible para ayudarle en cualquier momento 📞✉️',
            back: 'Volver al Servicio al Cliente'
          },
          tr: {
            prompt: 'Bize e-posta veya telefon yoluyla ulaşabilirsiniz. Ekibimiz size her zaman yardımcı olmak için hazırdır 📞✉️',
            back: 'Müşteri Hizmetlerine Dön'
          },
          ru: {
            prompt: 'Вы можете связаться с нами по электронной почте или телефону. Наша команда всегда готова помочь вам 📞✉️',
            back: 'Вернуться в Службу Поддержки'
          },
          zh: {
            prompt: '您可以通过电子邮件或电话与我们联系。我们的团队随时为您提供帮助 📞✉️',
            back: '返回客户服务'
          },
          ko: {
            prompt: '이메일이나 전화로 연락하실 수 있습니다. 저희 팀은 언제든지 도움을 드릴 준비가 되어 있습니다 📞✉️',
            back: '고객 서비스로 돌아가기'
          },
          pt: {
            prompt: 'Você pode nos contatar por e-mail ou telefone. Nossa equipe está disponível para ajudá-lo a qualquer momento 📞✉️',
            back: 'Voltar ao Atendimento ao Cliente'
          },
          ur: {
            prompt: 'آپ ہم سے ای میل یا فون کے ذریعے رابطہ کر سکتے ہیں۔ ہماری ٹیم کسی بھی وقت آپ کی مدد کے لیے دستیاب ہے 📞✉️',
            back: 'کسٹمر سروس پر واپس جائیں'
          },
          ja: {
            prompt: 'メールまたは電話でお問い合わせいただけます。私たちのチームはいつでもお手伝いする準備ができています 📞✉️',
            back: 'カスタマーサービスに戻る'
          }
        };

        addBotMessage(
          getLangText(contactInfoOptions).prompt,
          [
            { id: 'customer_service', text: getLangText(contactInfoOptions).back }
          ]
        );
        break;

      case 'reset_password':
        // Reset password options text by language
        const resetPasswordOptions = {
          ar: {
            prompt: 'يمكنك إعادة تعيين كلمة المرور من خلال صفحة تسجيل الدخول 🔑'
          },
          en: {
            prompt: 'You can reset your password through the login page 🔑'
          },
          fr: {
            prompt: 'Vous pouvez réinitialiser votre mot de passe via la page de connexion 🔑'
          },
          de: {
            prompt: 'Sie können Ihr Passwort über die Anmeldeseite zurücksetzen 🔑'
          },
          es: {
            prompt: 'Puede restablecer su contraseña a través de la página de inicio de sesión 🔑'
          },
          tr: {
            prompt: 'Giriş sayfası üzerinden şifrenizi sıfırlayabilirsiniz 🔑'
          },
          ru: {
            prompt: 'Вы можете сбросить пароль через страницу входа 🔑'
          },
          zh: {
            prompt: '您可以通过登录页面重置密码 🔑'
          },
          ko: {
            prompt: '로그인 페이지를 통해 비밀번호를 재설정할 수 있습니다 🔑'
          },
          pt: {
            prompt: 'Você pode redefinir sua senha através da página de login 🔑'
          },
          ur: {
            prompt: 'آپ لاگ ان پیج کے ذریعے اپنا پاس ورڈ دوبارہ ترتیب دے سکتے ہیں 🔑'
          },
          ja: {
            prompt: 'ログインページからパスワードをリセットできます 🔑'
          }
        };

        addBotMessage(
          getLangText(resetPasswordOptions).prompt,
          [
            {
              id: 'go_to_login', text: getLangText({
                ar: { text: 'انتقل إلى صفحة تسجيل الدخول' },
                en: { text: 'Go to Login Page' },
                fr: { text: 'Aller à la Page de Connexion' },
                de: { text: 'Zur Anmeldeseite' },
                es: { text: 'Ir a la Página de Inicio de Sesión' },
                tr: { text: 'Giriş Sayfasına Git' },
                ru: { text: 'Перейти на Страницу Входа' },
                zh: { text: '前往登录页面' },
                ko: { text: '로그인 페이지로 이동' },
                pt: { text: 'Ir para a Página de Login' },
                ur: { text: 'لاگ ان پیج پر جائیں' },
                ja: { text: 'ログインページへ移動' }
              }).text, link: '/login'
            },
            {
              id: 'auth', text: getLangText({
                ar: { text: 'العودة للقائمة السابقة' },
                en: { text: 'Back to Previous Menu' },
                fr: { text: 'Retour au Menu Précédent' },
                de: { text: 'Zurück zum vorherigen Menü' },
                es: { text: 'Volver al Menú Anterior' },
                tr: { text: 'Önceki Menüye Dön' },
                ru: { text: 'Вернуться в Предыдущее Меню' },
                zh: { text: '返回上一菜单' },
                ko: { text: '이전 메뉴로 돌아가기' },
                pt: { text: 'Voltar ao Menu Anterior' },
                ur: { text: 'پچھلے مینو پر واپس جائیں' },
                ja: { text: '前のメニューに戻る' }
              }).text
            },
            {
              id: 'main_menu', text: getLangText({
                ar: { text: 'العودة للقائمة الرئيسية' },
                en: { text: 'Back to Main Menu' },
                fr: { text: 'Retour au Menu Principal' },
                de: { text: 'Zurück zum Hauptmenü' },
                es: { text: 'Volver al Menú Principal' },
                tr: { text: 'Ana Menüye Dön' },
                ru: { text: 'Вернуться в Главное Меню' },
                zh: { text: '返回主菜单' },
                ko: { text: '메인 메뉴로 돌아가기' },
                pt: { text: 'Voltar ao Menu Principal' },
                ur: { text: 'مین مینو پر واپس جائیں' },
                ja: { text: 'メインメニューに戻る' }
              }).text
            }
          ]
        );
        break;

      case 'contact_support':
        // Contact support options text by language
        const contactSupportOptions = {
          ar: {
            prompt: 'يمكنك التواصل مع فريق الدعم الفني لمساعدتك في أي استفسار ☎️',
            contact: 'معلومات التواصل 📞',
            back: 'العودة للقائمة السابقة',
            main: 'العودة للقائمة الرئيسية'
          },
          en: {
            prompt: 'You can contact our technical support team for any inquiries ☎️',
            contact: 'Contact Information 📞',
            back: 'Back to Previous Menu',
            main: 'Back to Main Menu'
          },
          fr: {
            prompt: 'Vous pouvez contacter notre équipe de support technique pour toute demande ☎️',
            contact: 'Informations de Contact 📞',
            back: 'Retour au Menu Précédent',
            main: 'Retour au Menu Principal'
          },
          de: {
            prompt: 'Sie können unser technisches Support-Team für alle Anfragen kontaktieren ☎️',
            contact: 'Kontaktinformationen 📞',
            back: 'Zurück zum vorherigen Menü',
            main: 'Zurück zum Hauptmenü'
          },
          es: {
            prompt: 'Puede contactar con nuestro equipo de soporte técnico para cualquier consulta ☎️',
            contact: 'Información de Contacto 📞',
            back: 'Volver al Menú Anterior',
            main: 'Volver al Menú Principal'
          },
          tr: {
            prompt: 'Herhangi bir sorunuz için teknik destek ekibimizle iletişime geçebilirsiniz ☎️',
            contact: 'İletişim Bilgileri 📞',
            back: 'Önceki Menüye Dön',
            main: 'Ana Menüye Dön'
          },
          ru: {
            prompt: 'Вы можете связаться с нашей службой технической поддержки по любым вопросам ☎️',
            contact: 'Контактная Информация 📞',
            back: 'Вернуться в Предыдущее Меню',
            main: 'Вернуться в Главное Меню'
          },
          zh: {
            prompt: '您可以联系我们的技术支持团队解答任何疑问 ☎️',
            contact: '联系信息 📞',
            back: '返回上一菜单',
            main: '返回主菜单'
          },
          ko: {
            prompt: '문의 사항이 있으시면 기술 지원팀에 문의하실 수 있습니다 ☎️',
            contact: '연락처 정보 📞',
            back: '이전 메뉴로 돌아가기',
            main: '메인 메뉴로 돌아가기'
          },
          pt: {
            prompt: 'Você pode entrar em contato com nossa equipe de suporte técnico para quaisquer dúvidas ☎️',
            contact: 'Informações de Contato 📞',
            back: 'Voltar ao Menu Anterior',
            main: 'Voltar ao Menu Principal'
          },
          ur: {
            prompt: 'آپ کسی بھی استفسار کے لیے ہماری تکنیکی سپورٹ ٹیم سے رابطہ کر سکتے ہیں ☎️',
            contact: 'رابطہ کی معلومات 📞',
            back: 'پچھلے مینو پر واپس جائیں',
            main: 'مین مینو پر واپس جائیں'
          },
          ja: {
            prompt: 'お問い合わせについては、テクニカルサポートチームにお問い合わせください ☎️',
            contact: '連絡先情報 📞',
            back: '前のメニューに戻る',
            main: 'メインメニューに戻る'
          }
        };

        addBotMessage(
          getLangText(contactSupportOptions).prompt,
          [
            { id: 'contact_info', text: getLangText(contactSupportOptions).contact },
            { id: 'auth', text: getLangText(contactSupportOptions).back },
            { id: 'main_menu', text: getLangText(contactSupportOptions).main }
          ]
        );
        break;

      case 'register_customer':
        // Register customer options text by language
        const registerCustomerOptions = {
          ar: {
            prompt: 'شاهد فيديو شرح التسجيل كعميل 🧑‍💼 من خلال الرابط التالي:',
            video: 'شاهد فيديو التسجيل 🎥',
            back: 'العودة للقائمة السابقة',
            main: 'العودة للقائمة الرئيسية'
          },
          en: {
            prompt: 'Watch the customer registration tutorial video 🧑‍💼 through the following link:',
            video: 'Watch Registration Video 🎥',
            back: 'Back to Previous Menu',
            main: 'Back to Main Menu'
          },
          fr: {
            prompt: 'Regardez la vidéo tutorielle d\'inscription client 🧑‍💼 via le lien suivant:',
            video: 'Regarder la Vidéo d\'Inscription 🎥',
            back: 'Retour au Menu Précédent',
            main: 'Retour au Menu Principal'
          },
          de: {
            prompt: 'Sehen Sie sich das Kundenregistrierungs-Tutorial-Video 🧑‍💼 über den folgenden Link an:',
            video: 'Registrierungsvideo ansehen 🎥',
            back: 'Zurück zum vorherigen Menü',
            main: 'Zurück zum Hauptmenü'
          },
          es: {
            prompt: 'Vea el video tutorial de registro de cliente 🧑‍💼 a través del siguiente enlace:',
            video: 'Ver Video de Registro 🎥',
            back: 'Volver al Menú Anterior',
            main: 'Volver al Menú Principal'
          },
          tr: {
            prompt: 'Aşağıdaki bağlantı üzerinden müşteri kayıt eğitim videosunu 🧑‍💼 izleyin:',
            video: 'Kayıt Videosunu İzle 🎥',
            back: 'Önceki Menüye Dön',
            main: 'Ana Menüye Dön'
          },
          ru: {
            prompt: 'Посмотрите обучающее видео по регистрации клиентов 🧑‍💼 по следующей ссылке:',
            video: 'Посмотреть Видео о Регистрации 🎥',
            back: 'Вернуться в Предыдущее Меню',
            main: 'Вернуться в Главное Меню'
          },
          zh: {
            prompt: '通过以下链接观看客户注册教程视频 🧑‍💼：',
            video: '观看注册视频 🎥',
            back: '返回上一菜单',
            main: '返回主菜单'
          },
          ko: {
            prompt: '다음 링크를 통해 고객 등록 튜토리얼 비디오 🧑‍💼를 시청하세요:',
            video: '등록 비디오 시청 🎥',
            back: '이전 메뉴로 돌아가기',
            main: '메인 메뉴로 돌아가기'
          },
          pt: {
            prompt: 'Assista ao vídeo tutorial de registro de cliente 🧑‍💼 através do seguinte link:',
            video: 'Assistir Vídeo de Registro 🎥',
            back: 'Voltar ao Menu Anterior',
            main: 'Voltar ao Menu Principal'
          },
          ur: {
            prompt: 'درج ذیل لنک کے ذریعے کسٹمر رجسٹریشن ٹیوٹوریل ویڈیو 🧑‍💼 دیکھیں:',
            video: 'رجسٹریشن ویڈیو دیکھیں 🎥',
            back: 'پچھلے مینو پر واپس جائیں',
            main: 'مین مینو پر واپس جائیں'
          },
          ja: {
            prompt: '以下のリンクから顧客登録チュートリアルビデオ 🧑‍💼 をご覧ください：',
            video: '登録ビデオを見る 🎥',
            back: '前のメニューに戻る',
            main: 'メインメニューに戻る'
          }
        };

        addBotMessage(
          getLangText(registerCustomerOptions).prompt,
          [
            { id: 'customer_video', text: getLangText(registerCustomerOptions).video, link: 'https://drive.google.com/file/d/19eV-XwU8BT82RYKAcE4kOagTr-qeanDS/view?usp=drive_link' },
            { id: 'auth', text: getLangText(registerCustomerOptions).back },
            { id: 'main_menu', text: getLangText(registerCustomerOptions).main }
          ]
        );
        break;

      case 'register_provider':
        // Register provider options text by language
        const registerProviderOptions = {
          ar: {
            prompt: 'شاهد فيديو شرح التسجيل كمورد 🏪 من خلال الرابط التالي:',
            video: 'شاهد فيديو التسجيل 🎥',
            back: 'العودة للقائمة السابقة',
            main: 'العودة للقائمة الرئيسية'
          },
          en: {
            prompt: 'Watch the provider registration tutorial video 🏪 through the following link:',
            video: 'Watch Registration Video 🎥',
            back: 'Back to Previous Menu',
            main: 'Back to Main Menu'
          },
          fr: {
            prompt: 'Regardez la vidéo tutorielle d\'inscription fournisseur 🏪 via le lien suivant:',
            video: 'Regarder la Vidéo d\'Inscription 🎥',
            back: 'Retour au Menu Précédent',
            main: 'Retour au Menu Principal'
          },
          de: {
            prompt: 'Sehen Sie sich das Anbieterregistrierungs-Tutorial-Video 🏪 über den folgenden Link an:',
            video: 'Registrierungsvideo ansehen 🎥',
            back: 'Zurück zum vorherigen Menü',
            main: 'Zurück zum Hauptmenü'
          },
          es: {
            prompt: 'Vea el video tutorial de registro de proveedor 🏪 a través del siguiente enlace:',
            video: 'Ver Video de Registro 🎥',
            back: 'Volver al Menú Anterior',
            main: 'Volver al Menú Principal'
          },
          tr: {
            prompt: 'Aşağıdaki bağlantı üzerinden sağlayıcı kayıt eğitim videosunu 🏪 izleyin:',
            video: 'Kayıt Videosunu İzle 🎥',
            back: 'Önceki Menüye Dön',
            main: 'Ana Menüye Dön'
          },
          ru: {
            prompt: 'Посмотрите обучающее видео по регистрации поставщика 🏪 по следующей ссылке:',
            video: 'Посмотреть Видео о Регистрации 🎥',
            back: 'Вернуться в Предыдущее Меню',
            main: 'Вернуться в Главное Меню'
          },
          zh: {
            prompt: '通过以下链接观看供应商注册教程视频 🏪：',
            video: '观看注册视频 🎥',
            back: '返回上一菜单',
            main: '返回主菜单'
          },
          ko: {
            prompt: '다음 링크를 통해 공급자 등록 튜토리얼 비디오 🏪를 시청하세요:',
            video: '등록 비디오 시청 🎥',
            back: '이전 메뉴로 돌아가기',
            main: '메인 메뉴로 돌아가기'
          },
          pt: {
            prompt: 'Assista ao vídeo tutorial de registro de fornecedor 🏪 através do seguinte link:',
            video: 'Assistir Vídeo de Registro 🎥',
            back: 'Voltar ao Menu Anterior',
            main: 'Voltar ao Menu Principal'
          },
          ur: {
            prompt: 'درج ذیل لنک کے ذریعے فراہم کنندہ رجسٹریشن ٹیوٹوریل ویڈیو 🏪 دیکھیں:',
            video: 'رجسٹریشن ویڈیو دیکھیں 🎥',
            back: 'پچھلے مینو پر واپس جائیں',
            main: 'مین مینو پر واپس جائیں'
          },
          ja: {
            prompt: '以下のリンクからプロバイダー登録チュートリアルビデオ 🏪 をご覧ください：',
            video: '登録ビデオを見る 🎥',
            back: '前のメニューに戻る',
            main: 'メインメニューに戻る'
          }
        };

        addBotMessage(
          getLangText(registerProviderOptions).prompt,
          [
            { id: 'provider_video', text: getLangText(registerProviderOptions).video, link: 'https://drive.google.com/file/d/19eV-XwU8BT82RYKAcE4kOagTr-qeanDS/view?usp=drive_link' },
            { id: 'auth', text: getLangText(registerProviderOptions).back },
            { id: 'main_menu', text: getLangText(registerProviderOptions).main }
          ]
        );
        break;

      default:
        // Default error message options text by language
        const defaultErrorOptions = {
          ar: 'عذراً، لم أفهم طلبك. يمكنك اختيار من الخيارات المتاحة.',
          en: 'Sorry, I didn\'t understand your request. You can choose from the available options.',
          fr: 'Désolé, je n\'ai pas compris votre demande. Vous pouvez choisir parmi les options disponibles.',
          de: 'Entschuldigung, ich habe Ihre Anfrage nicht verstanden. Sie können aus den verfügbaren Optionen wählen.',
          es: 'Lo siento, no entendí tu solicitud. Puedes elegir entre las opciones disponibles.',
          tr: 'Üzgünüm, isteğinizi anlamadım. Mevcut seçeneklerden seçim yapabilirsiniz.',
          ru: 'Извините, я не понял ваш запрос. Вы можете выбрать из доступных вариантов.',
          zh: '抱歉，我没有理解您的请求。您可以从可用选项中进行选择。',
          ko: '죄송합니다. 요청을 이해하지 못했습니다. 사용 가능한 옵션 중에서 선택할 수 있습니다.',
          pt: 'Desculpe, não entendi seu pedido. Você pode escolher entre as opções disponíveis.',
          ur: 'معذرت، میں آپ کی درخواست کو نہیں سمجھ سکا۔ آپ دستیاب اختیارات میں سے انتخاب کر سکتے ہیں۔',
          ja: '申し訳ありませんが、リクエストを理解できませんでした。利用可能なオプションから選択してください。'
        };

        addBotMessage(
          defaultErrorOptions[currentLanguage] || defaultErrorOptions['en'],
          getConversationData().initialOptions
        );
    }
  };

  // Get the appropriate conversation data based on language
  const getConversationData = () => {
    return conversationData[currentLanguage] || conversationData['en'];
  };

  return (
    <div className="chatbot-container">
      {/* Chat button */}
      <div
        className="chatbot-button"
        onClick={toggleChatBot}
        aria-label={{
          ar: 'فتح المساعد الافتراضي',
          en: 'Open chat assistant',
          fr: 'Ouvrir l\'assistant de chat',
          de: 'Chat-Assistent öffnen',
          es: 'Abrir asistente de chat',
          tr: 'Sohbet asistanını aç',
          ru: 'Открыть помощник чата',
          zh: '打开聊天助手',
          ko: '채팅 도우미 열기',
          pt: 'Abrir assistente de chat',
          ur: 'چیٹ اسسٹنٹ کھولیں',
          ja: 'チャットアシスタントを開く'
        }[currentLanguage] || 'Open chat assistant'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5996 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17791 17.6006L2.58522 19.8267C2.32285 20.793 3.20701 21.6771 4.17335 21.4148L6.39939 20.8221C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4004 22 12 22Z" stroke="white" strokeWidth="1.5" />
          <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 15.5H13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <img src={lailaAvatar} alt={lilaName[currentLanguage] || "Lily"} />
            </div>
            <div className="chatbot-info">
              <h3>{lilaName[currentLanguage] || "Lily"}</h3>
              <p>
                {{
                  ar: 'مساعد افتراضي',
                  en: 'Virtual Assistant',
                  fr: 'Assistant Virtuel',
                  de: 'Virtueller Assistent',
                  es: 'Asistente Virtual',
                  tr: 'Sanal Asistan',
                  ru: 'Виртуальный помощник',
                  zh: '虚拟助手',
                  ko: '가상 비서',
                  pt: 'Assistente Virtual',
                  ur: 'ورچوئل اسسٹنٹ',
                  ja: 'バーチャルアシスタント'
                }[currentLanguage] || 'Virtual Assistant'}
              </p>
            </div>
            <button
              className="chatbot-close"
              onClick={toggleChatBot}
              aria-label={{
                ar: 'إغلاق',
                en: 'Close',
                fr: 'Fermer',
                de: 'Schließen',
                es: 'Cerrar',
                tr: 'Kapat',
                ru: 'Закрыть',
                zh: '关闭',
                ko: '닫기',
                pt: 'Fechar',
                ur: 'بند کریں',
                ja: '閉じる'
              }[currentLanguage] || 'Close'}
            >
              &times;
            </button>
          </div>

          <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === 'bot' && (
                  <img src={lailaAvatar} alt={lilaName[currentLanguage] || "Lily"} className="bot-avatar" />
                )}
                {message.type === 'user' && (
                  <img
                    src={profile?.photo || userPlaceholder}
                    alt={{ ar: 'المستخدم', en: 'User', fr: 'Utilisateur', de: 'Benutzer', es: 'Usuario', tr: 'Kullanıcı', ru: 'Пользователь', zh: '用户', ko: '사용자', pt: 'Usuário', ur: 'صارف', ja: 'ユーザー' }[currentLanguage] || 'User'}
                    className="user-avatar"
                  />
                )}
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.options && (
                    <div className="message-options">
                      {message.options.map((option, optIndex) => (
                        option.link ? (
                          <Link
                            key={optIndex}
                            to={option.link}
                            className="message-option"
                            {...(option.id === 'customer_video' || option.id === 'provider_video' ? { target: '_blank' } : {})}
                          >
                            {option.text}
                          </Link>
                        ) : (
                          <button
                            key={optIndex}
                            className="message-option"
                            onClick={() => handleOptionClick(option.id, option.text)}
                          >
                            {option.text}
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot">
                <img src={lailaAvatar} alt={lilaName[currentLanguage] || "Lily"} className="bot-avatar" />
                <div className="message-content typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;