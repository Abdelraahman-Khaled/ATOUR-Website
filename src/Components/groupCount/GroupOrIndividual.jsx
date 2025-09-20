import React from "react";
import { useLanguage } from "Components/Languages/LanguageContext";
import groupIndividualTranslations from "./groupIndividualTranslations";

const GroupOrIndividual = ({ isGroup }) => {
    const { currentLanguage } = useLanguage();

    const lang = groupIndividualTranslations[currentLanguage] || groupIndividualTranslations["en"];

    return (
        <span>
            {isGroup ? lang.group : lang.individual}
        </span>
    );
};

export default GroupOrIndividual;
