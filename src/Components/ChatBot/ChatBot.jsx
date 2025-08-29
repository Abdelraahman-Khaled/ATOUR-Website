import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import { Link } from 'react-router-dom';
import './ChatBot.css';
import lailaAvatar from '../../assets/images/chatbot/sara-avatar.svg';

const ChatBot = () => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedCTA, setSelectedCTA] = useState(null);
  const answerRef = useRef(null);

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
    setSelectedQuestion(null);
    setSelectedCTA(null);
  };

  // Handle question click
  const handleQuestionClick = (id) => {
    setSelectedQuestion(id);
    setSelectedCTA(null);
  };

  // Handle CTA button click
  const handleCTAClick = (id) => {
    setSelectedCTA(id);
    setSelectedQuestion(null);
  };

  // Scroll to answer when a question is selected
  useEffect(() => {
    if ((selectedQuestion || selectedCTA) && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedQuestion, selectedCTA]);

  // Conversation data with questions, suggested responses, and CTAs
  const conversationData = {
    ar: {
      welcome: "✨ معك ليلى من جولة! 🌟 نورت جولة وأهلاً بك 🤍. هنا بتكتشف السعودية 🇸🇦 بعيون جولة ومقدمي خدماتها المميزين. راح تعيش تجربة ثقافية 🕌، تذوق أحلى الأكلات الشعبية 🍲، وتزور أجمل الأماكن الأثرية والسياحية 🏰🌄. كيف أقدر أخدمك اليوم؟",
      questions: [
        {
          id: 1,
          text: "ودك بجولة؟ 🏞️",
          response: "عندنا جولات تراثية 🏰، ثقافية 🎨، عائلية 👨‍👩‍👧‍👦، ومغامرات 🌄.",
          ctas: [
            { id: "tour1", text: "شاهد الجولات المتاحة 🗺️" },
            { id: "tour2", text: "جولات عائلية 👨‍👩‍👧‍👦" },
            { id: "tour3", text: "جولات مغامرات 🌄" }
          ]
        },
        {
          id: 2,
          text: "ودك بهدية تذكارية من وحي تراثنا وثقافتنا؟ 🎁",
          response: "نوفر متجر للهدايا التراثية السعودية المميزة 🕌🛍️.",
          ctas: [
            { id: "gift1", text: "تصفح متجر الهدايا 🎁" }
          ]
        },
        {
          id: 3,
          text: "تبي تعرف لو فيه مهرجان أو فعالية قريبة منك؟ 🎉",
          response: "نعطيك جدول المهرجانات والفعاليات حسب موقعك 📅📍.",
          ctas: [
            { id: "event1", text: "اكتشف المهرجانات 🎉" }
          ]
        },
        {
          id: 4,
          text: "كيف أحجز جولة؟ 📝",
          response: "الحجز سهل: اختر الجولة أو المنتج → حدد التاريخ وعدد الأشخاص → اختر طريقة الدفع → تأكيد → ادفع عبر التطبيق 💳.",
          ctas: [
            { id: "book1", text: "احجز الآن 🗓️" }
          ]
        },
        {
          id: 5,
          text: "أقدر أعدل أو ألغي الحجز؟ ❓",
          response: "نعم، تقدر تلغي أو تعدل قبل الموعد 72–48 ساعة ⏰، وأحياناً حتى 24 ساعة حسب نوع الحجز.",
          ctas: [
            { id: "manage1", text: "إدارة حجوزاتي 📋" }
          ]
        },
        {
          id: 6,
          text: "ما وصلني تأكيد الحجز؟ 📧",
          response: "راجع بريدك الإلكتروني 📬 أو تحقق من \"حجوزاتي\" داخل التطبيق.",
          ctas: [
            { id: "view1", text: "شاهد حجوزاتك 📂" }
          ]
        },
        {
          id: 7,
          text: "ما قدرت أسجل حساب جديد؟ ❌",
          response: "تأكد من كتابة بريدك الإلكتروني ورقم جوالك ✉️📱، بعد التأكد أعد تعيين كلمة المرور 🔑 من صفحة الدخول. أو تواصل مع الدعم ☎️ 0568015093.",
          ctas: [
            { id: "reset1", text: "إعادة تعيين كلمة المرور 🔑" },
            { id: "support1", text: "تواصل مع الدعم ☎️" }
          ]
        },
        {
          id: 8,
          text: "أقدر أسجل كمرشد سياحي أو مورد أو مقدم خدمات سياحية؟ 🧑‍💼",
          response: "نعم! سواء تقدم جولة 🏞️، تجربة 🎨، هدايا 🎁، أو إدارة مهرجان موسمي 🎉، التسجيل متاح عبر التطبيق ويتم تفعيله خلال دقائق ⏳.",
          ctas: [
            { id: "register1", text: "سجل كمرشد 🧑‍💼" },
            { id: "register2", text: "سجل كمورد 🏪" }
          ]
        }
      ],
      farewell: "🤍 شكراً لثقتك في جولة! تذكر: جولة ليست مجرد رحلة، بل تجربة لا تُنسى 🌍✨. نراك قريباً في جولة أخرى 🏞️ مع تجربة أجمل 🌄، ومع هدية تذكارية 🎁 تذكرك بجولاتك معنا دائم",
      farewellCTAs: [
        { id: "newbooking1", text: "احجز جولة جديدة 🗓️" },
        { id: "giftshop1", text: "شاهد متجر الهدايا 🎁" }
      ],
      initialOptions: [
        { id: "service1", text: "جولة سياحية 🏞️" },
        { id: "service2", text: "هدية تذكارية 🎁" },
        { id: "service3", text: "مهرجان أو فعالية 🎉" },
        { id: "service4", text: "مساعدة بالحجز أو الدفع 💳" }
      ],
      initialPrompt: "اختر الخدمة اللي تناسبك من الخيارات التالية:"
    },
    en: {
      welcome: "✨ This is Layla from Jawla! 🌟 Welcome to Jawla 🤍. Here you'll discover Saudi Arabia 🇸🇦 through the eyes of Jawla and its distinguished service providers. You'll experience cultural journeys 🕌, taste the best traditional foods 🍲, and visit the most beautiful historical and tourist sites 🏰🌄. How can I help you today?",
      questions: [
        {
          id: 1,
          text: "Would you like a tour? 🏞️",
          response: "We have heritage tours 🏰, cultural tours 🎨, family tours 👨‍👩‍👧‍👦, and adventure tours 🌄.",
          ctas: [
            { id: "tour1", text: "Browse available tours 🗺️" },
            { id: "tour2", text: "Family tours 👨‍👩‍👧‍👦" },
            { id: "tour3", text: "Adventure tours 🌄" }
          ]
        },
        {
          id: 2,
          text: "Would you like a souvenir inspired by our heritage and culture? 🎁",
          response: "We provide a store for distinctive Saudi heritage gifts 🕌🛍️.",
          ctas: [
            { id: "gift1", text: "Browse gift shop 🎁" }
          ]
        },
        {
          id: 3,
          text: "Want to know if there's a festival or event near you? 🎉",
          response: "We'll give you a schedule of festivals and events based on your location 📅📍.",
          ctas: [
            { id: "event1", text: "Discover festivals 🎉" }
          ]
        },
        {
          id: 4,
          text: "How do I book a tour? 📝",
          response: "Booking is easy: Choose the tour or product → Select date and number of people → Choose payment method → Confirm → Pay through the app 💳.",
          ctas: [
            { id: "book1", text: "Book now 🗓️" }
          ]
        },
        {
          id: 5,
          text: "Can I modify or cancel my booking? ❓",
          response: "Yes, you can cancel or modify 72-48 hours before the appointment ⏰, and sometimes even 24 hours depending on the type of booking.",
          ctas: [
            { id: "manage1", text: "Manage my bookings 📋" }
          ]
        },
        {
          id: 6,
          text: "I didn't receive booking confirmation? 📧",
          response: "Check your email 📬 or check 'My Bookings' within the app.",
          ctas: [
            { id: "view1", text: "View your bookings 📂" }
          ]
        },
        {
          id: 7,
          text: "I couldn't register a new account? ❌",
          response: "Make sure you've entered your email and mobile number correctly ✉️📱, then reset your password 🔑 from the login page. Or contact support ☎️ 0568015093.",
          ctas: [
            { id: "reset1", text: "Reset password 🔑" },
            { id: "support1", text: "Contact support ☎️" }
          ]
        },
        {
          id: 8,
          text: "Can I register as a tour guide or service provider? 🧑‍💼",
          response: "Yes! Whether you offer tours 🏞️, experiences 🎨, gifts 🎁, or manage a seasonal festival 🎉, registration is available through the app and is activated within minutes ⏳.",
          ctas: [
            { id: "register1", text: "Register as guide 🧑‍💼" },
            { id: "register2", text: "Register as vendor 🏪" }
          ]
        },
        {
          id: 9,
          text: "What payment methods are available? 💳",
          response: "We accept all types of payment 💳, the payment gateway in the app supports most types of electronic payment ⚡."
        },
        {
          id: 10,
          text: "I tried to pay but it didn't work? ❌",
          response: "Try another card 💳 or check your balance 💰, and if the problem persists, contact us ☎️.",
          ctas: [
            { id: "financial1", text: "Contact financial support 💳" }
          ]
        },
        {
          id: 11,
          text: "Do prices include tax? 💰",
          response: "Yes, final prices include tax ✅."
        },
        {
          id: 12,
          text: "The app won't open or there's a problem ⚠️",
          response: "Try updating the app 🔄 or restarting your device 📱💻. If it continues, let us know ☎️.",
          ctas: [
            { id: "tech1", text: "Contact technical support 🛠️" }
          ]
        }
      ],
      farewell: "🤍 Thank you for your trust in Jawla! Remember: Jawla is not just a trip, but an unforgettable experience 🌍✨. See you soon on another tour 🏞️ with an even better experience 🌄, and with a souvenir 🎁 to always remind you of your tours with us.",
      farewellCTAs: [
        { id: "newbooking1", text: "Book a new tour 🗓️" },
        { id: "giftshop1", text: "Visit gift shop 🎁" }
      ],
      initialOptions: [
        { id: "service1", text: "Tourist tour 🏞️" },
        { id: "service2", text: "Souvenir gift 🎁" },
        { id: "service3", text: "Festival or event 🎉" },
        { id: "service4", text: "Help with booking or payment 💳" }
      ],
      initialPrompt: "Choose the service that suits you from the following options:"
    },
    fr: {
      welcome: "✨ C'est Layla de Jawla! 🌟 Bienvenue à Jawla 🤍. Ici, vous découvrirez l'Arabie Saoudite 🇸🇦 à travers les yeux de Jawla et de ses prestataires de services distingués. Vous vivrez des voyages culturels 🕌, goûterez aux meilleures cuisines traditionnelles 🍲, et visiterez les plus beaux sites historiques et touristiques 🏰🌄. Comment puis-je vous aider aujourd'hui?",
      questions: [
        {
          id: 1,
          text: "Souhaitez-vous faire une visite? 🏞️",
          response: "Nous proposons des visites patrimoniales 🏰, culturelles 🎨, familiales 👨‍👩‍👧‍👦, et d'aventure 🌄.",
          ctas: [
            { id: "tour1", text: "Parcourir les visites disponibles 🗺️" },
            { id: "tour2", text: "Visites familiales 👨‍👩‍👧‍👦" },
            { id: "tour3", text: "Visites d'aventure 🌄" }
          ]
        },
        {
          id: 2,
          text: "Souhaitez-vous un souvenir inspiré de notre patrimoine et culture? 🎁",
          response: "Nous proposons une boutique de cadeaux distinctifs du patrimoine saoudien 🕌🛍️.",
          ctas: [
            { id: "gift1", text: "Parcourir la boutique de cadeaux 🎁" }
          ]
        },
        {
          id: 3,
          text: "Voulez-vous savoir s'il y a un festival ou un événement près de chez vous? 🎉",
          response: "Nous vous donnerons un calendrier des festivals et événements en fonction de votre emplacement 📅📍.",
          ctas: [
            { id: "event1", text: "Découvrir les festivals 🎉" }
          ]
        },
        {
          id: 4,
          text: "Comment réserver une visite? 📝",
          response: "La réservation est facile: Choisissez la visite ou le produit → Sélectionnez la date et le nombre de personnes → Choisissez le mode de paiement → Confirmez → Payez via l'application 💳.",
          ctas: [
            { id: "book1", text: "Réserver maintenant 🗓️" }
          ]
        },
        {
          id: 5,
          text: "Puis-je modifier ou annuler ma réservation? ❓",
          response: "Oui, vous pouvez annuler ou modifier 72-48 heures avant le rendez-vous ⏰, et parfois même 24 heures selon le type de réservation.",
          ctas: [
            { id: "manage1", text: "Gérer mes réservations 📋" }
          ]
        },
        {
          id: 6,
          text: "Je n'ai pas reçu de confirmation de réservation? 📧",
          response: "Vérifiez votre e-mail 📬 ou consultez 'Mes Réservations' dans l'application.",
          ctas: [
            { id: "view1", text: "Voir vos réservations 📂" }
          ]
        },
        {
          id: 7,
          text: "Je n'ai pas pu créer un nouveau compte? ❌",
          response: "Assurez-vous d'avoir correctement saisi votre e-mail et numéro de mobile ✉️📱, puis réinitialisez votre mot de passe 🔑 depuis la page de connexion. Ou contactez le support ☎️ 0568015093.",
          ctas: [
            { id: "reset1", text: "Réinitialiser le mot de passe 🔑" },
            { id: "support1", text: "Contacter le support ☎️" }
          ]
        },
        {
          id: 8,
          text: "Puis-je m'inscrire en tant que guide touristique ou prestataire de services? 🧑‍💼",
          response: "Oui! Que vous proposiez des visites 🏞️, des expériences 🎨, des cadeaux 🎁, ou gériez un festival saisonnier 🎉, l'inscription est disponible via l'application et est activée en quelques minutes ⏳.",
          ctas: [
            { id: "register1", text: "S'inscrire comme guide 🧑‍💼" },
            { id: "register2", text: "S'inscrire comme vendeur 🏪" }
          ]
        },
        {
          id: 9,
          text: "Quels modes de paiement sont disponibles? 💳",
          response: "Nous acceptons tous types de paiement 💳, la passerelle de paiement dans l'application prend en charge la plupart des types de paiement électronique ⚡."
        },
        {
          id: 10,
          text: "J'ai essayé de payer mais ça n'a pas fonctionné? ❌",
          response: "Essayez une autre carte 💳 ou vérifiez votre solde 💰, et si le problème persiste, contactez-nous ☎️.",
          ctas: [
            { id: "financial1", text: "Contacter le support financier 💳" }
          ]
        },
        {
          id: 11,
          text: "Les prix incluent-ils les taxes? 💰",
          response: "Oui, les prix finaux incluent les taxes ✅."
        },
        {
          id: 12,
          text: "L'application ne s'ouvre pas ou il y a un problème ⚠️",
          response: "Essayez de mettre à jour l'application 🔄 ou de redémarrer votre appareil 📱💻. Si cela continue, faites-le nous savoir ☎️.",
          ctas: [
            { id: "tech1", text: "Contacter le support technique 🛠️" }
          ]
        }
      ],
      farewell: "🤍 Merci pour votre confiance en Jawla! Souvenez-vous: Jawla n'est pas juste un voyage, mais une expérience inoubliable 🌍✨. À bientôt pour une autre visite 🏞️ avec une expérience encore meilleure 🌄, et avec un souvenir 🎁 pour vous rappeler toujours de vos visites avec nous.",
      farewellCTAs: [
        { id: "newbooking1", text: "Réserver une nouvelle visite 🗓️" },
        { id: "giftshop1", text: "Visiter la boutique de cadeaux 🎁" }
      ],
      initialOptions: [
        { id: "service1", text: "Visite touristique 🏞️" },
        { id: "service2", text: "Cadeau souvenir 🎁" },
        { id: "service3", text: "Festival ou événement 🎉" },
        { id: "service4", text: "Aide à la réservation ou au paiement 💳" }
      ],
      initialPrompt: "Choisissez le service qui vous convient parmi les options suivantes:"
    },
    de: {
      welcome: "✨ Hier ist Layla von Jawla! 🌟 Willkommen bei Jawla 🤍. Hier entdecken Sie Saudi-Arabien 🇸🇦 durch die Augen von Jawla und seinen ausgezeichneten Dienstleistern. Sie erleben kulturelle Reisen 🕌, probieren die besten traditionellen Speisen 🍲 und besuchen die schönsten historischen und touristischen Stätten 🏰🌄. Wie kann ich Ihnen heute helfen?",
      questions: [
        {
          id: 1,
          text: "Möchten Sie eine Tour machen? 🏞️",
          response: "Wir bieten Erbe-Touren 🏰, kulturelle Touren 🎨, Familientouren 👨‍👩‍👧‍👦 und Abenteuertouren 🌄 an.",
          ctas: [
            { id: "tour1", text: "Verfügbare Touren durchsuchen 🗺️" },
            { id: "tour2", text: "Familientouren 👨‍👩‍👧‍👦" },
            { id: "tour3", text: "Abenteuertouren 🌄" }
          ]
        },
        {
          id: 2,
          text: "Möchten Sie ein Souvenir, inspiriert von unserem Erbe und unserer Kultur? 🎁",
          response: "Wir bieten einen Shop für besondere saudische Erbstücke 🕌🛍️.",
          ctas: [
            { id: "gift1", text: "Geschenkeladen durchstöbern 🎁" }
          ]
        },
        {
          id: 3,
          text: "Möchten Sie wissen, ob es ein Festival oder eine Veranstaltung in Ihrer Nähe gibt? 🎉",
          response: "Wir geben Ihnen einen Zeitplan für Festivals und Veranstaltungen basierend auf Ihrem Standort 📅📍.",
          ctas: [
            { id: "event1", text: "Festivals entdecken 🎉" }
          ]
        },
        {
          id: 4,
          text: "Wie buche ich eine Tour? 📝",
          response: "Die Buchung ist einfach: Wählen Sie die Tour oder das Produkt → Wählen Sie Datum und Anzahl der Personen → Wählen Sie die Zahlungsmethode → Bestätigen Sie → Bezahlen Sie über die App 💳.",
          ctas: [
            { id: "book1", text: "Jetzt buchen 🗓️" }
          ]
        },
        {
          id: 5,
          text: "Kann ich meine Buchung ändern oder stornieren? ❓",
          response: "Ja, Sie können 72-48 Stunden vor dem Termin stornieren oder ändern ⏰, und manchmal sogar 24 Stunden je nach Art der Buchung.",
          ctas: [
            { id: "manage1", text: "Meine Buchungen verwalten 📋" }
          ]
        },
        {
          id: 6,
          text: "Ich habe keine Buchungsbestätigung erhalten? 📧",
          response: "Überprüfen Sie Ihre E-Mail 📬 oder überprüfen Sie 'Meine Buchungen' in der App.",
          ctas: [
            { id: "view1", text: "Ihre Buchungen anzeigen 📂" }
          ]
        },
        {
          id: 7,
          text: "Ich konnte kein neues Konto registrieren? ❌",
          response: "Stellen Sie sicher, dass Sie Ihre E-Mail und Handynummer korrekt eingegeben haben ✉️📱, setzen Sie dann Ihr Passwort 🔑 von der Anmeldeseite zurück. Oder kontaktieren Sie den Support ☎️ 0568015093.",
          ctas: [
            { id: "reset1", text: "Passwort zurücksetzen 🔑" },
            { id: "support1", text: "Support kontaktieren ☎️" }
          ]
        },
        {
          id: 8,
          text: "Kann ich mich als Reiseführer oder Dienstleister registrieren? 🧑‍💼",
          response: "Ja! Ob Sie Touren 🏞️, Erlebnisse 🎨, Geschenke 🎁 anbieten oder ein saisonales Festival 🎉 verwalten, die Registrierung ist über die App verfügbar und wird innerhalb von Minuten aktiviert ⏳.",
          ctas: [
            { id: "register1", text: "Als Reiseführer registrieren 🧑‍💼" },
            { id: "register2", text: "Als Anbieter registrieren 🏪" }
          ]
        },
        {
          id: 9,
          text: "Welche Zahlungsmethoden sind verfügbar? 💳",
          response: "Wir akzeptieren alle Arten von Zahlungen 💳, das Zahlungsgateway in der App unterstützt die meisten Arten von elektronischen Zahlungen ⚡."
        },
        {
          id: 10,
          text: "Ich habe versucht zu bezahlen, aber es hat nicht funktioniert? ❌",
          response: "Versuchen Sie eine andere Karte 💳 oder überprüfen Sie Ihr Guthaben 💰, und wenn das Problem weiterhin besteht, kontaktieren Sie uns ☎️.",
          ctas: [
            { id: "financial1", text: "Finanzsupport kontaktieren 💳" }
          ]
        },
        {
          id: 11,
          text: "Sind die Preise inklusive Steuern? 💰",
          response: "Ja, die Endpreise beinhalten Steuern ✅."
        },
        {
          id: 12,
          text: "Die App öffnet sich nicht oder es gibt ein Problem ⚠️",
          response: "Versuchen Sie, die App zu aktualisieren 🔄 oder Ihr Gerät neu zu starten 📱💻. Wenn es weiterhin besteht, lassen Sie es uns wissen ☎️.",
          ctas: [
            { id: "tech1", text: "Technischen Support kontaktieren 🛠️" }
          ]
        }
      ],
      farewell: "🤍 Vielen Dank für Ihr Vertrauen in Jawla! Denken Sie daran: Jawla ist nicht nur eine Reise, sondern ein unvergessliches Erlebnis 🌍✨. Bis bald auf einer anderen Tour 🏞️ mit einem noch besseren Erlebnis 🌄 und mit einem Souvenir 🎁, das Sie immer an Ihre Touren mit uns erinnert.",
      farewellCTAs: [
        { id: "newbooking1", text: "Neue Tour buchen 🗓️" },
        { id: "giftshop1", text: "Geschenkeladen besuchen 🎁" }
      ],
      initialOptions: [
        { id: "service1", text: "Touristische Tour 🏞️" },
        { id: "service2", text: "Souvenir-Geschenk 🎁" },
        { id: "service3", text: "Festival oder Veranstaltung 🎉" },
        { id: "service4", text: "Hilfe bei Buchung oder Zahlung 💳" }
      ],
      initialPrompt: "Wählen Sie den Service, der Ihnen aus den folgenden Optionen zusagt:"
    },
    ar: {
      welcome: "✨ معك ليلى من جولة! 🌟 نورت جولة وأهلاً بك 🤍. هنا بتكتشف السعودية 🇸🇦 بعيون جولة ومقدمي خدماتها المميزين. راح تعيش تجربة ثقافية 🕌، تذوق أحلى الأكلات الشعبية 🍲، وتزور أجمل الأماكن الأثرية والسياحية 🏰🌄. كيف أقدر أخدمك اليوم؟",
      questions: [
        {
          id: 1,
          text: "ودك بجولة؟ 🏞️",
          response: "عندنا جولات تراثية 🏰، ثقافية 🎨، عائلية 👨‍👩‍👧‍👦، ومغامرات 🌄.",
          ctas: [
            { id: "tour1", text: "شاهد الجولات المتاحة 🗺️" },
            { id: "tour2", text: "جولات عائلية 👨‍👩‍👧‍👦" },
            { id: "tour3", text: "جولات مغامرات 🌄" }
          ]
        },
        {
          id: 2,
          text: "ودك بهدية تذكارية من وحي تراثنا وثقافتنا؟ 🎁",
          response: "نوفر متجر للهدايا التراثية السعودية المميزة 🕌🛍️.",
          ctas: [
            { id: "gift1", text: "تصفح متجر الهدايا 🎁" }
          ]
        },
        {
          id: 3,
          text: "تبي تعرف لو فيه مهرجان أو فعالية قريبة منك؟ 🎉",
          response: "نعطيك جدول المهرجانات والفعاليات حسب موقعك 📅📍.",
          ctas: [
            { id: "event1", text: "اكتشف المهرجانات 🎉" }
          ]
        },
        {
          id: 4,
          text: "كيف أحجز جولة؟ 📝",
          response: "الحجز سهل: اختر الجولة أو المنتج → حدد التاريخ وعدد الأشخاص → اختر طريقة الدفع → تأكيد → ادفع عبر التطبيق 💳.",
          ctas: [
            { id: "book1", text: "احجز الآن 🗓️" }
          ]
        },
        {
          id: 5,
          text: "أقدر أعدل أو ألغي الحجز؟ ❓",
          response: "نعم، تقدر تلغي أو تعدل قبل الموعد 72–48 ساعة ⏰، وأحياناً حتى 24 ساعة حسب نوع الحجز.",
          ctas: [
            { id: "manage1", text: "إدارة حجوزاتي 📋" }
          ]
        },
        {
          id: 6,
          text: "ما وصلني تأكيد الحجز؟ 📧",
          response: "راجع بريدك الإلكتروني 📬 أو تحقق من \"حجوزاتي\" داخل التطبيق.",
          ctas: [
            { id: "view1", text: "شاهد حجوزاتك 📂" }
          ]
        },
        {
          id: 7,
          text: "ما قدرت أسجل حساب جديد؟ ❌",
          response: "تأكد من كتابة بريدك الإلكتروني ورقم جوالك ✉️📱، بعد التأكد أعد تعيين كلمة المرور 🔑 من صفحة الدخول. أو تواصل مع الدعم ☎️ 0568015093.",
          ctas: [
            { id: "reset1", text: "إعادة تعيين كلمة المرور 🔑" },
            { id: "support1", text: "تواصل مع الدعم ☎️" }
          ]
        },
        {
          id: 8,
          text: "أقدر أسجل كمرشد سياحي أو مورد أو مقدم خدمات سياحية؟ 🧑‍💼",
          response: "نعم! سواء تقدم جولة 🏞️، تجربة 🎨، هدايا 🎁، أو إدارة مهرجان موسمي 🎉، التسجيل متاح عبر التطبيق ويتم تفعيله خلال دقائق ⏳.",
          ctas: [
            { id: "register1", text: "سجل كمرشد 🧑‍💼" },
            { id: "register2", text: "سجل كمورد 🏪" }
          ]
        },
        {
          id: 9,
          text: "ما طرق الدفع المتاحة؟ 💳",
          response: "نقبل جميع أنواع الدفع 💳، بوابة الدفع في التطبيق تدعم معظم أنواع الدفع الإلكتروني ⚡."
        },
        {
          id: 10,
          text: "حاولت أدفع وما ضبط؟ ❌",
          response: "جرّب بطاقة أخرى 💳 أو تحقق من رصيدك 💰، وإذا استمرت المشكلة تواصل معنا ☎️.",
          ctas: [
            { id: "financial1", text: "تواصل مع الدعم المالي 💳" }
          ]
        },
        {
          id: 11,
          text: "هل الأسعار تشمل الضريبة؟ 💰",
          response: "نعم، الأسعار النهائية تشمل الضريبة ✅."
        },
        {
          id: 12,
          text: "التطبيق ما يفتح أو فيه مشكلة ⚠️",
          response: "جرّب تحديث التطبيق 🔄 أو إعادة تشغيل الجهاز 📱💻. إذا استمر، بلغنا ☎️.",
          ctas: [
            { id: "tech1", text: "اتصل بالدعم الفني 🛠️" }
          ]
        }
      ],
      farewell: "🤍 شكراً لثقتك في جولة! تذكر: جولة ليست مجرد رحلة، بل تجربة لا تُنسى 🌍✨. نراك قريباً في جولة أخرى 🏞️ مع تجربة أجمل 🌄، ومع هدية تذكارية 🎁 تذكرك بجولاتك معنا دائم",
      farewellCTAs: [
        { id: "newbooking1", text: "احجز جولة جديدة 🗓️" },
        { id: "giftshop1", text: "شاهد متجر الهدايا 🎁" }
      ],
      initialOptions: [
        { id: "service1", text: "جولة سياحية 🏞️" },
        { id: "service2", text: "هدية تذكارية 🎁" },
        { id: "service3", text: "مهرجان أو فعالية 🎉" },
        { id: "service4", text: "مساعدة بالحجز أو الدفع 💳" }
      ],
      initialPrompt: "اختر الخدمة اللي تناسبك من الخيارات التالية:"
    },
    en: {
      welcome: "✨ This is Layla from Jawla! 🌟 Welcome to Jawla 🤍. Here you'll discover Saudi Arabia 🇸🇦 through the eyes of Jawla and its distinguished service providers. You'll experience cultural journeys 🕌, taste the best traditional foods 🍲, and visit the most beautiful historical and tourist sites 🏰🌄. How can I help you today?",
      questions: [
        {
          id: 1,
          text: "Would you like a tour? 🏞️",
          response: "We have heritage tours 🏰, cultural tours 🎨, family tours 👨‍👩‍👧‍👦, and adventure tours 🌄.",
          ctas: [
            { id: "tour1", text: "Browse available tours 🗺️" },
            { id: "tour2", text: "Family tours 👨‍👩‍👧‍👦" },
            { id: "tour3", text: "Adventure tours 🌄" }
          ]
        },
        {
          id: 2,
          text: "Would you like a souvenir inspired by our heritage and culture? 🎁",
          response: "We provide a store for distinctive Saudi heritage gifts 🕌🛍️.",
          ctas: [
            { id: "gift1", text: "Browse gift shop 🎁" }
          ]
        },
        {
          id: 3,
          text: "Want to know if there's a festival or event near you? 🎉",
          response: "We'll give you a schedule of festivals and events based on your location 📅📍.",
          ctas: [
            { id: "event1", text: "Discover festivals 🎉" }
          ]
        },
        {
          id: 4,
          text: "How do I book a tour? 📝",
          response: "Booking is easy: Choose the tour or product → Set the date and number of people → Choose payment method → Confirm → Pay through the app 💳.",
          ctas: [
            { id: "book1", text: "Book now 🗓️" }
          ]
        },
        {
          id: 5,
          text: "Can I modify or cancel my booking? ❓",
          response: "Yes, you can cancel or modify before the appointment 72-48 hours ⏰, and sometimes even 24 hours depending on the type of booking.",
          ctas: [
            { id: "manage1", text: "Manage my bookings 📋" }
          ]
        },
        {
          id: 6,
          text: "I didn't receive booking confirmation? 📧",
          response: "Check your email 📬 or check 'My Bookings' within the app.",
          ctas: [
            { id: "view1", text: "View your bookings 📂" }
          ]
        },
        {
          id: 7,
          text: "I couldn't register a new account? ❌",
          response: "Make sure to enter your email and mobile number ✉️📱, then reset your password 🔑 from the login page. Or contact support ☎️ 0568015093.",
          ctas: [
            { id: "reset1", text: "Reset password 🔑" },
            { id: "support1", text: "Contact support ☎️" }
          ]
        },
        {
          id: 8,
          text: "Can I register as a tour guide, supplier, or tourism service provider? 🧑‍💼",
          response: "Yes! Whether you provide tours 🏞️, experiences 🎨, gifts 🎁, or manage a seasonal festival 🎉, registration is available through the app and is activated within minutes ⏳.",
          ctas: [
            { id: "register1", text: "Register as guide 🧑‍💼" },
            { id: "register2", text: "Register as supplier 🏪" }
          ]
        },
        {
          id: 9,
          text: "What payment methods are available? 💳",
          response: "We accept all types of payment 💳, the payment gateway in the app supports most types of electronic payment ⚡."
        },
        {
          id: 10,
          text: "I tried to pay and it didn't work? ❌",
          response: "Try another card 💳 or check your balance 💰, and if the problem persists, contact us ☎️.",
          ctas: [
            { id: "financial1", text: "Contact financial support 💳" }
          ]
        },
        {
          id: 11,
          text: "Do prices include tax? 💰",
          response: "Yes, final prices include tax ✅."
        },
        {
          id: 12,
          text: "The app won't open or has a problem ⚠️",
          response: "Try updating the app 🔄 or restarting your device 📱💻. If it persists, let us know ☎️.",
          ctas: [
            { id: "tech1", text: "Contact technical support 🛠️" }
          ]
        }
      ],
      farewell: "🤍 Thank you for your trust in Jawla! Remember: Jawla is not just a trip, but an unforgettable experience 🌍✨. See you soon on another tour 🏞️ with a more beautiful experience 🌄, and with a souvenir 🎁 that will always remind you of your tours with us",
      farewellCTAs: [
        { id: "newbooking1", text: "Book a new tour 🗓️" },
        { id: "giftshop1", text: "View gift shop 🎁" }
      ],
      initialOptions: [
        { id: "service1", text: "Tourist tour 🏞️" },
        { id: "service2", text: "Souvenir 🎁" },
        { id: "service3", text: "Festival or event 🎉" },
        { id: "service4", text: "Help with booking or payment 💳" }
      ],
      initialPrompt: "Choose the service that suits you from the following options:"
    }
  };

  // FAQ data with all supported languages
  const faqData = {
    ar: [
      {
        id: 1,
        question: 'كيف يمكنني حجز رحلة؟',
        answer: 'يمكنك حجز رحلة من خلال تصفح الرحلات المتاحة على موقعنا، واختيار الرحلة المناسبة، ثم اتباع خطوات الحجز وإتمام عملية الدفع.'
      },
      {
        id: 2,
        question: 'ما هي سياسة الإلغاء؟',
        answer: 'يمكنك إلغاء الحجز قبل 48 ساعة من موعد الرحلة واسترداد كامل المبلغ. أما الإلغاء قبل 24 ساعة فيتم استرداد 50% من المبلغ. لا يمكن استرداد المبلغ في حالة الإلغاء قبل أقل من 24 ساعة.'
      },
      {
        id: 3,
        question: 'هل يمكنني تعديل الحجز؟',
        answer: 'نعم، يمكنك تعديل الحجز من خلال حسابك الشخصي قبل 48 ساعة من موعد الرحلة. للتعديلات في وقت أقرب، يرجى التواصل مع خدمة العملاء.'
      },
      {
        id: 4,
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نحن نقبل الدفع عبر البطاقات الائتمانية (فيزا، ماستركارد)، وخدمات الدفع الإلكتروني مثل Apple Pay وSTC Pay، بالإضافة إلى التحويل البنكي.'
      },
      {
        id: 5,
        question: 'كيف يمكنني التواصل مع خدمة العملاء؟',
        answer: 'يمكنك التواصل مع فريق خدمة العملاء عبر البريد الإلكتروني support@atour.com أو عبر رقم الهاتف +966 123456789 من الساعة 9 صباحًا حتى 9 مساءً.'
      }
    ],
    en: [
      {
        id: 1,
        question: 'How can I book a trip?',
        answer: 'You can book a trip by browsing available trips on our website, selecting the appropriate trip, then following the booking steps and completing the payment process.'
      },
      {
        id: 2,
        question: 'What is the cancellation policy?',
        answer: 'You can cancel the booking 48 hours before the trip date and get a full refund. Cancellation 24 hours before will result in a 50% refund. No refund is available for cancellations less than 24 hours before.'
      },
      {
        id: 3,
        question: 'Can I modify my booking?',
        answer: 'Yes, you can modify your booking through your personal account 48 hours before the trip date. For modifications closer to the trip date, please contact customer service.'
      },
      {
        id: 4,
        question: 'What payment methods are available?',
        answer: 'We accept payment via credit cards (Visa, Mastercard), electronic payment services such as Apple Pay and STC Pay, as well as bank transfers.'
      },
      {
        id: 5,
        question: 'How can I contact customer service?',
        answer: 'You can contact our customer service team via email at support@atour.com or by phone at +966 123456789 from 9 AM to 9 PM.'
      }
    ],
    fr: [
      {
        id: 1,
        question: 'Comment puis-je réserver un voyage?',
        answer: 'Vous pouvez réserver un voyage en parcourant les voyages disponibles sur notre site web, en sélectionnant le voyage approprié, puis en suivant les étapes de réservation et en complétant le processus de paiement.'
      },
      {
        id: 2,
        question: 'Quelle est la politique d\'annulation?',
        answer: 'Vous pouvez annuler la réservation 48 heures avant la date du voyage et obtenir un remboursement complet. L\'annulation 24 heures avant entraînera un remboursement de 50%. Aucun remboursement n\'est disponible pour les annulations moins de 24 heures avant.'
      },
      {
        id: 3,
        question: 'Puis-je modifier ma réservation?',
        answer: 'Oui, vous pouvez modifier votre réservation via votre compte personnel 48 heures avant la date du voyage. Pour les modifications plus proches de la date du voyage, veuillez contacter le service client.'
      },
      {
        id: 4,
        question: 'Quels modes de paiement sont disponibles?',
        answer: 'Nous acceptons le paiement par cartes de crédit (Visa, Mastercard), services de paiement électronique tels que Apple Pay et STC Pay, ainsi que les virements bancaires.'
      },
      {
        id: 5,
        question: 'Comment puis-je contacter le service client?',
        answer: 'Vous pouvez contacter notre équipe de service client par e-mail à support@atour.com ou par téléphone au +966 123456789 de 9h à 21h.'
      }
    ],
    de: [
      {
        id: 1,
        question: 'Wie kann ich eine Reise buchen?',
        answer: 'Sie können eine Reise buchen, indem Sie die verfügbaren Reisen auf unserer Website durchsuchen, die passende Reise auswählen und dann den Buchungsschritten folgen und den Zahlungsvorgang abschließen.'
      },
      {
        id: 2,
        question: 'Was ist die Stornierungsrichtlinie?',
        answer: 'Sie können die Buchung 48 Stunden vor dem Reisedatum stornieren und erhalten eine vollständige Rückerstattung. Bei Stornierung 24 Stunden vorher erhalten Sie eine Rückerstattung von 50%. Für Stornierungen weniger als 24 Stunden vorher ist keine Rückerstattung möglich.'
      },
      {
        id: 3,
        question: 'Kann ich meine Buchung ändern?',
        answer: 'Ja, Sie können Ihre Buchung über Ihr persönliches Konto 48 Stunden vor dem Reisedatum ändern. Für Änderungen näher am Reisedatum wenden Sie sich bitte an den Kundenservice.'
      },
      {
        id: 4,
        question: 'Welche Zahlungsmethoden sind verfügbar?',
        answer: 'Wir akzeptieren Zahlungen per Kreditkarte (Visa, Mastercard), elektronische Zahlungsdienste wie Apple Pay und STC Pay sowie Banküberweisungen.'
      },
      {
        id: 5,
        question: 'Wie kann ich den Kundenservice kontaktieren?',
        answer: 'Sie können unser Kundenservice-Team per E-Mail unter support@atour.com oder telefonisch unter +966 123456789 von 9 bis 21 Uhr erreichen.'
      }
    ],
    es: {
      welcome: "✨ ¡Soy Layla de Jawla! 🌟 Bienvenido a Jawla 🤍. Aquí descubrirás Arabia Saudita 🇸🇦 a través de los ojos de Jawla y sus distinguidos proveedores de servicios. Experimentarás viajes culturales 🕌, probarás las mejores comidas tradicionales 🍲, y visitarás los sitios históricos y turísticos más hermosos 🏰🌄. ¿Cómo puedo ayudarte hoy?",
      questions: [
        {
          id: 1,
          text: "¿Te gustaría hacer un tour? 🏞️",
          response: "Tenemos tours de patrimonio 🏰, tours culturales 🎨, tours familiares 👨‍👩‍👧‍👦, y tours de aventura 🌄.",
          ctas: [
            { id: "tour1", text: "Explorar tours disponibles 🗺️" },
            { id: "tour2", text: "Tours familiares 👨‍👩‍👧‍👦" },
            { id: "tour3", text: "Tours de aventura 🌄" }
          ]
        },
        {
          id: 2,
          text: "¿Te gustaría un souvenir inspirado en nuestro patrimonio y cultura? 🎁",
          response: "Ofrecemos una tienda de regalos distintivos del patrimonio saudí 🕌🛍️.",
          ctas: [
            { id: "gift1", text: "Explorar tienda de regalos 🎁" }
          ]
        },
        {
          id: 3,
          text: "¿Quieres saber si hay un festival o evento cerca de ti? 🎉",
          response: "Te daremos un calendario de festivales y eventos basado en tu ubicación 📅📍.",
          ctas: [
            { id: "event1", text: "Descubrir festivales 🎉" }
          ]
        },
        {
          id: 4,
          text: "¿Cómo reservo un tour? 📝",
          response: "Reservar es fácil: Elige el tour o producto → Establece la fecha y número de personas → Elige método de pago → Confirma → Paga a través de la app 💳.",
          ctas: [
            { id: "book1", text: "Reservar ahora 🗓️" }
          ]
        },
        {
          id: 5,
          text: "¿Puedo modificar o cancelar mi reserva? ❓",
          response: "Sí, puedes cancelar o modificar antes de la cita 72-48 horas ⏰, y a veces incluso 24 horas dependiendo del tipo de reserva.",
          ctas: [
            { id: "manage1", text: "Gestionar mis reservas 📋" }
          ]
        },
        {
          id: 6,
          text: "¿No recibí confirmación de reserva? 📧",
          response: "Revisa tu correo electrónico 📬 o verifica 'Mis Reservas' dentro de la app.",
          ctas: [
            { id: "view1", text: "Ver tus reservas 📂" }
          ]
        },
        {
          id: 7,
          text: "¿No pude registrar una nueva cuenta? ❌",
          response: "Asegúrate de ingresar tu correo electrónico y número de móvil ✉️📱, luego restablece tu contraseña 🔑 desde la página de inicio de sesión. O contacta con soporte ☎️ 0568015093.",
          ctas: [
            { id: "reset1", text: "Restablecer contraseña 🔑" },
            { id: "support1", text: "Contactar soporte ☎️" }
          ]
        },
        {
          id: 8,
          text: "¿Puedo registrarme como guía turístico, proveedor o prestador de servicios turísticos? 🧑‍💼",
          response: "¡Sí! Ya sea que proporciones tours 🏞️, experiencias 🎨, regalos 🎁, o gestiones un festival de temporada 🎉, el registro está disponible a través de la app y se activa en minutos ⏳.",
          ctas: [
            { id: "register1", text: "Registrarse como guía 🧑‍💼" },
            { id: "register2", text: "Registrarse como proveedor 🏪" }
          ]
        },
        {
          id: 9,
          text: "¿Qué métodos de pago están disponibles? 💳",
          response: "Aceptamos todo tipo de pagos 💳, la pasarela de pago en la app admite la mayoría de tipos de pago electrónico ⚡."
        },
        {
          id: 10,
          text: "¿Intenté pagar y no funcionó? ❌",
          response: "Prueba con otra tarjeta 💳 o verifica tu saldo 💰, y si el problema persiste, contáctanos ☎️.",
          ctas: [
            { id: "financial1", text: "Contactar soporte financiero 💳" }
          ]
        },
        {
          id: 11,
          text: "¿Los precios incluyen impuestos? 💰",
          response: "Sí, los precios finales incluyen impuestos ✅."
        },
        {
          id: 12,
          text: "¿La app no se abre o tiene un problema? ⚠️",
          response: "Intenta actualizar la app 🔄 o reiniciar tu dispositivo 📱💻. Si persiste, háganoslo saber ☎️.",
          ctas: [
            { id: "tech1", text: "Contactar soporte técnico 🛠️" }
          ]
        }
      ],
      farewell: "🤍 ¡Gracias por tu confianza en Jawla! Recuerda: Jawla no es solo un viaje, sino una experiencia inolvidable 🌍✨. Nos vemos pronto en otro tour 🏞️ con una experiencia más hermosa 🌄, y con un souvenir 🎁 que siempre te recordará tus tours con nosotros",
      farewellCTAs: [
        { id: "newbooking1", text: "Reservar un nuevo tour 🗓️" },
        { id: "giftshop1", text: "Ver tienda de regalos 🎁" }
      ],
      initialOptions: [
        { id: "service1", text: "Tour turístico 🏞️" },
        { id: "service2", text: "Souvenir 🎁" },
        { id: "service3", text: "Festival o evento 🎉" },
        { id: "service4", text: "Ayuda con reserva o pago 💳" }
      ],
      initialPrompt: "Elige el servicio que te convenga de las siguientes opciones:"
    },
    tr: {
      welcome: "✨ Ben Jawla'dan Layla! 🌟 Jawla'ya hoş geldiniz 🤍. Burada Suudi Arabistan'ı 🇸🇦 Jawla'nın ve seçkin hizmet sağlayıcılarının gözünden keşfedeceksiniz. Kültürel geziler 🕌 yaşayacak, en iyi geleneksel yemekleri 🍲 tadacak ve en güzel tarihi ve turistik yerleri 🏰🌄 ziyaret edeceksiniz. Bugün size nasıl yardımcı olabilirim?",
      questions: [
        {
          id: 1,
          text: "Bir tur yapmak ister misiniz? 🏞️",
          response: "Miras turları 🏰, kültürel turlar 🎨, aile turları 👨‍👩‍👧‍👦 ve macera turları 🌄 sunuyoruz.",
          ctas: [
            { id: "tour1", text: "Mevcut turları keşfedin 🗺️" },
            { id: "tour2", text: "Aile turları 👨‍👩‍👧‍👦" },
            { id: "tour3", text: "Macera turları 🌄" }
          ]
        },
        {
          id: 2,
          text: "Mirasımız ve kültürümüzden ilham alan bir hediyelik eşya ister misiniz? 🎁",
          response: "Seçkin Suudi mirası hediyelik eşya mağazası 🕌🛍️ sunuyoruz.",
          ctas: [
            { id: "gift1", text: "Hediyelik eşya mağazasını keşfedin 🎁" }
          ]
        },
        {
          id: 3,
          text: "Yakınınızda bir festival veya etkinlik olup olmadığını öğrenmek ister misiniz? 🎉",
          response: "Size konumunuza göre festival ve etkinlik takvimi 📅📍 sunacağız.",
          ctas: [
            { id: "event1", text: "Festivalleri keşfedin 🎉" }
          ]
        },
        {
          id: 4,
          text: "Nasıl tur rezervasyonu yapabilirim? 📝",
          response: "Rezervasyon kolaydır: Turu veya ürünü seçin → Tarihi ve kişi sayısını belirleyin → Ödeme yöntemini seçin → Onaylayın → Uygulama üzerinden ödeyin 💳.",
          ctas: [
            { id: "book1", text: "Şimdi rezervasyon yapın 🗓️" }
          ]
        },
        {
          id: 5,
          text: "Rezervasyonumu değiştirebilir veya iptal edebilir miyim? ❓",
          response: "Evet, randevudan 72-48 saat önce ⏰ iptal edebilir veya değiştirebilirsiniz, bazen rezervasyon türüne bağlı olarak 24 saat öncesine kadar.",
          ctas: [
            { id: "manage1", text: "Rezervasyonlarımı yönet 📋" }
          ]
        },
        {
          id: 6,
          text: "Rezervasyon onayı almadım mı? 📧",
          response: "E-postanızı kontrol edin 📬 veya uygulama içindeki 'Rezervasyonlarım' bölümünü kontrol edin.",
          ctas: [
            { id: "view1", text: "Rezervasyonlarınızı görüntüleyin 📂" }
          ]
        },
        {
          id: 7,
          text: "Yeni bir hesap kaydedemedim mi? ❌",
          response: "E-posta adresinizi ve cep telefonu numaranızı girdiğinizden emin olun ✉️📱, ardından giriş sayfasından şifrenizi sıfırlayın 🔑. Veya destek ile iletişime geçin ☎️ 0568015093.",
          ctas: [
            { id: "reset1", text: "Şifreyi sıfırla 🔑" },
            { id: "support1", text: "Destek ile iletişime geçin ☎️" }
          ]
        },
        {
          id: 8,
          text: "Tur rehberi, sağlayıcı veya turizm hizmet sağlayıcısı olarak kaydolabilir miyim? 🧑‍💼",
          response: "Evet! İster turlar 🏞️, deneyimler 🎨, hediyeler 🎁 sağlayın, ister mevsimlik bir festival 🎉 yönetin, kayıt uygulama üzerinden yapılabilir ve dakikalar içinde etkinleştirilir ⏳.",
          ctas: [
            { id: "register1", text: "Rehber olarak kaydolun 🧑‍💼" },
            { id: "register2", text: "Sağlayıcı olarak kaydolun 🏪" }
          ]
        },
        {
          id: 9,
          text: "Hangi ödeme yöntemleri mevcuttur? 💳",
          response: "Her türlü ödemeyi kabul ediyoruz 💳, uygulamadaki ödeme geçidi çoğu elektronik ödeme türünü destekliyor ⚡."
        },
        {
          id: 10,
          text: "Ödeme yapmayı denedim ve çalışmadı mı? ❌",
          response: "Başka bir kart deneyin 💳 veya bakiyenizi kontrol edin 💰, sorun devam ederse bizimle iletişime geçin ☎️.",
          ctas: [
            { id: "financial1", text: "Finansal destek ile iletişime geçin 💳" }
          ]
        },
        {
          id: 11,
          text: "Fiyatlara vergiler dahil mi? 💰",
          response: "Evet, son fiyatlara vergiler dahildir ✅."
        },
        {
          id: 12,
          text: "Uygulama açılmıyor veya bir sorunu mu var? ⚠️",
          response: "Uygulamayı güncellemeyi 🔄 veya cihazınızı yeniden başlatmayı 📱💻 deneyin. Sorun devam ederse bize bildirin ☎️.",
          ctas: [
            { id: "tech1", text: "Teknik destek ile iletişime geçin 🛠️" }
          ]
        }
      ],
      farewell: "🤍 Jawla'ya güvendiğiniz için teşekkür ederiz! Unutmayın: Jawla sadece bir seyahat değil, unutulmaz bir deneyimdir 🌍✨. Yakında başka bir turda 🏞️ daha güzel bir deneyimle 🌄 ve bizimle turlarınızı her zaman hatırlatacak bir hediyelik eşya 🎁 ile görüşürüz",
      farewellCTAs: [
        { id: "newbooking1", text: "Yeni bir tur rezervasyonu yapın 🗓️" },
        { id: "giftshop1", text: "Hediyelik eşya mağazasını görüntüleyin 🎁" }
      ],
      initialOptions: [
        { id: "service1", text: "Turistik tur 🏞️" },
        { id: "service2", text: "Hediyelik eşya 🎁" },
        { id: "service3", text: "Festival veya etkinlik 🎉" },
        { id: "service4", text: "Rezervasyon veya ödeme yardımı 💳" }
      ],
      initialPrompt: "Aşağıdaki seçeneklerden size uygun hizmeti seçin:"
    },
    ru: [
      {
        id: 1,
        question: 'Как я могу забронировать поездку?',
        answer: 'Вы можете забронировать поездку, просмотрев доступные поездки на нашем сайте, выбрав подходящую поездку, затем следуя шагам бронирования и завершив процесс оплаты.'
      },
      {
        id: 2,
        question: 'Какова политика отмены?',
        answer: 'Вы можете отменить бронирование за 48 часов до даты поездки и получить полный возврат средств. Отмена за 24 часа приведет к возврату 50%. Возврат средств не предоставляется при отмене менее чем за 24 часа.'
      },
      {
        id: 3,
        question: 'Могу ли я изменить свое бронирование?',
        answer: 'Да, вы можете изменить свое бронирование через личный кабинет за 48 часов до даты поездки. Для изменений ближе к дате поездки, пожалуйста, свяжитесь с службой поддержки клиентов.'
      },
      {
        id: 4,
        question: 'Какие способы оплаты доступны?',
        answer: 'Мы принимаем оплату кредитными картами (Visa, Mastercard), электронными платежными сервисами, такими как Apple Pay и STC Pay, а также банковскими переводами.'
      },
      {
        id: 5,
        question: 'Как я могу связаться со службой поддержки клиентов?',
        answer: 'Вы можете связаться с нашей командой поддержки клиентов по электронной почте support@atour.com или по телефону +966 123456789 с 9 утра до 9 вечера.'
      }
    ],
    zh: [
      {
        id: 1,
        question: '我如何预订旅行？',
        answer: '您可以通过浏览我们网站上的可用旅行，选择合适的旅行，然后按照预订步骤完成付款流程来预订旅行。'
      },
      {
        id: 2,
        question: '取消政策是什么？',
        answer: '您可以在旅行日期前48小时取消预订并获得全额退款。在24小时前取消将导致50%的退款。对于少于24小时前的取消，不提供退款。'
      },
      {
        id: 3,
        question: '我可以修改我的预订吗？',
        answer: '是的，您可以在旅行日期前48小时通过您的个人账户修改预订。对于更接近旅行日期的修改，请联系客户服务。'
      },
      {
        id: 4,
        question: '有哪些支付方式可用？',
        answer: '我们接受信用卡（Visa，Mastercard），电子支付服务如Apple Pay和STC Pay，以及银行转账。'
      },
      {
        id: 5,
        question: '我如何联系客户服务？',
        answer: '您可以通过电子邮件support@atour.com或电话+966 123456789从上午9点到晚上9点联系我们的客户服务团队。'
      }
    ],
    ko: [
      {
        id: 1,
        question: '여행을 어떻게 예약할 수 있나요?',
        answer: '저희 웹사이트에서 이용 가능한 여행을 탐색하고, 적절한 여행을 선택한 다음, 예약 단계를 따라 결제 과정을 완료하여 여행을 예약할 수 있습니다.'
      },
      {
        id: 2,
        question: '취소 정책은 무엇인가요?',
        answer: '여행 날짜 48시간 전에 예약을 취소하고 전액 환불받을 수 있습니다. 24시간 전 취소는 50% 환불로 이어집니다. 24시간 미만 전 취소에 대해서는 환불이 불가능합니다.'
      },
      {
        id: 3,
        question: '예약을 수정할 수 있나요?',
        answer: '네, 여행 날짜 48시간 전에 개인 계정을 통해 예약을 수정할 수 있습니다. 여행 날짜에 더 가까운 수정의 경우, 고객 서비스에 문의해 주세요.'
      },
      {
        id: 4,
        question: '어떤 결제 방법이 가능한가요?',
        answer: '신용 카드(Visa, Mastercard), Apple Pay 및 STC Pay와 같은 전자 결제 서비스, 그리고 은행 송금을 통한 결제를 수락합니다.'
      },
      {
        id: 5,
        question: '고객 서비스에 어떻게 연락할 수 있나요?',
        answer: '이메일 support@atour.com 또는 전화 +966 123456789로 오전 9시부터 오후 9시까지 저희 고객 서비스 팀에 연락하실 수 있습니다.'
      }
    ],
    pt: [
      {
        id: 1,
        question: 'Como posso reservar uma viagem?',
        answer: 'Você pode reservar uma viagem navegando pelas viagens disponíveis em nosso site, selecionando a viagem apropriada, depois seguindo os passos de reserva e completando o processo de pagamento.'
      },
      {
        id: 2,
        question: 'Qual é a política de cancelamento?',
        answer: 'Você pode cancelar a reserva 48 horas antes da data da viagem e obter um reembolso total. O cancelamento 24 horas antes resultará em um reembolso de 50%. Não há reembolso disponível para cancelamentos com menos de 24 horas de antecedência.'
      },
      {
        id: 3,
        question: 'Posso modificar minha reserva?',
        answer: 'Sim, você pode modificar sua reserva através de sua conta pessoal 48 horas antes da data da viagem. Para modificações mais próximas da data da viagem, entre em contato com o serviço ao cliente.'
      },
      {
        id: 4,
        question: 'Quais métodos de pagamento estão disponíveis?',
        answer: 'Aceitamos pagamento via cartões de crédito (Visa, Mastercard), serviços de pagamento eletrônico como Apple Pay e STC Pay, bem como transferências bancárias.'
      },
      {
        id: 5,
        question: 'Como posso entrar em contato com o serviço ao cliente?',
        answer: 'Você pode entrar em contato com nossa equipe de serviço ao cliente via e-mail em support@atour.com ou por telefone em +966 123456789 das 9h às 21h.'
      }
    ],
    ur: [
      {
        id: 1,
        question: 'میں سفر کیسے بک کر سکتا ہوں؟',
        answer: 'آپ ہماری ویب سائٹ پر دستیاب سفروں کو براؤز کرکے، مناسب سفر کا انتخاب کرکے، پھر بکنگ کے مراحل کی پیروی کرکے اور ادائیگی کے عمل کو مکمل کرکے سفر بک کر سکتے ہیں۔'
      },
      {
        id: 2,
        question: 'منسوخی کی پالیسی کیا ہے؟',
        answer: 'آپ سفر کی تاریخ سے 48 گھنٹے پہلے بکنگ منسوخ کر سکتے ہیں اور مکمل رقم واپس حاصل کر سکتے ہیں۔ 24 گھنٹے پہلے منسوخی کے نتیجے میں 50% رقم واپس ملے گی۔ 24 گھنٹے سے کم وقت پہلے منسوخی کے لیے کوئی رقم واپس نہیں ملے گی۔'
      },
      {
        id: 3,
        question: 'کیا میں اپنی بکنگ میں ترمیم کر سکتا ہوں؟',
        answer: 'ہاں، آپ سفر کی تاریخ سے 48 گھنٹے پہلے اپنے ذاتی اکاؤنٹ کے ذریعے اپنی بکنگ میں ترمیم کر سکتے ہیں۔ سفر کی تاریخ کے قریب ترمیم کے لیے، براہ کرم کسٹمر سروس سے رابطہ کریں۔'
      },
      {
        id: 4,
        question: 'کون سے ادائیگی کے طریقے دستیاب ہیں؟',
        answer: 'ہم کریڈٹ کارڈز (ویزا، ماسٹر کارڈ)، ایپل پے اور ایس ٹی سی پے جیسی الیکٹرانک ادائیگی کی خدمات، اور بینک ٹرانسفر کے ذریعے ادائیگی قبول کرتے ہیں۔'
      },
      {
        id: 5,
        question: 'میں کسٹمر سروس سے کیسے رابطہ کر سکتا ہوں؟',
        answer: 'آپ ہماری کسٹمر سروس ٹیم سے ای میل support@atour.com یا فون +966 123456789 پر صبح 9 بجے سے شام 9 بجے تک رابطہ کر سکتے ہیں۔'
      }
    ],
    ja: [
      {
        id: 1,
        question: '旅行を予約するにはどうすればよいですか？',
        answer: '当社のウェブサイトで利用可能な旅行を閲覧し、適切な旅行を選択し、予約手順に従って支払いプロセスを完了することで旅行を予約できます。'
      },
      {
        id: 2,
        question: 'キャンセルポリシーは何ですか？',
        answer: '旅行日の48時間前までにキャンセルすると、全額返金されます。24時間前のキャンセルは50％の返金となります。24時間未満のキャンセルについては返金はありません。'
      },
      {
        id: 3,
        question: '予約を変更できますか？',
        answer: 'はい、旅行日の48時間前までに個人アカウントから予約を変更できます。旅行日に近い変更については、カスタマーサービスにお問い合わせください。'
      },
      {
        id: 4,
        question: 'どの支払い方法が利用できますか？',
        answer: 'クレジットカード（Visa、Mastercard）、Apple PayやSTC Payなどの電子決済サービス、および銀行振込による支払いを受け付けています。'
      },
      {
        id: 5,
        question: 'カスタマーサービスにどのように連絡できますか？',
        answer: 'カスタマーサービスチームには、Eメールsupport@atour.comまたは電話+966 123456789で午前9時から午後9時までご連絡いただけます。'
      }
    ]
  };

  // Get the appropriate conversation data based on language
  const getConversationData = () => {
    return conversationData[currentLanguage] || conversationData['en'];
  };

  return (
    <div className="chatbot-container">
      {/* Chat button */}
      <Link
        to="/contact"
        className="chatbot-button"
        onClick={toggleChatBot}
        aria-label={{
          ar: 'فتح المساعد الافتراضي',
          en: 'Open chat assistant',
          fr: 'Ouvrir l\'assistant de chat',
          de: 'Chat-Assistent öffnen',
          es: 'Abrir asistente de chat',
          tr: 'Sohbet asistanını aç',
          ru: 'Открыть чат-ассистента',
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
      </Link>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <img src={lailaAvatar} alt="Laila" />
            </div>
            <div className="chatbot-info">
              <h3>{lilaName[currentLanguage]}</h3>
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
                  ja: '仮想アシスタント'
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

          <div className="chatbot-body">
            <div className="chatbot-welcome">
              <p>{getConversationData().welcome}</p>
              <p className="chatbot-prompt">{getConversationData().initialPrompt}</p>
              <div className="chatbot-options">
                {getConversationData().initialOptions.map((option) => (
                  <button
                    key={option.id}
                    className="chatbot-option-btn"
                    onClick={() => handleCTAClick(option.id)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="chatbot-questions">
              <ul>
                {getConversationData().questions.map((question) => (
                  <li
                    key={question.id}
                    className={selectedQuestion === question.id ? 'selected' : ''}
                    onClick={() => handleQuestionClick(question.id)}
                  >
                    {question.text}
                  </li>
                ))}
              </ul>
            </div>

            {selectedQuestion && (
              <div className="chatbot-answer" ref={answerRef}>
                <div className="answer-container">
                  <div className="answer-avatar">
                    <img src={lailaAvatar} alt="Laila" />
                  </div>
                  <div className="answer-content">
                    <p>
                      {getConversationData().questions.find(q => q.id === selectedQuestion)?.response}
                    </p>
                    {getConversationData().questions.find(q => q.id === selectedQuestion)?.ctas && (
                      <div className="chatbot-cta-buttons">
                        {getConversationData().questions.find(q => q.id === selectedQuestion)?.ctas.map((cta) => {
                          let destination = "/contact";
                          // Set destination based on question ID
                          if ([1, 4].includes(selectedQuestion)) {
                            destination = "/tripsPage";
                          } else if (selectedQuestion === 2) {
                            destination = "/offers";
                          } else if (selectedQuestion === 3) {
                            destination = "/eventsPage";
                          } else if (selectedQuestion === 5 || selectedQuestion === 6) {
                            destination = "/reservations";
                          }
                          return (
                            <Link key={cta.id} to={destination} className="chatbot-cta-btn">
                              {cta.text}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedCTA && (
              <div className="chatbot-answer" ref={answerRef}>
                <div className="answer-container">
                  <div className="answer-avatar">
                    <img src={lailaAvatar} alt="Laila" />
                  </div>
                  <div className="answer-content">
                    {selectedCTA === "service1" && (
                      <>
                        <p>{getConversationData().questions.find(q => q.id === 1)?.response}</p>
                        <div className="chatbot-cta-buttons">
                          {getConversationData().questions.find(q => q.id === 1)?.ctas.map((cta) => (
                            <Link key={cta.id} to="/tripsPage" className="chatbot-cta-btn">
                              {cta.text}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                    {selectedCTA === "service2" && (
                      <>
                        <p>{getConversationData().questions.find(q => q.id === 2)?.response}</p>
                        <div className="chatbot-cta-buttons">
                          {getConversationData().questions.find(q => q.id === 2)?.ctas.map((cta) => (
                            <Link key={cta.id} to="/offers" className="chatbot-cta-btn">
                              {cta.text}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                    {selectedCTA === "service3" && (
                      <>
                        <p>{getConversationData().questions.find(q => q.id === 3)?.response}</p>
                        <div className="chatbot-cta-buttons">
                          {getConversationData().questions.find(q => q.id === 3)?.ctas.map((cta) => (
                            <Link key={cta.id} to="/eventsPage" className="chatbot-cta-btn">
                              {cta.text}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                    {selectedCTA === "service4" && (
                      <>
                        <p>{getConversationData().questions.find(q => q.id === 4)?.response}</p>
                        <div className="chatbot-cta-buttons">
                          {getConversationData().questions.find(q => q.id === 4)?.ctas.map((cta) => (
                            <Link key={cta.id} to="/tripsPage" className="chatbot-cta-btn">
                              {cta.text}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;