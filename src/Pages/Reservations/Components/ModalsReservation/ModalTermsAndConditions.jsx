import CustomModal from "Components/CustomModal/CustomModal";
import React from "react";

const ModalTermsAndConditions = ({ showModal, hideModal, content, currentLanguage }) => {
  const text = {
    ar: { termsAndConditions: "الشروط والأحكام" },
    en: { termsAndConditions: "Terms and Conditions" },
    es: { termsAndConditions: "Términos y Condiciones" },
    fr: { termsAndConditions: "Conditions Générales" },
    de: { termsAndConditions: "Allgemeine Geschäftsbedingungen" },
    tr: { termsAndConditions: "Şartlar ve Koşullar" },
    ru: { termsAndConditions: "Условия и Положения" },
    zh: { termsAndConditions: "条款和条件" },
    ko: { termsAndConditions: "이용 약관" },
    pt: { termsAndConditions: "Termos e Condições" },
    ur: { termsAndConditions: "شرائط و ضوابط" },
    ja: { termsAndConditions: "利用規約" },
  };

  return (
    <CustomModal
      show={showModal}
      onHide={hideModal}
      title={text[currentLanguage].termsAndConditions}
      newClass={"modal-terms-and-conditions"}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </CustomModal>
  );
};

export default ModalTermsAndConditions;