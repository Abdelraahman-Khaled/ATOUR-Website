import CustomModal from "Components/CustomModal/CustomModal";
import { useLanguage } from "Components/Languages/LanguageContext";
import CounterUpDown from "Components/Ui/CounterUpDown/CounterUpDown";
import { useState } from "react";
import { useBooking } from "context/BookingContext";


// Translations for all supported languages
const translations = {
  ar: {
    title: "عدد الأفراد",
    adults: "عدد الأفراد",
    save: "حفظ",
  },
  en: {
    title: "Number of Individuals",
    adults: "Number of Adults",
    save: "Save",
  },
  fr: {
    title: "Nombre d'individus",
    adults: "Nombre d'adultes",
    save: "Enregistrer",
  },
  de: {
    title: "Anzahl der Personen",
    adults: "Anzahl der Erwachsenen",
    save: "Speichern",
  },
  es: {
    title: "Número de individuos",
    adults: "Número de adultos",
    save: "Guardar",
  },
  tr: {
    title: "Kişi sayısı",
    adults: "Yetişkin sayısı",
    save: "Kaydet",
  },
  ru: {
    title: "Количество человек",
    adults: "Количество взрослых",
    save: "Сохранить",
  },
  zh: {
    title: "人数",
    adults: "成人人数",
    save: "保存",
  },
  ko: {
    title: "인원 수",
    adults: "성인 수",
    save: "저장",
  },
  pt: {
    title: "Número de pessoas",
    adults: "Número de adultos",
    save: "Salvar",
  },
  ur: {
    title: "افراد کی تعداد",
    adults: "بالغوں کی تعداد",
    save: "محفوظ کریں",
  },
  ja: {
    title: "人数",
    adults: "大人の人数",
    save: "保存",
  },
};

const ModalNumberIndividuals = ({
  showModalNumberIndividuals,
  hideModalNumberIndividuals,
  tripData,
}) => {
  const { numberOfPeople, setNumberOfPeople } = useBooking();
  const { currentLanguage } = useLanguage();

  // Select translations based on current language, fallback to English
  const t = translations[currentLanguage] || translations.en;

  const isMaxReached = numberOfPeople >= tripData.max_people;

  const handleSave = () => {
    hideModalNumberIndividuals(); // Close the modal after saving
  };

  return (
    <CustomModal
      show={showModalNumberIndividuals}
      onHide={hideModalNumberIndividuals}
      title={t.title}
      newClass={"modal-number-individuals"}
    >
      <div className="all-content-number-individuals d-flex justify-content-center flex-column gap-3 align-items-center">
        {/* Adults Counter */}
        <div className="content-number-one d-flex align-items-center gap-3 flex-column">
          <h2 className="title">{t.adults}</h2>
          <CounterUpDown
            initialValue={numberOfPeople}
            minValue={tripData.min_people}
            maxValue={tripData.max_people}
            onChange={setNumberOfPeople}
            disablePlus={isMaxReached}
          />
        </div>

        {/* Save Button */}
        <button className="btn-main w-100" onClick={handleSave}>
          {t.save}
        </button>
      </div>
    </CustomModal>
  );
};

export default ModalNumberIndividuals;
