import GeneralAPI from "api/generalApi";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./NewsDetails.css";
import Loader from "Components/Auth/Components/Loader/Loader";
import InfoNewsDetails from "Pages/News/Components/NewsDetails/BannerDetails/InfoNewsDetails";
import BannerDetails from "./BannerDetails";

const ArticalsDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    // Fetch data using React Query
    const {
        data: articleDetailsCard,
        isPending: loading,
        error
    } = useQuery({
        queryKey: ['articleDetails', id, currentLanguage],
        queryFn: async () => {
            const response = await GeneralAPI.getArticleDetails(id, currentLanguage);
            if (!response.data) throw new Error("Article not found");
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
        retry: false,
    });

    // Display loading state
    if (loading) {
        return (
            <div style={{ margin: "200px 0px" }}>
                <Loader />
            </div>
        );
    }
    // Display error state
    if (error) {
        return <div>{error.message || "Failed to load data"}</div>;
    }
    return (
        <>
            <HelmetInfo titlePage={articleDetailsCard.title} description={articleDetailsCard.description} image={articleDetailsCard.photo} url={`articals/${id}`} />

            <div className="details-news-card">
                {/* ========== START SLIDER DETIALS NEWS ============ */}
                <div className="slider-details-news">
                    <BannerDetails img={articleDetailsCard.photo} />
                </div>
                {/* ========== END SLIDER DETIALS NEWS ============ */}
                {/* ========== START CONTAINER ============= */}
                <ContainerMedia>
                    <InfoNewsDetails newsDetailsCard={articleDetailsCard} />
                </ContainerMedia>
                {/* ========== END CONTAINER ============= */}
            </div>
        </>
    );
};

export default ArticalsDetails 