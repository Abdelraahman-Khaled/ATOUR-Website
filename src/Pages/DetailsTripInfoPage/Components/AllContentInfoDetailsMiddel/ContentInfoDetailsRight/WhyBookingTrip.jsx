import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "Components/Languages/LanguageContext";

const translations = {
  title: {
    ar: "مميزات الجولة",
    en: "Why Book the Trip",
    fr: "Pourquoi réserver le voyage",
    de: "Warum die Reise buchen",
    es: "Por qué reservar el viaje",
    tr: "Geziyi Neden Rezerve Etmelisiniz",
    ru: "Почему стоит забронировать поездку",
    zh: "为什么预订此行程",
    ko: "여행을 예약해야 하는 이유",
    pt: "Por que reservar a viagem",
    ur: "یہ سفر کیوں بک کریں",
    ja: "なぜこの旅行を予約するのか",
  },
  description: {
    ar: "هذه الخدمات متوفرة بالرحلة بشكل مجاني من مقدم الخدمة",
    en: "These services are available free of charge on the trip from the provider",
    fr: "Ces services sont disponibles gratuitement lors du voyage par le fournisseur",
    de: "Diese Leistungen sind kostenlos auf der Reise vom Anbieter verfügbar",
    es: "Estos servicios están disponibles de forma gratuita en el viaje por parte del proveedor",
    tr: "Bu hizmetler sağlayıcı tarafından seyahatte ücretsiz olarak sunulmaktadır",
    ru: "Эти услуги предоставляются бесплатно во время поездки от провайдера",
    zh: "这些服务由提供商在旅途中免费提供",
    ko: "이 서비스는 제공업체에서 여행 중 무료로 제공됩니다",
    pt: "Estes serviços estão disponíveis gratuitamente durante a viagem pelo fornecedor",
    ur: "یہ خدمات سفر میں فراہم کنندہ کی طرف سے مفت دستیاب ہیں",
    ja: "これらのサービスは旅行中に提供者から無料で利用できます",
  },
  noFeatures: {
    ar: "لا توجد ميزات مضافة لهذه الرحلة.",
    en: "No features added for this trip.",
    fr: "Aucune fonctionnalité ajoutée pour ce voyage.",
    de: "Keine Funktionen für diese Reise hinzugefügt.",
    es: "No se añadieron características para este viaje.",
    tr: "Bu gezi için özellik eklenmedi.",
    ru: "Для этой поездки не добавлено функций.",
    zh: "此行程没有添加任何功能。",
    ko: "이 여행에는 추가된 기능이 없습니다.",
    pt: "Nenhuma funcionalidade adicionada para esta viagem.",
    ur: "اس سفر کے لئے کوئی خصوصیات شامل نہیں کی گئیں۔",
    ja: "この旅行には追加された機能はありません。",
  },
};

const WhyBookingTrip = ({ tripData }) => {
  const { currentLanguage } = useLanguage();
  const services = tripData.features || [];

  return (
    <div className="why-booking-trip pt-3 margin-top-1">
      <h2 className="title">{translations.title[currentLanguage]}</h2>
      <p className="text-read-more mt-2">{translations.description[currentLanguage]}</p>

      <div className="list-content-info d-flex align-items-center gap-5 flex-wrap mt-4">
        <ul className="list-one-info p-0 m-0 d-flex flex-column gap-3">
          {services.length > 0 ? (
            services.map((feature, index) => (
              <li
                key={index}
                className="text-title--1 d-flex align-items-center gap-2"
              >
                <div className="icon-times icon-check-link">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                {feature.title}
              </li>
            ))
          ) : (
            <p className="text-muted">
              {translations.noFeatures[currentLanguage]}
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WhyBookingTrip;
