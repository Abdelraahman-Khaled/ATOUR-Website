import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLanguage } from "Components/Languages/LanguageContext";
import TooltipExample from "Components/Ui/Tooltip";
import React from "react";

const translations = {
    title: {
        ar: "متطلبات الجولة",
        en: "Trip Requirements",
        fr: "Exigences du voyage",
        de: "Reiseanforde­rungen",
        es: "Requisitos del viaje",
        tr: "Gezi Gereksinimleri",
        ru: "Требования к поездке",
        zh: "旅行要求",
        ko: "여행 요구 사항",
        pt: "Requisitos da viagem",
        ur: "سفر کی ضروریات",
        ja: "旅行の要件",
    },
    description: {
        ar: "هذه المتطلبات عليك توفيرها لتجربة أفضل",
        en: "These requirements should be provided for a better experience",
        fr: "Ces exigences doivent être respectées pour une meilleure expérience",
        de: "Diese Anforderungen sollten für ein besseres Erlebnis erfüllt werden",
        es: "Estos requisitos deben cumplirse para una mejor experiencia",
        tr: "Daha iyi bir deneyim için bu gereksinimler sağlanmalıdır",
        ru: "Эти требования необходимо выполнить для лучшего опыта",
        zh: "为获得更好的体验，请满足这些要求",
        ko: "더 나은 경험을 위해 이러한 요구 사항을 충족해야 합니다",
        pt: "Estes requisitos devem ser atendidos para uma melhor experiência",
        ur: "بہتر تجربے کے لیے یہ تقاضے پورے کرنے چاہئیں",
        ja: "より良い体験のためにこれらの要件を満たす必要があります",
    },
    noRequirements: {
        ar: "لا توجد متطلبات مضافة لهذه الرحلة.",
        en: "No requirements added for this trip.",
        fr: "Aucune exigence ajoutée pour ce voyage.",
        de: "Keine Anforderungen für diese Reise hinzugefügt.",
        es: "No se añadieron requisitos para este viaje.",
        tr: "Bu gezi için gereksinim eklenmedi.",
        ru: "Для этой поездки не добавлено требований.",
        zh: "此行程没有添加任何要求。",
        ko: "이 여행에는 추가된 요구 사항이 없습니다.",
        pt: "Nenhum requisito adicionado para esta viagem.",
        ur: "اس سفر کے لیے کوئی تقاضے شامل نہیں کیے گئے۔",
        ja: "この旅行には追加された要件はありません。",
    },
};

const TripRequirement = ({ tripData }) => {
    const { currentLanguage } = useLanguage();
    const services = tripData.trip_requirements || [];

    return (
        <div className="why-booking-trip pt-3 margin-top-1">
            <div className="d-flex gap-2">
                <h2 className="title">{translations.title[currentLanguage]}</h2>
                <TooltipExample title={translations.description[currentLanguage]} />
            </div>

            <div className="list-content-info d-flex align-items-center gap-5 flex-wrap mt-4">
                <ul className="list-one-info p-0 m-0 d-flex flex-column gap-3">
                    {services.length > 0 ? (
                        services.map((requirement, index) => (
                            <li
                                key={index}
                                className="text-title--1 d-flex align-items-center gap-2"
                            >
                                <div className="icon-times icon-check-link">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                {requirement.title}
                            </li>
                        ))
                    ) : (
                        <p className="text-muted">
                            {translations.noRequirements[currentLanguage]}
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TripRequirement;
