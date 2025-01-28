import BoxOneContent from "./BoxOneContent";
import CardsTripsDetails from "./CardsTripsDetails/CardsTripsDetails";
import "./ContentInfoRight.css";
import MapContentBox from "./MapContentBox";
import PicturesPreviousTrips from "./PicturesPreviousTrips";
import RatesComments from "./RatesComments/RatesComments";
import SliderDetailsContentRight from "./SliderDetailsContentRight";
import TextContent from "./TextContent";
import WhyBookingTrip from "./WhyBookingTrip";
const ContentInfoDetailsRight = ({ tripData }) => {
  return (
    <div className="all-content-info-details-right" data-aos="fade-left">
      <BoxOneContent tripData={tripData} />
      <SliderDetailsContentRight tripData={tripData} />
      <WhyBookingTrip tripData={tripData} />
      <MapContentBox tripData={tripData} />
      <TextContent />
      {/* <RatesComments /> */}
      {/* <PicturesPreviousTrips /> */}
      {/* <CardsTripsDetails /> */}
    </div>
  );
};

export default ContentInfoDetailsRight;
