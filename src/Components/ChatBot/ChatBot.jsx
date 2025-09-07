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
    "ar": "ليلي"
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

  // Conversation data with bilingual support
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
      welcome: "I'm Layla from Jawla! 🌟 Welcome to Jawla 🤍",
      initialPrompt: "Here you will explore more about Saudi Arabia through the Jawla platform and its distinguished service providers. You will experience cultural adventures 🕌, taste the most delicious authentic and traditional foods with their original flavor and method 🍲, and visit the most beautiful archaeological and tourist places that you can't reach elsewhere 🏰🌄. You can click on one of the options to help you:",
      initialOptions: [
        { id: "services", text: " Services" },
        { id: "bookings", text: " Bookings" },
        { id: "payment", text: " Payment" },
        { id: "auth", text: " Registration & Login" },
        { id: "customer_service", text: " Customer Service" }
      ]
    }
  };





  // Handle conversation flow
  const handleConversationFlow = (optionId) => {
    switch (optionId) {
      case 'services':
        addBotMessage(
          currentLanguage === 'ar' ? 'اختر نوع الخدمة التي تريدها:' : 'Choose the type of service you want:',
          [
            { id: 'tour_service', text: currentLanguage === 'ar' ? 'جولة سياحية 🏞️' : 'Tourist Tour 🏞️' },
            { id: 'gift_service', text: currentLanguage === 'ar' ? 'هدية تذكارية 🎁' : 'Souvenir Gift 🎁' },
            { id: 'event_service', text: currentLanguage === 'ar' ? 'مهرجان او فعالية 🎉' : 'Festival or Event 🎉' },
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      case 'tour_service':
        addBotMessage(
          currentLanguage === 'ar' ? 'اكتشف أجمل الجولات السياحية في السعودية مع مرشدين محليين متخصصين 🗺️' : 'Discover the most beautiful tourist tours in Saudi Arabia with specialized local guides 🗺️',
          [
            { id: 'view_tours', text: currentLanguage === 'ar' ? 'شاهد الجولات المتاحة' : 'View Available Tours', link: '/tripsPage' },
            { id: 'services', text: currentLanguage === 'ar' ? 'العودة لقائمة الخدمات' : 'Back to Services' }
          ]
        );
        break;
      
      case 'gift_service':
        addBotMessage(
          currentLanguage === 'ar' ? 'اختر من مجموعة متنوعة من الهدايا التذكارية الأصيلة والتراثية 🎁' : 'Choose from a variety of authentic and traditional souvenir gifts 🎁',
          [
            { id: 'view_gifts', text: currentLanguage === 'ar' ? 'تصفح الهدايا' : 'Browse Gifts', link: '/offers' },
            { id: 'services', text: currentLanguage === 'ar' ? 'العودة لقائمة الخدمات' : 'Back to Services' }
          ]
        );
        break;
      
      case 'event_service':
        addBotMessage(
          currentLanguage === 'ar' ? 'شارك في أجمل المهرجانات والفعاليات الثقافية والتراثية 🎉' : 'Participate in the most beautiful cultural and heritage festivals and events 🎉',
          [
            { id: 'view_events', text: currentLanguage === 'ar' ? 'استكشف الفعاليات' : 'Explore Events', link: '/eventsPage' },
            { id: 'services', text: currentLanguage === 'ar' ? 'العودة لقائمة الخدمات' : 'Back to Services' }
          ]
        );
        break;
      
      case 'main_menu':
        addBotMessage(
          currentLanguage === 'ar' ? 'أهلاً بك مرة أخرى في القائمة الرئيسية. كيف يمكنني مساعدتك؟' : 'Welcome back to the main menu. How can I help you?',
          getConversationData().initialOptions
        );
        break;
      
      case 'bookings':
        addBotMessage(
          currentLanguage === 'ar' ? 'اختر ما تريد معرفته عن الحجوزات:' : 'Choose what you want to know about bookings:',
          [
            { id: 'booking_method', text: currentLanguage === 'ar' ? 'طريقة الحجز ؟' : 'How to Book?' },
            { id: 'manage_bookings', text: currentLanguage === 'ar' ? 'إدارة حجوزاتي 📋' : 'Manage My Bookings 📋' },
            { id: 'view_bookings', text: currentLanguage === 'ar' ? 'شاهد حجوزاتك 📂' : 'View Your Bookings 📂' },
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      case 'payment':
        addBotMessage(
          currentLanguage === 'ar' ? 'نقبل جميع أنواع الدفع 💳، بوابة الدفع في التطبيق تدعم معظم أنواع الدفع الإلكتروني ⚡.' : 'We accept all payment types 💳, the in-app payment gateway supports most electronic payment methods ⚡.',
          [
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      case 'auth':
        addBotMessage(
          currentLanguage === 'ar' ? 'اختر ما تريد القيام به:' : 'Choose what you want to do:',
          [
            { id: 'reset_password', text: currentLanguage === 'ar' ? 'إعادة تعيين كلمة المرور 🔑' : 'Reset Password 🔑' },
            { id: 'contact_support', text: currentLanguage === 'ar' ? 'تواصل مع الدعم ☎️' : 'Contact Support ☎️' },
            { id: 'register_customer', text: currentLanguage === 'ar' ? 'سجل كعميل 🧑‍💼' : 'Register as Customer 🧑‍💼' },
            { id: 'register_provider', text: currentLanguage === 'ar' ? 'سجل كمورد 🏪' : 'Register as Provider 🏪' },
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      case 'customer_service':
        addBotMessage(
          currentLanguage === 'ar' ? 'يمكنك التواصل مع فريق خدمة العملاء عبر الطرق التالية:' : 'You can contact our customer service team through the following methods:',
          [
            { id: 'contact_info', text: currentLanguage === 'ar' ? 'معلومات التواصل 📞' : 'Contact Information 📞' },
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      case 'booking_method':
        addBotMessage(
          currentLanguage === 'ar' ? 'يمكنك الحجز بسهولة من خلال تصفح الخدمات المتاحة واختيار ما يناسبك، ثم اتباع خطوات الحجز البسيطة 📝' : 'You can easily book by browsing available services and choosing what suits you, then following simple booking steps 📝',
          [
            { id: 'bookings', text: currentLanguage === 'ar' ? 'العودة لقائمة الحجوزات' : 'Back to Bookings' }
          ]
        );
        break;
      
      case 'manage_bookings':
      case 'view_bookings':
        addBotMessage(
          currentLanguage === 'ar' ? 'يمكنك إدارة ومشاهدة جميع حجوزاتك من خلال صفحة الحجوزات 📋' : 'You can manage and view all your bookings through the bookings page 📋',
          [
            { id: 'go_to_bookings', text: currentLanguage === 'ar' ? 'انتقل إلى صفحة الحجوزات' : 'Go to Bookings Page', link: '/reservations' },
            { id: 'bookings', text: currentLanguage === 'ar' ? 'العودة لقائمة الحجوزات' : 'Back to Bookings' }
          ]
        );
        break;
      
      case 'contact_info':
        addBotMessage(
          currentLanguage === 'ar' ? 'يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف. فريقنا متاح لمساعدتك في أي وقت 📞✉️' : 'You can contact us via email or phone. Our team is available to help you anytime 📞✉️',
          [
            { id: 'customer_service', text: currentLanguage === 'ar' ? 'العودة لخدمة العملاء' : 'Back to Customer Service' }
          ]
        );
        break;
      
      case 'reset_password':
        addBotMessage(
          currentLanguage === 'ar' ? 'يمكنك إعادة تعيين كلمة المرور من خلال صفحة تسجيل الدخول 🔑' : 'You can reset your password through the login page 🔑',
          [
            { id: 'go_to_login', text: currentLanguage === 'ar' ? 'انتقل إلى صفحة تسجيل الدخول' : 'Go to Login Page', link: '/login' },
            { id: 'auth', text: currentLanguage === 'ar' ? 'العودة للقائمة السابقة' : 'Back to Previous Menu' },
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      case 'contact_support':
        addBotMessage(
          currentLanguage === 'ar' ? 'يمكنك التواصل مع فريق الدعم الفني لمساعدتك في أي استفسار ☎️' : 'You can contact our technical support team for any inquiries ☎️',
          [
            { id: 'contact_info', text: currentLanguage === 'ar' ? 'معلومات التواصل 📞' : 'Contact Information 📞' },
            { id: 'auth', text: currentLanguage === 'ar' ? 'العودة للقائمة السابقة' : 'Back to Previous Menu' },
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      case 'register_customer':
        addBotMessage(
          currentLanguage === 'ar' ? 'شاهد فيديو شرح التسجيل كعميل 🧑‍💼 من خلال الرابط التالي:' : 'Watch the customer registration tutorial video 🧑‍💼 through the following link:',
          [
            { id: 'customer_video', text: currentLanguage === 'ar' ? 'شاهد فيديو التسجيل 🎥' : 'Watch Registration Video 🎥', link: 'https://drive.google.com/file/d/19eV-XwU8BT82RYKAcE4kOagTr-qeanDS/view?usp=drive_link' },
            { id: 'auth', text: currentLanguage === 'ar' ? 'العودة للقائمة السابقة' : 'Back to Previous Menu' },
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      case 'register_provider':
        addBotMessage(
          currentLanguage === 'ar' ? 'شاهد فيديو شرح التسجيل كمورد 🏪 من خلال الرابط التالي:' : 'Watch the provider registration tutorial video 🏪 through the following link:',
          [
            { id: 'provider_video', text: currentLanguage === 'ar' ? 'شاهد فيديو التسجيل 🎥' : 'Watch Registration Video 🎥', link: 'https://drive.google.com/file/d/19eV-XwU8BT82RYKAcE4kOagTr-qeanDS/view?usp=drive_link' },
            { id: 'auth', text: currentLanguage === 'ar' ? 'العودة للقائمة السابقة' : 'Back to Previous Menu' },
            { id: 'main_menu', text: currentLanguage === 'ar' ? 'العودة للقائمة الرئيسية' : 'Back to Main Menu' }
          ]
        );
        break;
      
      default:
        addBotMessage(
          currentLanguage === 'ar' ? 'عذراً، لم أفهم طلبك. يمكنك اختيار من الخيارات المتاحة.' : 'Sorry, I didn\'t understand your request. You can choose from the available options.',
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
          en: 'Open chat assistant'
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
              <img src={lailaAvatar} alt="Laila" />
            </div>
            <div className="chatbot-info">
              <h3>{lilaName[currentLanguage]}</h3>
              <p>
                {{
                  ar: 'مساعد افتراضي',
                  en: 'Virtual Assistant'
                }[currentLanguage] || 'Virtual Assistant'}
              </p>
            </div>
            <button
              className="chatbot-close"
              onClick={toggleChatBot}
              aria-label={{
                ar: 'إغلاق',
                en: 'Close'
              }[currentLanguage] || 'Close'}
            >
              &times;
            </button>
          </div>

          <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === 'bot' && (
                  <img src={lailaAvatar} alt="Laila" className="bot-avatar" />
                )}
                {message.type === 'user' && (
                  <img 
                    src={profile?.photo || userPlaceholder} 
                    alt="User" 
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
                <img src={lailaAvatar} alt="Laila" className="bot-avatar" />
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