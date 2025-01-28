import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import SliderReservations from "./Components/SliderReservations";
import TabsReservations from "./Components/TabsReservations";
import "./Reservations.css";

const Reservations = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "حجوزاتي" : "Reservations"} />

      <div className="reservations-page">
        <header>
          {/* ============ START RESERVATIONS SLIDER =============== */}
          <SliderReservations />
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
