import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "Components/Languages/LanguageContext";
import ContentAPI from "api/contentApi";
import SliderEventCardDetails from "Pages/Events/Components/DetailsCardEvent/Components/SliderEventCardDetails/SliderEventCardDetails";
import GiftCardDetails from "./GiftCardDetails/GiftCardDetails";
import Loader from "Components/Auth/Components/Loader/Loader";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import BreadcrumbsPage from "../BreadcrumbsPage/BreadcrumbsPage";
import RatesComments from "Pages/DetailsTripInfoPage/Components/AllContentInfoDetailsMiddel/ContentInfoDetailsRight/RatesComments/RatesComments";

const content = {
    notFound: {
        en: "This gift is not available",
        ar: "هذه الهدية غير متوافرة",
        fr: "Ce cadeau n'est pas disponible",
        de: "Dieses Geschenk ist nicht verfügbar",
        es: "Este regalo no está disponible",
        tr: "Bu hediye mevcut değil",
        ru: "Этот подарок недоступен",
        zh: "此礼物不可用",
        ko: "이 선물은 사용할 수 없습니다",
        pt: "Este presente não está disponível",
        ur: "یہ تحفہ دستیاب نہیں ہے",
        ja: "このギフトは利用できません",
    },
    home: {
        en: "Home",
        ar: "الصفحة الرئيسية",
        fr: "Accueil",
        de: "Startseite",
        es: "Inicio",
        tr: "Ana Sayfa",
        ru: "Главная",
        zh: "主页",
        ko: "홈",
        pt: "Início",
        ur: "ہوم",
        ja: "ホーム",
    },
    breadcrumbs: {
        products: {
            en: "Products",
            ar: "المنتجات",
            fr: "Produits",
            de: "Produkte",
            es: "Productos",
            tr: "Ürünler",
            ru: "Продукты",
            zh: "产品",
            ko: "제품",
            pt: "Produtos",
            ur: "مصنوعات",
            ja: "製品",
        },
        details: {
            en: "Product Details",
            ar: "تفاصيل المنتج",
            fr: "Détails du produit",
            de: "Produktdetails",
            es: "Detalles del producto",
            tr: "Ürün Detayları",
            ru: "Подробности о продукте",
            zh: "产品详情",
            ko: "제품 세부 정보",
            pt: "Detalhes do Produto",
            ur: "پروڈکٹ کی تفصیلات",
            ja: "製品の詳細",
        },
    },
    helmet: {
        en: "Gift Details",
        ar: "تفاصيل الهدايا",
        fr: "Détails du cadeau",
        de: "Geschenkdetails",
        es: "Detalles del regalo",
        tr: "Hediye Detayları",
        ru: "Детали подарка",
        zh: "礼物详情",
        ko: "선물 세부 정보",
        pt: "Detalhes do Presente",
        ur: "تحفہ کی تفصیلات",
        ja: "ギフトの詳細",
    },
};


const GiftDetail = () => {
    // Extract the `id` from the URL
    const { id } = useParams();
    // language
    const { currentLanguage } = useLanguage(); // Get the current language
    const { currentCurrency } = useCurrency()
    // states
    // fetching Data using React Query
    const {
        data: gift,
        isPending: loading,
        error
    } = useQuery({
        queryKey: ['giftDetails', id, currentLanguage, currentCurrency],
        queryFn: async () => {
            const response = await ContentAPI.getGiftById(id, currentLanguage, currentCurrency);
            const data = response.data;
            if (!data) throw new Error("Gift not found");
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (loading) {
        return (
            <div style={{ margin: "200px 0px" }}>
                <Loader />
            </div>
        );
    }


    if (error) {
        return <>
            <p className="text-section-api fs-6 fw-medium text-center pt-5 dakr-not-found vh-100 align-content-center d-flex align-items-center justify-content-center " style={{ height: "350px" }}>
                {content.notFound[currentLanguage]}
                <Link
                    to="/"
                    className="fs-6 fw-medium text-danger text-decoration-underline px-2"
                >
                    {content.home[currentLanguage]}
                </Link>
            </p>
        </>;
        ; // Display error message if fetching fails
    }

    return (
        <>
            <HelmetInfo data={gift} type="product" titlePage={gift.title} description={gift.description} url={"gifts/" + gift.id} image={gift.cover} />
            <div className="details-trip-info-page padding-60">

                <header>
                    <BreadcrumbsPage
                        newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                        routeTitleTwoBread={"/offers"}
                        titleTwoBread={content.breadcrumbs.products[currentLanguage]}
                        textBreadActive={content.breadcrumbs.details[currentLanguage]}
                    />
                </header>
                <div className="details-card-event-page">
                    {/* =========== START DETAILS CARD EVENT DETAILS ============= */}
                    {/* <SliderEventCardDetails image={gift} /> */}
                    {/* =========== END DETAILS CARD EVENT DETAILS ============= */}
                    {/* =========== START CONTAINER ============ */}
                    <ContainerMedia>
                        <GiftCardDetails gift={gift} />
                        <RatesComments modelId={gift.id} modelType={"gift"} />

                    </ContainerMedia>
                    {/* =========== END CONTAINER ============ */}
                </div>
            </div>
        </>
    );
};

export default GiftDetail;
