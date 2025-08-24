import BoxOneContent from "./BoxOneContent";
import "./ContentInfoRight.css";
import MapContentBox from "./MapContentBox";
import PicturesPreviousTrips from "./PicturesPreviousTrips";
import RatesComments from "./RatesComments/RatesComments";
import SimilarTrips from "./SimilarTrips";
import SliderDetailsContentRight from "./SliderDetailsContentRight";
import TextContent from "./TextContent";
import TripRequirement from "./TripRequirement";
import WhyBookingTrip from "./WhyBookingTrip";
const ContentInfoDetailsRight = ({ tripData }) => {
  console.log(tripData);
  
  return (
    <div className="all-content-info-details-right" data-aos="fade-left">
      <BoxOneContent tripData={tripData} />
      <SliderDetailsContentRight tripData={tripData} />
      {tripData.features && <WhyBookingTrip tripData={tripData} />}
      {tripData.trip_requirements && <TripRequirement tripData={tripData} />}
      <MapContentBox tripData={tripData} />
      <TextContent />
      <RatesComments />
      {/* <PicturesPreviousTrips /> */}
      <SimilarTrips />
    </div>
  );
};

export default ContentInfoDetailsRight;
