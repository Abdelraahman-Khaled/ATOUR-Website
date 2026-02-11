 import SliderEvents from "./Components/SliderEvents/SliderEvents";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import "./Events.css";
import AllCardsEvents from "./Components/AllCardsEvents/AllCardsEvents";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContentAPI from "api/contentApi";
import Loader from "Components/Auth/Components/Loader/Loader";
import { toast } from "react-toastify";
import { useCurrency } from "Components/Currencies/CurrencyContext";


const translate = {
  ar: {
    title: "فعاليات",
  },
  en: {
    title: "Events",
  },
  fr: {
    title: "Événements",
  },
  es: {
    title: "Eventos",
  },
  de: {
    title: "Veranstaltungen",
  },
  it: {
    title: "Eventi",
  },
  ru: {
    title: "События",
  },
  zh: {
    title: "活动",
  },
  ja: {
    title: "イベント",
  },
  ko: {
    title: "이벤트",
  },
  pt: {
    title: "Eventos",
  },
  tr: {
    title: "Etkinlikler",
  }
}
const Events = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const { currentCurrency } = useCurrency()
  // Fetch Events Data using React Query
  const {
    data: eventsData = [],
    isPending: loading,
    error
  } = useQuery({
    queryKey: ['eventsData', currentLanguage, currentCurrency],
    queryFn: async () => {
      const data = await ContentAPI.getEffectiveness(currentLanguage, currentCurrency);

      return data.data.map((item) => {
        // Assign categories dynamically
        const now = new Date();
        const eventDate = item.from_date ? new Date(item.from_date) : new Date();
        let category = "*";

        if (eventDate >= now && eventDate <= new Date(now.setDate(now.getDate() + 7))) {
          category = "category1"; // This week
        } else if (eventDate.getMonth() === new Date().getMonth() && eventDate.getFullYear() === new Date().getFullYear()) {
          category = "category2"; // This month
        } else if (eventDate.getFullYear() === new Date().getFullYear()) {
          category = "category3"; // This year
        } else {
          category = "other"; // Other
        }

        return { ...item, category, from_date: eventDate.toISOString().split("T")[0] };
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });

  // normalize images
  const normalizeData = (data) => {
    return data.map((item) => ({
      ...item,
      image: item.photo || item.cover, // Use `photo` or `cover` as `image`
    }));
  };
  const normalizedData = normalizeData(eventsData);

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return null; // No need to display error here, toast will handle it
  }

  return (
    <>
      <HelmetInfo titlePage={translate[currentLanguage].title} />

      <div className="events-page">
        <header>
          {/* =========== START SLIDER CONTENT ========== */}
          {/* <SliderEvents currentLanguage={currentLanguage} /> */}
          {/* =========== START SLIDER CONTENT ========== */}
        </header>
        <main>
          <ContainerMedia>
            <AllCardsEvents currentLanguage={currentLanguage} eventsData={normalizedData} />
          </ContainerMedia>
        </main>
      </div>
    </>
  );
};

export default Events;
