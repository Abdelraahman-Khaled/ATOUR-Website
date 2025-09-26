import OffersCards from "./OffersCards";

const OffersContent = ({gifts}) => {
  return (
    <div className="all-offers-content ">
      <OffersCards gifts={gifts} />
    </div>
  );
};

export default OffersContent;
