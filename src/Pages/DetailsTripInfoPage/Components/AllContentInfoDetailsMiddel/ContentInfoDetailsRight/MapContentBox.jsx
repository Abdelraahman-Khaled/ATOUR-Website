import { useLanguage } from "Components/Languages/LanguageContext";
import MapLocationInfo from "Components/Ui/MapLocationInfo/MapLocationInfo";

const MapContentBox = ({ tripData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language

  // Multi-language content
  const content = {
    title: {
      ar: "من أين ستبدأ الجولة",
      en: "Where Will Your Journey Start",
      fr: "Où commencera votre voyage",
      de: "Wo wird Ihre Reise beginnen",
      es: "Dónde comenzará tu viaje",
      tr: "Yolculuğunuz Nerede Başlayacak",
      ru: "Где начнется ваше путешествие",
      zh: "您的旅程将从哪里开始",
      ko: "여정은 어디서 시작됩니까",
      pt: "Onde começará a sua viagem",
      ur: "آپ کا سفر کہاں سے شروع ہوگا",
      ja: "あなたの旅はどこから始まりますか",
    },
    meetingPoint: {
      ar: "نقطة الإلتقاء",
      en: "Meeting Point",
      fr: "Point de rencontre",
      de: "Treffpunkt",
      es: "Punto de encuentro",
      tr: "Buluşma Noktası",
      ru: "Место встречи",
      zh: "集合点",
      ko: "만남의 장소",
      pt: "Ponto de Encontro",
      ur: "ملاقات کی جگہ",
      ja: "集合場所",
    },
    endPoint: {
      ar: "نقطة الانتهاء",
      en: "End Point",
      fr: "Point final",
      de: "Endpunkt",
      es: "Punto final",
      tr: "Bitiş Noktası",
      ru: "Конечная точка",
      zh: "终点",
      ko: "종착점",
      pt: "Ponto Final",
      ur: "اختتامی مقام",
      ja: "終点",
    },
    groupNote: {
      ar: "هذه نقطة محددة من مقدم الخدمة، يمكنك الاتفاق بعد الحجز. للمجموعات فقط يتم تحديد نقطة التقاء من قبل العميل.",
      en: "This is a fixed point set by the provider. After booking, you can agree on another meeting point. For groups only, the client may set a specific meeting point.",
      fr: "Ceci est un point fixe défini par le fournisseur. Après la réservation, vous pouvez convenir d'un autre point de rencontre. Pour les groupes uniquement, le client peut définir un point spécifique.",
      de: "Dies ist ein fester Punkt, der vom Anbieter festgelegt wurde. Nach der Buchung können Sie einen anderen Treffpunkt vereinbaren. Nur für Gruppen kann der Kunde einen bestimmten Treffpunkt festlegen.",
      es: "Este es un punto fijo establecido por el proveedor. Después de la reserva, puede acordar otro punto de encuentro. Solo para grupos, el cliente puede establecer un punto específico.",
      tr: "Bu, sağlayıcı tarafından belirlenen sabit bir noktadır. Rezervasyondan sonra başka bir buluşma noktası kararlaştırabilirsiniz. Yalnızca gruplar için, müşteri belirli bir buluşma noktası belirleyebilir.",
      ru: "Это фиксированная точка, установленная поставщиком. После бронирования можно договориться о другой точке встречи. Только для групп клиент может установить конкретное место встречи.",
      zh: "这是服务提供商设定的固定点。预订后，您可以另行约定集合点。仅限团队，客户可以指定集合点。",
      ko: "이것은 제공자가 정한 고정 지점입니다. 예약 후 다른 만남의 장소를 합의할 수 있습니다. 그룹의 경우에만 고객이 특정 만남의 장소를 정할 수 있습니다.",
      pt: "Este é um ponto fixo definido pelo fornecedor. Após a reserva, pode concordar com outro ponto de encontro. Apenas para grupos, o cliente pode definir um ponto específico.",
      ur: "یہ ایک مقررہ مقام ہے جو فراہم کنندہ نے مقرر کیا ہے۔ بکنگ کے بعد آپ کسی اور ملاقات کے مقام پر اتفاق کر سکتے ہیں۔ صرف گروپوں کے لیے، گاہک ایک مخصوص ملاقات کا مقام طے کر سکتا ہے۔",
      ja: "これはプロバイダーによって設定された固定の場所です。予約後、別の集合場所に合意できます。グループのみ、クライアントが特定の集合場所を設定できます。",
    },
  };

  return (
    <div className="map-content-box--info margin-top-1">
      <div className="row g-3 align-items-center">
        <div className="col-12 col-md-7">
          <div className="content-info-map">
            {/* Title */}
            <h2 className="title">{content.title[currentLanguage]}</h2>

            {/* Group note */}
            {tripData.is_group ? (
              <p className="text-read-more mt-2">
                {content.groupNote[currentLanguage]}
              </p>
            )
              : null
            }

            {/* Meeting Point */}
            <div className="box-border-circle">
              <h2 className="title-text">{content.meetingPoint[currentLanguage]}</h2>
              <p className="text">{tripData.start_point}</p>
            </div>

            {/* Steps */}
            {tripData.steps_list.map((item, i) => (
              <div key={i} className="box-border-circle">
                <p className="text">{item}</p>
              </div>
            ))}

            {/* End Point */}
            <div className="box-border-circle">
              <h2 className="title-text">{content.endPoint[currentLanguage]}</h2>
              <p className="text">{tripData.end_point}</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-5">
          <div className="map-box">
            <MapLocationInfo tripData={tripData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContentBox;
