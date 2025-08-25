import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import './ChatBot.css';
import saraAvatar from '../../assets/images/chatbot/sara-avatar.svg';

const ChatBot = () => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const answerRef = useRef(null);
  const inputRef = useRef(null);

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
    es: [
      {
        id: 1,
        question: '¿Cómo puedo reservar un viaje?',
        answer: 'Puede reservar un viaje navegando por los viajes disponibles en nuestro sitio web, seleccionando el viaje apropiado, luego siguiendo los pasos de reserva y completando el proceso de pago.'
      },
      {
        id: 2,
        question: '¿Cuál es la política de cancelación?',
        answer: 'Puede cancelar la reserva 48 horas antes de la fecha del viaje y obtener un reembolso completo. La cancelación 24 horas antes resultará en un reembolso del 50%. No hay reembolso disponible para cancelaciones menos de 24 horas antes.'
      },
      {
        id: 3,
        question: '¿Puedo modificar mi reserva?',
        answer: 'Sí, puede modificar su reserva a través de su cuenta personal 48 horas antes de la fecha del viaje. Para modificaciones más cercanas a la fecha del viaje, comuníquese con el servicio al cliente.'
      },
      {
        id: 4,
        question: '¿Qué métodos de pago están disponibles?',
        answer: 'Aceptamos pagos mediante tarjetas de crédito (Visa, Mastercard), servicios de pago electrónico como Apple Pay y STC Pay, así como transferencias bancarias.'
      },
      {
        id: 5,
        question: '¿Cómo puedo contactar al servicio al cliente?',
        answer: 'Puede contactar a nuestro equipo de servicio al cliente por correo electrónico a support@atour.com o por teléfono al +966 123456789 de 9 AM a 9 PM.'
      }
    ],
    tr: [
      {
        id: 1,
        question: 'Nasıl seyahat rezervasyonu yapabilirim?',
        answer: 'Web sitemizde mevcut seyahatleri inceleyerek, uygun seyahati seçerek, ardından rezervasyon adımlarını takip ederek ve ödeme işlemini tamamlayarak seyahat rezervasyonu yapabilirsiniz.'
      },
      {
        id: 2,
        question: 'İptal politikası nedir?',
        answer: 'Seyahat tarihinden 48 saat önce rezervasyonu iptal edebilir ve tam geri ödeme alabilirsiniz. 24 saat öncesinde iptal, %50 geri ödeme ile sonuçlanacaktır. 24 saatten daha az bir süre içinde iptal için geri ödeme yapılmaz.'
      },
      {
        id: 3,
        question: 'Rezervasyonumu değiştirebilir miyim?',
        answer: 'Evet, seyahat tarihinden 48 saat önce kişisel hesabınız üzerinden rezervasyonunuzu değiştirebilirsiniz. Seyahat tarihine daha yakın değişiklikler için lütfen müşteri hizmetleri ile iletişime geçin.'
      },
      {
        id: 4,
        question: 'Hangi ödeme yöntemleri mevcuttur?',
        answer: 'Kredi kartları (Visa, Mastercard), Apple Pay ve STC Pay gibi elektronik ödeme hizmetleri ve banka havalesi ile ödemeyi kabul ediyoruz.'
      },
      {
        id: 5,
        question: 'Müşteri hizmetleriyle nasıl iletişime geçebilirim?',
        answer: 'Müşteri hizmetleri ekibimizle support@atour.com e-posta adresinden veya +966 123456789 telefon numarasından sabah 9\'dan akşam 9\'a kadar iletişime geçebilirsiniz.'
      }
    ],
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

  // Toggle chatbot visibility
  const toggleChatBot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedQuestion(null);
      setUserMessage('');
    }
  };

  // Handle question click
  const handleQuestionClick = (id) => {
    setSelectedQuestion(id);
  };

  // Handle key press in input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handle send message button click
  const handleSendMessage = () => {
    if (userMessage.trim()) {
      // Here you would typically handle the user message
      // For now, we'll just clear the input
      setUserMessage('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Scroll to answer when a question is selected
  useEffect(() => {
    if (selectedQuestion && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedQuestion]);

  return (
    <div className="chatbot-container">
      {/* Chat button */}
      <button
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
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <img src={saraAvatar} alt="Sara" />
            </div>
            <div className="chatbot-info">
              <h3>Sara</h3>
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
              <p>
                {{
                  ar: 'مرحبًا! أنا سارة، مساعدتك الافتراضية. كيف يمكنني مساعدتك اليوم؟',
                  en: 'Hello! I\'m Sara, your virtual assistant. How can I help you today?',
                  fr: 'Bonjour! Je suis Sara, votre assistante virtuelle. Comment puis-je vous aider aujourd\'hui?',
                  de: 'Hallo! Ich bin Sara, Ihre virtuelle Assistentin. Wie kann ich Ihnen heute helfen?',
                  es: '¡Hola! Soy Sara, tu asistente virtual. ¿Cómo puedo ayudarte hoy?',
                  tr: 'Merhaba! Ben Sara, sanal asistanınız. Bugün size nasıl yardımcı olabilirim?',
                  ru: 'Привет! Я Сара, ваш виртуальный помощник. Как я могу помочь вам сегодня?',
                  zh: '你好！我是萨拉，你的虚拟助手。今天我能帮你什么？',
                  ko: '안녕하세요! 저는 사라, 당신의 가상 비서입니다. 오늘 어떻게 도와드릴까요?',
                  pt: 'Olá! Eu sou Sara, sua assistente virtual. Como posso ajudá-lo hoje?',
                  ur: 'ہیلو! میں سارہ ہوں، آپ کی ورچوئل اسسٹنٹ۔ میں آج آپ کی کیسے مدد کر سکتی ہوں؟',
                  ja: 'こんにちは！私はサラ、あなたの仮想アシスタントです。今日はどのようにお手伝いできますか？'
                }[currentLanguage] || 'Hello! I\'m Sara, your virtual assistant. How can I help you today?'}
              </p>
            </div>
            
          

            <div className="chatbot-faq">
              <h4>
                {{
                  ar: 'الأسئلة الشائعة',
                  en: 'Frequently Asked Questions',
                  fr: 'Questions Fréquemment Posées',
                  de: 'Häufig Gestellte Fragen',
                  es: 'Preguntas Frecuentes',
                  tr: 'Sık Sorulan Sorular',
                  ru: 'Часто Задаваемые Вопросы',
                  zh: '常见问题',
                  ko: '자주 묻는 질문',
                  pt: 'Perguntas Frequentes',
                  ur: 'اکثر پوچھے گئے سوالات',
                  ja: 'よくある質問'
                }[currentLanguage] || 'Frequently Asked Questions'}
              </h4>
              <ul>
                {(faqData[currentLanguage] || faqData['en']).map((faq) => (
                  <li
                    key={faq.id}
                    className={selectedQuestion === faq.id ? 'selected' : ''}
                    onClick={() => handleQuestionClick(faq.id)}
                  >
                    {faq.question}
                  </li>
                ))}
              </ul>
            </div>

            {selectedQuestion && (
              <div className="chatbot-answer" ref={answerRef}>
                <div className="answer-container">
                  <div className="answer-avatar">
                    <img src={saraAvatar} alt="Sara" />
                  </div>
                  <div className="answer-content">
                    <p>
                      {(faqData[currentLanguage] || faqData['en']).find(faq => faq.id === selectedQuestion)?.answer}
                    </p>
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