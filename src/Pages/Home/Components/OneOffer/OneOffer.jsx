import { isAuthenticated } from "api/axiosInstance";
import FormAuth from "Components/Auth/FormAuth/FormAuth";
import { useLanguage } from "Components/Languages/LanguageContext";
import TitleSection from "Components/TitleSection/TitleSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import OneOfferCard from "./OneOfferCard";
import backUP from "../../../../assets/images/slider/01.png";
import PaginationPage from "Components/Pagination/Pagination";

const content = {
    ar: {
        title: "عروض تستحق التجربة",
        text: "في عالم مليء بالفرص والمغامرات، هناك تجارب لا يمكن تفويتها. تجارب تأخذك بعيدًا عن الروتين اليومي، تفتح أمامك أبوابًا جديدة لاكتشاف ذاتك والعالم من حولك. سواء كنت تبحث عن مغامرة تضخ الأدرينالين في عروقك، أو لحظة هدوء تنعش روحك، فإن هذه التجارب مصممة لتبقى محفورة في ذاكرتك إلى الأبد. استعد لتجربة تستحق أن تُروى!",
        addToFavorites: "تم الاضافة الى المفضلة.",
        removeFromFavorites: "تم الأزالة من المفضلة.",
    },
    en: {
        title: "Offers worth trying",
        text: "In a world full of opportunities and adventures, there are experiences that cannot be missed. Experiences that take you away from your daily routine, opening new doors for you to discover yourself and the world around you. Whether you are looking for an adrenaline-pumping adventure or a moment of calm that refreshes your soul, these experiences are designed to remain etched in your memory forever. Get ready for an experience worth telling.",
        addToFavorites: "Added to favorites.",
        removeFromFavorites: "Removed from favorites.",
    },
    fr: {
        title: "Offres à essayer",
        text: "Dans un monde plein d'opportunités et d'aventures, il y a des expériences à ne pas manquer. Des expériences qui vous éloignent de la routine quotidienne et vous ouvrent de nouvelles portes pour découvrir vous-même et le monde qui vous entoure. Que vous recherchiez une aventure pleine d’adrénaline ou un moment de calme pour rafraîchir votre âme, ces expériences sont conçues pour rester gravées dans votre mémoire à jamais. Préparez-vous à vivre une expérience qui vaut la peine d'être racontée.",
        addToFavorites: "Ajouté aux favoris.",
        removeFromFavorites: "Supprimé des favoris.",
    },
    de: {
        title: "Angebote, die es wert sind, ausprobiert zu werden",
        text: "In einer Welt voller Möglichkeiten und Abenteuer gibt es Erfahrungen, die man nicht verpassen darf. Erfahrungen, die Sie aus Ihrer täglichen Routine herausholen und neue Türen öffnen, um sich selbst und die Welt um Sie herum zu entdecken. Ob Sie ein Adrenalin-Abenteuer oder einen ruhigen Moment suchen, der Ihre Seele erfrischt – diese Erlebnisse sind dafür gemacht, für immer in Erinnerung zu bleiben. Machen Sie sich bereit für ein Erlebnis, das es wert ist, erzählt zu werden.",
        addToFavorites: "Zu Favoriten hinzugefügt.",
        removeFromFavorites: "Aus Favoriten entfernt.",
    },
    es: {
        title: "Ofertas que vale la pena probar",
        text: "En un mundo lleno de oportunidades y aventuras, hay experiencias que no se pueden perder. Experiencias que te alejan de tu rutina diaria y abren nuevas puertas para descubrirte a ti mismo y al mundo que te rodea. Ya sea que busques una aventura llena de adrenalina o un momento de calma que refresque tu alma, estas experiencias están diseñadas para quedar grabadas en tu memoria para siempre. Prepárate para una experiencia que vale la pena contar.",
        addToFavorites: "Añadido a favoritos.",
        removeFromFavorites: "Eliminado de favoritos.",
    },
    tr: {
        title: "Denemeye değer fırsatlar",
        text: "Fırsatlarla ve maceralarla dolu bir dünyada, kaçırılmaması gereken deneyimler vardır. Sizi günlük rutininizden uzaklaştıran, kendinizi ve çevrenizdeki dünyayı keşfetmeniz için yeni kapılar açan deneyimler. İster adrenalin dolu bir macera arıyor olun, ister ruhunuzu tazeleyecek sakin bir an, bu deneyimler hafızanıza sonsuza dek kazınacak şekilde tasarlanmıştır. Anlatmaya değer bir deneyime hazır olun.",
        addToFavorites: "Favorilere eklendi.",
        removeFromFavorites: "Favorilerden çıkarıldı.",
    },
    ru: {
        title: "Предложения, которые стоит попробовать",
        text: "В мире, полном возможностей и приключений, есть впечатления, которые нельзя пропустить. Впечатления, которые отвлекают вас от повседневной рутины и открывают новые двери для открытия себя и окружающего мира. Независимо от того, ищете ли вы приключение, наполненное адреналином, или момент спокойствия, освежающий вашу душу, эти впечатления предназначены для того, чтобы навсегда остаться в вашей памяти. Приготовьтесь к опыту, достойному рассказа.",
        addToFavorites: "Добавлено в избранное.",
        removeFromFavorites: "Удалено из избранного.",
    },
    zh: {
        title: "值得尝试的优惠",
        text: "在一个充满机会和冒险的世界里，有一些体验是不能错过的。它们带你摆脱日常的束缚，开启发现自我和探索世界的新大门。无论你是在寻找一次让肾上腺素飙升的冒险，还是一段让心灵焕然一新的宁静时光，这些体验都将永远铭刻在你的记忆中。准备好迎接一次值得诉说的经历吧。",
        addToFavorites: "已添加到收藏夹。",
        removeFromFavorites: "已从收藏夹移除。",
    },
    ko: {
        title: "시도해 볼 만한 제안",
        text: "기회와 모험으로 가득한 세상에는 놓쳐서는 안 될 경험들이 있습니다. 일상에서 벗어나 자신과 주변 세계를 발견할 수 있는 새로운 문을 여는 경험들. 아드레날린이 솟구치는 모험을 찾든, 영혼을 새롭게 해주는 평온한 순간을 찾든, 이 경험들은 영원히 기억에 남도록 설계되었습니다. 이야기할 가치가 있는 경험을 준비하세요.",
        addToFavorites: "즐겨찾기에 추가되었습니다.",
        removeFromFavorites: "즐겨찾기에서 제거되었습니다.",
    },
    pt: {
        title: "Ofertas que valem a pena experimentar",
        text: "Em um mundo cheio de oportunidades e aventuras, existem experiências que não podem ser perdidas. Experiências que o afastam da sua rotina diária, abrindo novas portas para descobrir a si mesmo e o mundo ao seu redor. Seja procurando uma aventura cheia de adrenalina ou um momento de calma que refresque sua alma, essas experiências foram feitas para permanecer gravadas na sua memória para sempre. Prepare-se para uma experiência que vale a pena contar.",
        addToFavorites: "Adicionado aos favoritos.",
        removeFromFavorites: "Removido dos favoritos.",
    },
    ur: {
        title: "آزمائش کے قابل پیشکشیں",
        text: "مواقع اور مہم جوئیوں سے بھری دنیا میں کچھ تجربات ایسے ہوتے ہیں جنہیں نظرانداز نہیں کیا جا سکتا۔ ایسے تجربات جو آپ کو روزمرہ کی روٹین سے نکال کر خود کو اور اپنے اردگرد کی دنیا کو دریافت کرنے کے نئے دروازے کھولتے ہیں۔ چاہے آپ ایک ایڈونچر چاہتے ہوں جو ایڈرینالین بڑھا دے یا سکون کا لمحہ جو آپ کی روح کو تازگی دے، یہ تجربات ہمیشہ آپ کی یادوں میں نقش رہیں گے۔ ایک ایسی تجربے کے لیے تیار ہو جائیں جسے سنانے کے قابل ہو۔",
        addToFavorites: "پسندیدہ میں شامل کر دیا گیا۔",
        removeFromFavorites: "پسندیدہ سے ہٹا دیا گیا۔",
    },
    ja: {
        title: "試す価値のあるオファー",
        text: "チャンスと冒険に満ちた世界には、見逃せない体験があります。日常から離れ、自分自身や周囲の世界を発見する新たな扉を開く体験です。アドレナリンが湧き上がる冒険を求めているのか、心をリフレッシュさせる静かな瞬間を求めているのかに関わらず、これらの体験は永遠に記憶に刻まれるように設計されています。語るに値する体験の準備をしましょう。",
        addToFavorites: "お気に入りに追加しました。",
        removeFromFavorites: "お気に入りから削除しました。",
    },
};

const OneOffer = ({ offer }) => {

    const offerData = Array.isArray(offer) ? offer : [];

    const { currentLanguage } = useLanguage(); // Get the selected language from context
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 5; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(offer.length / perPage);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * perPage;
    const currentPageData = offer.slice(offset, offset + perPage);

    // Auth
    const [showLogin, setShowLogin] = useState(false); // Show/Hide AuthForm modal
    const handleShowLogin = () => {
        setShowLogin(true);
    };
    const hideLogin = () => {
        setShowLogin(false);
    };
    const handleLinkClick = (e) => {
        if (!isAuthenticated()) {
            e.preventDefault();
            handleShowLogin(); // Open login form if not authenticated
        }
    };



    const { title, text } = content[currentLanguage];

    // handling link page
    const getLink = (item) => {
        if (item.type === 'trip' && item.trip_id > 0) return `/tripsPage/${item.trip_id}`;
        if (item.type === 'gift' && item.gift_id > 0) return `/gifts/${item.gift_id}`;
        if (item.type === 'effectiveness' && item.effectiveness_id > 0) return `/eventsPage/${item.effectiveness_id}`;
        return "/notfound";
    };
    return (
        offerData.length > 0 &&
        <div className="cards-collections padding-top">
            <FormAuth showModalForm={showLogin} hideModalForm={hideLogin} />

            {/* ============== START TITLE SECTION ============ */}
            <TitleSection title={title} text={text} />
            {/* ============== END TITLE SECTION ============ */}

            {/* ============ START ALL CARDS COLLECTION ============ */}
            <div className="all-cards-collection" data-aos="fade-up">
                <div className="row g-3 justify-content-center">
                    {currentPageData.map((item) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 most-visited" key={item.id}>
                            <Link to={getLink(item)} onClick={handleLinkClick}>
                                <OneOfferCard
                                    imageCard={item.photo || backUP}
                                    titleCard={item.title || "No title available"}
                                    description={item.description || "No description available"}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
                {offer.length > 0 && pageCount > 1 && (
                    <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
                )}
            </div>
        </div>
    )
}

export default OneOffer