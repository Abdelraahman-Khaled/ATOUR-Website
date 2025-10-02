import TabsContent from "Components/Ui/TabsContent/TabsContent";
import Tree from "assets/images/IconsHeader/Tree";
import AllCardsReservations from "./AllCardsReservations/AllCardsReservations";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import { useEffect, useState } from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import BookingAPI from "api/bookingApi";
import Ticket from "assets/images/IconsHeader/Ticket";
import Gift from "assets/images/IconsHeader/Gift";
import Loader from "Components/Auth/Components/Loader/Loader";
import AllCardsResrvationsEffective from "./AllCardsReservations/Effectivenes/AllCardsResrvationsEffective";
import AllCardsResrvationsGift from "./AllCardsReservations/Gifts/AllCardsResrvationsGift";
import { useCurrency } from "Components/Currencies/CurrencyContext";

const TabsReservations = () => {
  const { currentLanguage } = useLanguage();
  const { currentCurrency } = useCurrency();

  // 🔹 Translations
  const content = {
    ar: {
      current: "الحالية",
      completed: "المكتملة",
      ended: "ملغية",
      rejected: "مرفوضة",
      experiences: "جَوْلات",
      events: "فعاليات",
      products: "منتجات",
    },
    en: {
      current: "Current",
      completed: "Completed",
      ended: "Canceled",
      rejected: "Rejected",
      experiences: "Experiences",
      events: "Events",
      products: "Products",
    },
    fr: {
      current: "En cours",
      completed: "Terminées",
      ended: "Annulées",
      rejected: "Rejetées",
      experiences: "Expériences",
      events: "Événements",
      products: "Produits",
    },
    de: {
      current: "Aktuell",
      completed: "Abgeschlossen",
      ended: "Storniert",
      rejected: "Abgelehnt",
      experiences: "Erlebnisse",
      events: "Veranstaltungen",
      products: "Produkte",
    },
    es: {
      current: "Actuales",
      completed: "Completadas",
      ended: "Canceladas",
      rejected: "Rechazadas",
      experiences: "Experiencias",
      events: "Eventos",
      products: "Productos",
    },
    tr: {
      current: "Güncel",
      completed: "Tamamlandı",
      ended: "İptal edildi",
      rejected: "Reddedildi",
      experiences: "Deneyimler",
      events: "Etkinlikler",
      products: "Ürünler",
    },
    ru: {
      current: "Текущие",
      completed: "Завершённые",
      ended: "Отменённые",
      rejected: "Отклонённые",
      experiences: "Впечатления",
      events: "События",
      products: "Продукты",
    },
    zh: {
      current: "当前",
      completed: "已完成",
      ended: "已取消",
      rejected: "已拒绝",
      experiences: "体验",
      events: "活动",
      products: "产品",
    },
    ko: {
      current: "현재",
      completed: "완료됨",
      ended: "취소됨",
      rejected: "거부됨",
      experiences: "체험",
      events: "이벤트",
      products: "제품",
    },
    pt: {
      current: "Atuais",
      completed: "Concluídas",
      ended: "Canceladas",
      rejected: "Rejeitadas",
      experiences: "Experiências",
      events: "Eventos",
      products: "Produtos",
    },
    ur: {
      current: "موجودہ",
      completed: "مکمل شدہ",
      ended: "منسوخ شدہ",
      rejected: "رد کردہ",
      experiences: "تجربات",
      events: "تقریبات",
      products: "مصنوعات",
    },
    ja: {
      current: "現在",
      completed: "完了",
      ended: "キャンセル",
      rejected: "拒否",
      experiences: "体験",
      events: "イベント",
      products: "製品",
    },
  };

  // State for buttons
  const [tabs_1, setTabs_1] = useState([
    { id: 1, key: "current", active: true },
    { id: 2, key: "completed", active: false },
    { id: 3, key: "ended", active: false },
    { id: 4, key: "rejected", active: false },
  ]);

  const handleTabClick = (id) => {
    setTabs_1(
      tabs_1.map((tab) => ({
        ...tab,
        active: tab.id === id,
      }))
    );
  };

  // Reservation states
  const [curren, setCurrent] = useState({ gifts: [], effectivenes: [], trips: [] });
  const [compleated, setCompleted] = useState({ gifts: [], effectivenes: [], trips: [] });
  const [ended, setEnded] = useState({ gifts: [], effectivenes: [], trips: [] });
  const [rejected, setRejected] = useState({ gifts: [], effectivenes: [], trips: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh((prev) => !prev);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await BookingAPI.getBookings(currentLanguage, currentCurrency);
        if (data && data.data) {
          setCurrent(data.data.curren || { gifts: [], effectivenes: [], trips: [] });
          setCompleted(data.data.compleated || { gifts: [], effectivenes: [], trips: [] });
          setEnded(data.data.ended || { gifts: [], effectivenes: [], trips: [] });
          setRejected(data.data.rejected || { gifts: [], effectivenes: [], trips: [] });
        }
      } catch (err) {
        setError("Failed to load reservation data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentLanguage, refresh, currentCurrency]);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  const getActiveTabData = () => {
    if (tabs_1[0].active) return curren;
    if (tabs_1[1].active) return compleated;
    if (tabs_1[2].active) return ended;
    if (tabs_1[3].active) return rejected;
    return curren;
  };

  const activeData = getActiveTabData();

  const tabsData = [
    {
      eventKey: "tab1",
      title: (
        <>
          <Tree /> {content[currentLanguage]?.experiences}
        </>
      ),
      content: (
        <AllCardsReservations
          reservation={activeData.trips || []}
          refresh={handleRefresh}
        />
      ),
    },
    {
      eventKey: "tab2",
      title: (
        <>
          <Ticket /> {content[currentLanguage]?.events}
        </>
      ),
      content: (
        <AllCardsResrvationsEffective
          reservation={activeData.effectivenes || []}
          refresh={handleRefresh}
        />
      ),
    },
    {
      eventKey: "tab3",
      title: (
        <>
          <Gift /> {content[currentLanguage]?.products}
        </>
      ),
      content: (
        <AllCardsResrvationsGift
          reservation={activeData.gifts || []}
          refresh={handleRefresh}
        />
      ),
    },
  ];

  return (
    <div className="all-tabs-reservation padding-80">
      <ContainerMedia>
        <div className="all-tabs-reservation-info" data-aos="fade-right">
          <ul
            className="nav nav-content--2 nav-pills gap-3 flex-wrap nav-pills border-account-user h-100"
            id="pills-tab"
            role="tablist"
          >
            {tabs_1.map((tab) => (
              <li key={tab.id} className="nav-item nav-item-info" role="presentation">
                <button
                  className={`nav-link main-btn-filter--1 ${tab.active ? "active" : ""} position-relative`}
                  id={`pills-${tab.key}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-${tab.key}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-${tab.key}`}
                  aria-selected={tab.active ? "true" : "false"}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {content[currentLanguage]?.[tab.key]}
                </button>
              </li>
            ))}
          </ul>

          {/* Tabs content */}
          <div className="tab-content w-100 border-account-user h-100" id="pills-tabContent">
            {tabs_1.map((tab) => (
              <div
                key={tab.id}
                className={`tab-pane fade ${tab.active ? "show active" : ""}`}
                id={`pills-${tab.key}`}
                role="tabpanel"
                aria-labelledby={`pills-${tab.key}-tab`}
              >
                <TabsContent
                  tabsData={tabsData}
                  newClassTabsContent={"tabs-reservations-content-1"}
                />
              </div>
            ))}
          </div>
        </div>
      </ContainerMedia>
    </div>
  );
};

export default TabsReservations;
