import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SliderEventCardDetails from "./Components/SliderEventCardDetails/SliderEventCardDetails";
import DetailsCardPage from "./Components/DetailsCardPage/DetailsCardPage";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import ContentAPI from "api/contentApi";
import Loader from "Components/Auth/Components/Loader/Loader";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import RatesComments from "Pages/DetailsTripInfoPage/Components/AllContentInfoDetailsMiddel/ContentInfoDetailsRight/RatesComments/RatesComments";

const text = {
  ar: {
    notFound: "هذه الفعالية غير متوافرة",
    notAvailable: "تفاصيل الفعالية غير متوافرة",
    home: "الصفحة الرئيسية",
    title: "تفاصيل الفعاليات",
    titleTwoBread: "فعاليات",
    textBreadActive: "تفاصيل الفعالية",
  },
  en: {
    notFound: "This event is not available",
    notAvailable: "Event details not available",
    home: "Home",
    title: "Event Details",
    titleTwoBread: "Events",
    textBreadActive: "Event Details",
  },
  fr: {
    notFound: "Cet événement n'est pas disponible",
    notAvailable: "Détails de l'événement non disponibles",
    home: "Accueil",
    title: "Détails de l'événement",
    titleTwoBread: "Événements",
    textBreadActive: "Détails de l'événement",
  },
  de: {
    notFound: "Diese Veranstaltung ist nicht verfügbar",
    notAvailable: "Veranstaltungsdetails nicht verfügbar",
    home: "Startseite",
    title: "Veranstaltungsdetails",
    titleTwoBread: "Veranstaltungen",
    textBreadActive: "Veranstaltungsdetails",
  },
  es: {
    notFound: "Este evento no está disponible",
    notAvailable: "Detalles del evento no disponibles",
    home: "Inicio",
    title: "Detalles del evento",
    titleTwoBread: "Eventos",
    textBreadActive: "Detalles del evento",
  },
  tr: {
    notFound: "Bu etkinlik mevcut değil",
    notAvailable: "Etkinlik detayları mevcut değil",
    home: "Ana Sayfa",
    title: "Etkinlik Detayları",
    titleTwoBread: "Etkinlikler",
    textBreadActive: "Etkinlik Detayları",
  },
  ru: {
    notFound: "Это событие недоступно",
    notAvailable: "Детали события недоступны",
    home: "Главная",
    title: "Детали события",
    titleTwoBread: "События",
    textBreadActive: "Детали события",
  },
  zh: {
    notFound: "该活动不可用",
    notAvailable: "活动详情不可用",
    home: "主页",
    title: "活动详情",
    titleTwoBread: "活动",
    textBreadActive: "活动详情",
  },
  ko: {
    notFound: "이 이벤트는 사용할 수 없습니다",
    notAvailable: "이벤트 세부 정보를 사용할 수 없습니다",
    home: "홈",
    title: "이벤트 세부 정보",
    titleTwoBread: "이벤트",
    textBreadActive: "이벤트 세부 정보",
  },
  pt: {
    notFound: "Este evento não está disponível",
    notAvailable: "Detalhes do evento não disponíveis",
    home: "Início",
    title: "Detalhes do evento",
    titleTwoBread: "Eventos",
    textBreadActive: "Detalhes do evento",
  },
  ur: {
    notFound: "یہ ایونٹ دستیاب نہیں ہے",
    notAvailable: "ایونٹ کی تفصیلات دستیاب نہیں ہیں",
    home: "ہوم",
    title: "ایونٹ کی تفصیلات",
    titleTwoBread: "ایونٹس",
    textBreadActive: "ایونٹ کی تفصیلات",
  },
  ja: {
    notFound: "このイベントは利用できません",
    notAvailable: "イベントの詳細は利用できません",
    home: "ホーム",
    title: "イベントの詳細",
    titleTwoBread: "イベント",
    textBreadActive: "イベントの詳細",
  },
};



const DetailsCardEvent = () => {
  // Extract the `id` from the URL
  const { id } = useParams();
  // currency
  const { currentCurrency } = useCurrency(); // Get the current currency
  // language
  const { currentLanguage } = useLanguage(); // Get the current language
  // states
  // fetching Data using React Query
  const {
    data: effective,
    isPending: loading,
    error
  } = useQuery({
    queryKey: ['eventDetails', id, currentLanguage, currentCurrency],
    queryFn: async () => {
      const response = await ContentAPI.getEffectivenessById(id, currentLanguage, currentCurrency);
      if (!response.data) throw new Error("Effective not found");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    retry: false, // Don't retry if not found
  });

  if (loading) {
    return (
      <div style={{ margin: "200px 0px" }}>
        <Loader />
      </div>
    );
  }


  if (!effective) {
    return <>
      <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found vh-100 align-content-center d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
        {text[currentLanguage].notFound}
        <Link
          to="/"
          className="fs-6 fw-medium text-danger text-decoration-underline px-2"
        >
          {text[currentLanguage].home}
        </Link>
      </p>
    </>;
  }

  if (error) {
    return <>
      <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found vh-100 align-content-center d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
        {text[currentLanguage].notAvailable}
        <Link
          to="/"
          className="fs-6 fw-medium text-danger text-decoration-underline px-2"
        >
          {text[currentLanguage].home}
        </Link>
      </p>
    </>;
  }

  return (
    <>
      <HelmetInfo type="event" data={effective} titlePage={effective.title} description={effective.description} image={effective.attachments[0]} url={`eventsPage/${id}`} />
      <div className="details-trip-info-page padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
            routeTitleTwoBread={"/eventsPage"}
            titleTwoBread={text[currentLanguage].titleTwoBread}
            textBreadActive={text[currentLanguage].textBreadActive}
          />
        </header>
        <main>
          <div className="details-card-event-page pt-3">
            {/* =========== START DETAILS CARD EVENT DETAILS ============= */}
            {/* <SliderEventCardDetails image={effective} /> */}
            {/* =========== END DETAILS CARD EVENT DETAILS ============= */}
            {/* =========== START CONTAINER ============ */}
            <ContainerMedia>
              <DetailsCardPage effective={effective} />
              <RatesComments modelId={effective.id} modelType={"effectivenes"} />
            </ContainerMedia>
            {/* =========== END CONTAINER ============ */}
          </div>
        </main>
      </div>
    </>
  );
};

export default DetailsCardEvent;
