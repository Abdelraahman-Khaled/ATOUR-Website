import React from 'react';
import './TripsPageSkeleton.css';

const TripCardSkeleton = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-box card-image"></div>
            <div className="card-info">
                <div>
                    <div className="skeleton-box card-location"></div>
                    <div className="skeleton-box card-title"></div>
                    <div className="skeleton-box card-desc"></div>
                    <div className="skeleton-box card-desc" style={{ width: '70%' }}></div>
                </div>
                <div>
                    <div className="skeleton-box card-rating"></div>
                    <div className="skeleton-box card-price"></div>
                </div>
            </div>
        </div>
    );
};

const FilterSkeleton = () => {
    return (
        <div className="skeleton-filter">
            <div className="skeleton-box filter-title"></div>
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="skeleton-box filter-item"></div>
            ))}
            <div className="skeleton-box filter-title" style={{ marginTop: '20px' }}></div>
            {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-box filter-item"></div>
            ))}
        </div>
    );
};

const TripsPageSkeleton = () => {
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-content-grid">
                {/* Left Side - Filters */}
                <div className="skeleton-left">
                    <FilterSkeleton />
                </div>

                {/* Right Side - Cards */}
                <div className="skeleton-cards-container">
                    {[1, 2, 3, 4].map((index) => (
                        <TripCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const EventCardSkeleton = () => {
    return (
        <div className="skeleton-card-event">
            <div className="skeleton-box card-date-box"></div>
            <div className="skeleton-box card-image"></div>
            <div className="card-info">
                <div>
                    <div className="header-top-card d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
                        <div className="skeleton-box card-title" style={{ width: '40%', marginBottom: 0 }}></div>
                        <div className="skeleton-box card-rating" style={{ width: '20%', marginTop: 0 }}></div>
                    </div>
                    <div className="skeleton-box card-desc" style={{ marginBottom: '15px' }}></div>
                    <div className="d-flex align-items-center gap-3 justify-content-between">
                        <div className="skeleton-box card-desc" style={{ width: '60%', marginBottom: 0 }}></div>
                        <div className="skeleton-box card-price" style={{ width: '100px', height: '40px', borderRadius: '50px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EventsPageSkeleton = () => {
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-content-grid">
                {/* Left Side - Filters */}
                <div className="skeleton-left">
                    <FilterSkeleton />
                </div>

                {/* Right Side - Cards */}
                <div className="skeleton-cards-container">
                    {[1, 2, 3, 4].map((index) => (
                        <EventCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripsPageSkeleton;
