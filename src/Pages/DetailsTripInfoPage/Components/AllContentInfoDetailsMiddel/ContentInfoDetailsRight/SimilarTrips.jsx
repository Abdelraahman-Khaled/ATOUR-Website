import ContentAPI from 'api/contentApi';
import { useLanguage } from 'Components/Languages/LanguageContext';
import PaginationPage from 'Components/Pagination/Pagination';
import CardCollection from 'Components/Ui/CardCollection/CardCollection';
import TabsContent from 'Components/Ui/TabsContent/TabsContent'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const SimilarTrips = () => {
    const [similarTrips, setSimilarTrips] = useState(null); // State to store fetched data
    const [error, setError] = useState(null); // State to handle errors
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    useEffect(() => {
        const fetchTripData = async () => {
            try {
                const response = await ContentAPI.getSimilarTrips(id, currentLanguage); // Replace with your API call
                setSimilarTrips(response.data); // Store fetched data in state
            } catch (err) {
                console.error("Error fetching trip data:", err);
                setError("Failed to load trip data. Please try again later.");
            }
        };

        fetchTripData();
    }, [id, currentLanguage]);

    // Pagenation
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 3; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(similarTrips?.length / perPage);
    const offset = currentPage * perPage;
    const currentPageData = similarTrips?.slice(offset, offset + perPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Display if no data is available
    if (!similarTrips) {
        return <>
        </>
    }

    return (
        <div className="cards-trips-details margin-top-1">
            <h2 className="title">{currentLanguage === "ar" ? "رحلات مشابهة" : "Similar Trips"}</h2>
            <div className="all-cards-trips-details">
                {/* ============ START ALL CARDS COLLECTION ============ */}
                <div className="all-cards-collection">
                    {/* =========== START ROW =========== */}
                    <div className="row g-3">
                        {[...currentPageData].map((item) => (
                            <div className="col-12 col-sm-6 col-md-4" key={item.id}>
                                <CardCollection
                                    itemId={id}
                                    type="trip"
                                    imageCard={item.cover}
                                    infoPlaceCard={item.start_point}
                                    numRate={item.numRate}
                                    titleCard={item.title}
                                    numPriceCard={`${item.price}`}
                                    isFav={item.is_favourit}
                                />
                            </div>
                        ))}
                    </div>
                    {/* ============ END ROW =========== */}
                </div>
                {/* ============= END ALL CARDS COLLECTION ============= */}
            </div>
            {pageCount > 1 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />}
        </div>)
}

export default SimilarTrips