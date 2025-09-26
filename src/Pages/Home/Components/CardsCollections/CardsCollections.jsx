import { useState } from "react";
import TitleSection from "Components/TitleSection/TitleSection";
import CardCollection from "Components/Ui/CardCollection/CardCollection";
import { useLanguage } from "Components/Languages/LanguageContext";
import './CardCollection.css'
import SwiperCards from "Components/Ui/SwiperCards/SwiperCards";
import { SwiperSlide } from "swiper/react";

const CardsCollections = ({ data, type }) => {
  const { currentLanguage } = useLanguage(); // Get the selected language from context
  const content =
    type === "trip"
      ? {
        ar: {
          title: "تجارب و جولات ممتعة",
          text: "اكتشف أكثر الجولات والوجهات بين الاصالة والتاريخ وبين الإرث والعادات وبين الطبيعة والمدينة وبين البادية والحضارة بتضاريسها المتنوعة وثقافتها المختلفة كل تجربة مصممة لتبهرك أكثر ، اكتشفها الآن ",
        },
        en: {
          title: "Exciting Experiences and Tours",
          text: "Discover the best tours and destinations between authenticity and history, heritage and traditions, nature and city, desert and civilization. With diverse landscapes and cultures, each experience is designed to amaze you. Explore them now!",
        },
        fr: {
          title: "Expériences et visites passionnantes",
          text: "Découvrez les meilleures visites et destinations entre authenticité et histoire, patrimoine et traditions, nature et ville, désert et civilisation. Avec des paysages et des cultures variés, chaque expérience est conçue pour vous émerveiller. Explorez-les dès maintenant !",
        },
        es: {
          title: "Experiencias y Tours Emocionantes",
          text: "Descubre los mejores tours y destinos entre autenticidad e historia, patrimonio y tradiciones, naturaleza y ciudad, desierto y civilización. Con paisajes y culturas diversas, cada experiencia está diseñada para sorprenderte. ¡Descúbrelos ahora!",
        },
        de: {
          title: "Spannende Erlebnisse und Touren",
          text: "Entdecke die besten Touren und Reiseziele zwischen Authentizität und Geschichte, Erbe und Traditionen, Natur und Stadt, Wüste und Zivilisation. Mit vielfältigen Landschaften und Kulturen ist jedes Erlebnis darauf ausgelegt, dich zu begeistern. Entdecke sie jetzt!",
        },
        it: {
          title: "Esperienze e Tour Emozionanti",
          text: "Scopri i migliori tour e destinazioni tra autenticità e storia, patrimonio e tradizioni, natura e città, deserto e civiltà. Con paesaggi e culture diversi, ogni esperienza è progettata per sorprenderti. Scoprili ora!",
        },
        ru: {
          title: "Увлекательные впечатления и туры",
          text: "Откройте для себя лучшие туры и направления между аутентичностью и историей, наследием и традициями, природой и городом, пустыней и цивилизацией. С разнообразными ландшафтами и культурами каждый опыт создан, чтобы вас удивить. Исследуйте их сейчас!",
        },
        zh: {
          title: "精彩体验与旅行",
          text: "探索最精彩的旅行与目的地，在真实与历史、遗产与传统、自然与城市、沙漠与文明之间。多样的地貌与不同的文化，每一次体验都为让你惊叹而设计。立即探索吧！",
        },
        ja: {
          title: "魅力的な体験とツアー",
          text: "本物と歴史、遺産と伝統、自然と都市、砂漠と文明の間で、最高のツアーや目的地を発見しましょう。多様な地形と文化を備えた各体験は、あなたを驚かせるように設計されています。今すぐ発見してください！",
        },
        ko: {
          title: "흥미진진한 경험과 투어",
          text: "진정성과 역사, 유산과 전통, 자연과 도시, 사막과 문명 사이에서 최고의 투어와 목적지를 발견하세요. 다양한 지형과 문화로 이루어진 모든 경험은 당신을 놀라게 하도록 설계되었습니다. 지금 바로 탐험해 보세요!",
        },
        tr: {
          title: "Heyecan Verici Deneyimler ve Turlar",
          text: "Otantiklik ve tarih, miras ve gelenekler, doğa ve şehir, çöl ve medeniyet arasında en iyi turları ve destinasyonları keşfedin. Çeşitli manzaralar ve kültürlerle her deneyim sizi etkilemek için tasarlandı. Şimdi keşfedin!",
        },
      }
      : type === "effectivene" ?
        {
          ar: {
            title: "فعاليات مختلفة ",
            text: "عِش أجواء الفعاليات والمهرجانات الأكثر شعبية وإثارة من الفعاليات الخاصة إلى الفعاليات الموسمية والترفيهية المتخصصة، كل لحظة ستدعوك لاكتشاف المتعة مع جولة اكتشف أكثر.",
          },
          en: {
            title: "Diverse Events",
            text: "Experience the atmosphere of the most popular and exciting festivals and events, from private gatherings to seasonal and specialized entertainment. Every moment invites you to discover joy with the Explore More tour.",
          },
          fr: {
            title: "Événements Divers",
            text: "Vivez l'ambiance des festivals et événements les plus populaires et passionnants, des rassemblements privés aux divertissements saisonniers et spécialisés. Chaque instant vous invite à découvrir le plaisir avec la tournée Explore More.",
          },
          es: {
            title: "Eventos Diversos",
            text: "Vive la atmósfera de los festivales y eventos más populares y emocionantes, desde reuniones privadas hasta entretenimiento estacional y especializado. Cada momento te invita a descubrir la diversión con el tour Explora Más.",
          },
          de: {
            title: "Vielfältige Veranstaltungen",
            text: "Erleben Sie die Atmosphäre der beliebtesten und aufregendsten Festivals und Veranstaltungen – von privaten Zusammenkünften bis hin zu saisonalen und spezialisierten Unterhaltungen. Jeder Moment lädt Sie ein, mit der 'Explore More'-Tour Freude zu entdecken.",
          },
          it: {
            title: "Eventi Diversi",
            text: "Vivi l'atmosfera dei festival ed eventi più popolari ed emozionanti, dagli incontri privati all'intrattenimento stagionale e specializzato. Ogni momento ti invita a scoprire il divertimento con il tour Esplora di Più.",
          },
          ru: {
            title: "Разнообразные мероприятия",
            text: "Ощутите атмосферу самых популярных и захватывающих фестивалей и мероприятий — от частных встреч до сезонных и специализированных развлечений. Каждый момент приглашает вас открыть радость с туром 'Открой больше'.",
          },
          zh: {
            title: "多样化活动",
            text: "体验最受欢迎和令人兴奋的节日与活动氛围，从私人聚会到季节性和专业娱乐。每一刻都邀请你通过“探索更多”之旅发现乐趣。",
          },
          ja: {
            title: "多様なイベント",
            text: "最も人気がありエキサイティングな祭りやイベントの雰囲気を体験してください。プライベートな集まりから季節限定や専門的なエンターテインメントまで、あらゆる瞬間が「もっと発見」ツアーで楽しさを発見するようあなたを誘います。",
          },
          ko: {
            title: "다양한 이벤트",
            text: "가장 인기 있고 흥미진진한 축제와 이벤트의 분위기를 경험하세요. 개인 모임부터 계절별 및 전문적인 엔터테인먼트까지, 모든 순간이 '더 탐험하기' 투어와 함께 즐거움을 발견하도록 초대합니다.",
          },
          tr: {
            title: "Çeşitli Etkinlikler",
            text: "En popüler ve heyecan verici festivallerin ve etkinliklerin atmosferini yaşayın. Özel toplantılardan mevsimlik ve özel eğlencelere kadar her an, 'Daha Fazla Keşfet' turu ile keyfi keşfetmeye davet ediyor.",
          },

        } : {
          ar: {
            title: "منتجات وهدايا لك ولأحبائك",
            text: "هدايا ومنتجات فريدة مصنوعة لتترك أثرًا وذكرى رائعة، منتجات تحمل طابع المكان وتترك بصمة في ذاكرتك، لك ولأحبائك، اكتشفها الآن، ماذا تنتظر؟"
          },
          en: {
            title: "Products and Gifts for You and Your Loved Ones",
            text: "Unique gifts and products designed to leave a lasting impression and wonderful memories. Items that carry the essence of the place and leave a mark in your memory—for you and your loved ones. Discover them now—what are you waiting for?"
          },
          fr: {
            title: "Produits et Cadeaux pour Vous et Vos Proches",
            text: "Des cadeaux et produits uniques conçus pour laisser une impression durable et des souvenirs merveilleux. Des articles qui portent l’essence du lieu et marquent votre mémoire — pour vous et vos proches. Découvrez-les maintenant — qu’attendez-vous ?"
          },
          es: {
            title: "Productos y Regalos para Ti y tus Seres Queridos",
            text: "Regalos y productos únicos diseñados para dejar una impresión duradera y recuerdos maravillosos. Artículos que llevan la esencia del lugar y dejan una huella en tu memoria — para ti y tus seres queridos. Descúbrelos ahora — ¿qué estás esperando?"
          },
          de: {
            title: "Produkte und Geschenke für Sie und Ihre Liebsten",
            text: "Einzigartige Geschenke und Produkte, die einen bleibenden Eindruck und wunderbare Erinnerungen hinterlassen. Artikel, die das Flair des Ortes einfangen und eine Spur in Ihrer Erinnerung hinterlassen – für Sie und Ihre Liebsten. Entdecken Sie sie jetzt – worauf warten Sie?"
          },
          it: {
            title: "Prodotti e Regali per Te e i Tuoi Cari",
            text: "Regali e prodotti unici pensati per lasciare un’impressione duratura e ricordi meravigliosi. Oggetti che portano l’essenza del luogo e lasciano un’impronta nella tua memoria — per te e i tuoi cari. Scoprili ora — cosa stai aspettando?"
          },
          ru: {
            title: "Товары и Подарки для Вас и Ваших Близких",
            text: "Уникальные подарки и товары, созданные, чтобы оставить неизгладимое впечатление и прекрасные воспоминания. Предметы, передающие дух места и оставляющие след в вашей памяти — для вас и ваших близких. Откройте их прямо сейчас — чего же вы ждёте?"
          },
          zh: {
            title: "为您和您的爱人准备的产品与礼物",
            text: "独特的产品与礼物，旨在留下深刻印象与美好回忆。这些物品承载着当地的风情，并在您的记忆中留下印记——为您和您所爱的人。立即发现它们，您还在等什么？"
          },
          ja: {
            title: "あなたと大切な人への商品とギフト",
            text: "印象的で素晴らしい思い出を残すためにデザインされたユニークなギフトや商品。場所の本質を感じさせ、記憶に残るアイテム——あなたと大切な人のために。今すぐ見つけてみてください。何を待っているのですか？"
          },
          ko: {
            title: "당신과 사랑하는 사람들을 위한 제품과 선물",
            text: "오랜 인상과 멋진 추억을 남기도록 고안된 독특한 선물과 제품들. 장소의 정취를 담고 기억에 흔적을 남기는 아이템——당신과 사랑하는 사람들을 위해. 지금 바로 만나보세요. 뭘 기다리고 있나요?"
          },
          tr: {
            title: "Siz ve Sevdikleriniz için Ürünler ve Hediyeler",
            text: "Kalıcı bir iz ve harika anılar bırakmak için tasarlanmış eşsiz hediyeler ve ürünler. Yörenin ruhunu taşıyan ve hafızanızda iz bırakan ürünler — sizin ve sevdiklerinizin için. Hemen keşfedin — neyi bekliyorsunuz?"
          },

        }

  const { title, text, addToFavorites, removeFromFavorites } =
    content[currentLanguage];

  return (
    <div className="cards-collections padding-top">
      {/* ============== START TITLE SECTION ============ */}
      {/* ============== END TITLE SECTION ============ */}
      <TitleSection title={title} text={text} />

      {/* ============ START ALL CARDS COLLECTION ============ */}
      <div className="all-cards-collection" data-aos="fade-up">
        <SwiperCards swiperId="cards-collection-swiper">
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <CardCollection
                itemId={`${item.id}`}
                imageCard={item.cover}
                infoPlaceCard={
                  currentLanguage === "ar"
                    ? `${item.city.country_name} . ${item.city.title}`
                    : `${item.city.title}, ${item.city.country_name}`
                }
                numRate={item.total_rates}
                titleCard={item.title}
                numPriceCard={`${item.customer_price} `}
                isFav={item.is_favourit}
                type={type}
                is_group={item.is_group}
                hasFreeCancellation={item.free_cancelation}
                hasPayLater={item.pay_later}
                guide_languages={item.guide_languages}
                booking_count={item.booking_count}
                discount={item.discount}
              />
            </SwiperSlide>
          ))}
        </SwiperCards>
      </div>
    </div>
  );
};

export default CardsCollections;
