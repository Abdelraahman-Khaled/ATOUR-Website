import { useState } from "react";
import TitleSection from "Components/TitleSection/TitleSection";
import CardCollection from "Components/Ui/CardCollection/CardCollection";
import PaginationPage from "Components/Pagination/Pagination";
import { useLanguage } from "Components/Languages/LanguageContext";
import './CardCollection.css'

const CardsCollections = ({ data, type }) => {
  const { currentLanguage } = useLanguage(); // Get the selected language from context
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // NUMBER OF PAGE ITEMS
  const pageCount = Math.ceil(data.length / perPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const currentPageData = data.slice(offset, offset + perPage);
  const content = {
    ar: {
      title: "احداث ممتعة",
      text: "في عالم مليء بالفرص والمغامرات، هناك تجارب لا يمكن تفويتها. تجارب تأخذك بعيدًا عن الروتين اليومي، تفتح أمامك أبوابًا جديدة لاكتشاف ذاتك والعالم من حولك. سواء كنت تبحث عن مغامرة تضخ الأدرينالين في عروقك، أو لحظة هدوء تنعش روحك، فإن هذه التجارب مصممة لتبقى محفورة في ذاكرتك إلى الأبد. استعد لتجربة تستحق أن تُروى!",
      addToFavorites: "تم الاضافة الى المفضلة.",
      removeFromFavorites: "تم الأزالة من المفضلة.",
    },
    en: {
      title: "Experiences Worth Trying",
      text: "In a world full of opportunities and adventures, there are experiences that cannot be missed. Experiences that take you far from the daily routine and open new doors to discover yourself and the world around you. Whether you're seeking an adrenaline-pumping adventure or a moment of tranquility to refresh your soul, these experiences are designed to remain etched in your memory forever. Get ready for an experience worth sharing!",
      addToFavorites: "Added to favorites.",
      removeFromFavorites: "Removed from favorites.",
    },
    fr: {
      title: "Expériences à vivre",
      text: "Dans un monde plein d'opportunités et d'aventures, certaines expériences sont incontournables. Elles vous éloignent de la routine quotidienne et ouvrent de nouvelles portes pour découvrir vous-même et le monde qui vous entoure. Que vous recherchiez une aventure pleine d'adrénaline ou un moment de calme pour rafraîchir votre âme, ces expériences resteront gravées dans votre mémoire pour toujours. Préparez-vous à une expérience qui mérite d'être partagée !",
      addToFavorites: "Ajouté aux favoris.",
      removeFromFavorites: "Supprimé des favoris.",
    },
    de: {
      title: "Erlebnisse, die es wert sind",
      text: "In einer Welt voller Möglichkeiten und Abenteuer gibt es Erlebnisse, die man nicht verpassen darf. Sie nehmen Sie weit weg vom Alltag und öffnen neue Türen, um sich selbst und die Welt um Sie herum zu entdecken. Ob Sie ein Adrenalinabenteuer suchen oder einen ruhigen Moment, der Ihre Seele erfrischt – diese Erlebnisse bleiben für immer in Ihrer Erinnerung. Machen Sie sich bereit für ein Erlebnis, das es wert ist, geteilt zu werden!",
      addToFavorites: "Zu Favoriten hinzugefügt.",
      removeFromFavorites: "Aus Favoriten entfernt.",
    },
    es: {
      title: "Experiencias que valen la pena",
      text: "En un mundo lleno de oportunidades y aventuras, hay experiencias que no se pueden perder. Te alejan de la rutina diaria y abren nuevas puertas para descubrirte a ti mismo y el mundo que te rodea. Ya sea que busques una aventura llena de adrenalina o un momento de calma que refresque tu alma, estas experiencias están diseñadas para permanecer grabadas en tu memoria para siempre. ¡Prepárate para una experiencia que vale la pena compartir!",
      addToFavorites: "Añadido a favoritos.",
      removeFromFavorites: "Eliminado de favoritos.",
    },
    tr: {
      title: "Denemeye Değer Deneyimler",
      text: "Fırsatlarla ve maceralarla dolu bir dünyada, kaçırılmaması gereken deneyimler vardır. Günlük rutininizden uzaklaşıp kendinizi ve çevrenizdeki dünyayı keşfetmenizi sağlayan yeni kapılar açar. İster adrenalin dolu bir macera arıyor olun, ister ruhunuzu tazeleyecek huzurlu bir an, bu deneyimler hafızanızda sonsuza kadar kalacak. Anlatmaya değer bir deneyime hazır olun!",
      addToFavorites: "Favorilere eklendi.",
      removeFromFavorites: "Favorilerden çıkarıldı.",
    },
    ru: {
      title: "Опыт, который стоит попробовать",
      text: "В мире, полном возможностей и приключений, есть впечатления, которые нельзя пропустить. Они уводят вас от повседневной рутины и открывают новые двери для самопознания и открытия мира вокруг вас. Ищете ли вы приключение, полное адреналина, или момент спокойствия, освежающий вашу душу – эти впечатления навсегда останутся в вашей памяти. Приготовьтесь к опыту, которым стоит поделиться!",
      addToFavorites: "Добавлено в избранное.",
      removeFromFavorites: "Удалено из избранного.",
    },
    zh: {
      title: "值得尝试的体验",
      text: "在一个充满机会和冒险的世界里，有些体验是不能错过的。它们带你远离日常的惯例，开启新的大门，帮助你发现自我和周围的世界。无论你是在寻找一次肾上腺素飙升的冒险，还是一段让心灵焕然一新的宁静时光，这些体验都将永远铭刻在你的记忆中。准备好迎接一次值得分享的经历吧！",
      addToFavorites: "已添加到收藏夹。",
      removeFromFavorites: "已从收藏夹移除。",
    },
    ko: {
      title: "시도해 볼 만한 경험",
      text: "기회와 모험으로 가득한 세상에는 놓쳐서는 안 될 경험들이 있습니다. 일상에서 벗어나 자신과 주변 세상을 발견할 수 있는 새로운 문을 열어줍니다. 아드레날린이 솟구치는 모험을 찾든, 마음을 새롭게 해주는 평온한 순간을 찾든, 이 경험들은 영원히 기억에 남도록 설계되었습니다. 함께 나눌 가치가 있는 경험을 준비하세요!",
      addToFavorites: "즐겨찾기에 추가되었습니다.",
      removeFromFavorites: "즐겨찾기에서 제거되었습니다.",
    },
    pt: {
      title: "Experiências que valem a pena",
      text: "Em um mundo cheio de oportunidades e aventuras, existem experiências que não podem ser perdidas. Elas o afastam da rotina diária e abrem novas portas para descobrir a si mesmo e o mundo ao seu redor. Seja procurando uma aventura cheia de adrenalina ou um momento de tranquilidade para refrescar sua alma, essas experiências foram feitas para permanecer na memória para sempre. Prepare-se para uma experiência que vale a pena compartilhar!",
      addToFavorites: "Adicionado aos favoritos.",
      removeFromFavorites: "Removido dos favoritos.",
    },
    ur: {
      title: "قابلِ ذکر تجربے",
      text: "مواقع اور مہم جوئی سے بھری دنیا میں کچھ تجربات ایسے ہیں جنہیں نظرانداز نہیں کیا جا سکتا۔ یہ آپ کو روزمرہ کی روٹین سے دور لے جاتے ہیں اور خود کو اور اپنے اردگرد کی دنیا کو دریافت کرنے کے نئے دروازے کھولتے ہیں۔ چاہے آپ ایک ایسا ایڈونچر تلاش کر رہے ہوں جو ایڈرینالین بڑھا دے یا سکون کا لمحہ جو آپ کی روح کو تازگی بخشے، یہ تجربات ہمیشہ آپ کی یاد میں رہیں گے۔ ایک ایسا تجربہ پانے کے لیے تیار ہو جائیں جسے بانٹنا قابلِ فخر ہو!",
      addToFavorites: "پسندیدہ میں شامل کر دیا گیا۔",
      removeFromFavorites: "پسندیدہ سے ہٹا دیا گیا۔",
    },
    ja: {
      title: "試す価値のある体験",
      text: "チャンスと冒険に満ちた世界には、見逃せない体験があります。日常から離れ、自分自身や周囲の世界を発見する新しい扉を開きます。アドレナリンが湧き上がる冒険を求めているか、心をリフレッシュする静かな瞬間を求めているかに関わらず、これらの体験は永遠に記憶に残るように設計されています。共有する価値のある体験の準備をしましょう！",
      addToFavorites: "お気に入りに追加しました。",
      removeFromFavorites: "お気に入りから削除しました。",
    },
  };


  const { title, text, addToFavorites, removeFromFavorites } =
    content[currentLanguage];

  return (
    <div className="cards-collections padding-top">
      {/* ============== START TITLE SECTION ============ */}
      <TitleSection title={title} text={text} />
      {/* ============== END TITLE SECTION ============ */}

      {/* ============ START ALL CARDS COLLECTION ============ */}
      <div className="all-cards-collection" data-aos="fade-up">
        <div className="row g-3 justify-content-center">
          {currentPageData.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 most-visited" key={item.id}>
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
              />
            </div>
          ))}
        </div>
        {pageCount > 1 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />}
      </div>
    </div>
  );
};

export default CardsCollections;
