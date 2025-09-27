import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import useTranslation from "Components/Languages/useTranslation";
import SliderReservations from "./Components/SliderReservations";
import TabsReservations from "./Components/TabsReservations";
import "./Reservations.css";

const Reservations = () => {
  const { t } = useTranslation();
  return (
    <>
      <HelmetInfo titlePage={t("common.reservations")} />

      <div className="reservations-page">
        <header>
          {/* ============ START RESERVATIONS SLIDER =============== */}
          {/* <SliderReservations /> */}
          {/* ============ END RESERVATIONS SLIDER =============== */}
        </header>
        <main>
          <TabsReservations />
        </main>
      </div>
    </>
  );
};

export default Reservations;
