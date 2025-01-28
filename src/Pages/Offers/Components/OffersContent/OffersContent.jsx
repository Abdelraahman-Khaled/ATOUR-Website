import OffersCards from "./OffersCards";

const OffersContent = ({gifts}) => {
  return (
    <div className="all-offers-content padding-80">
      <OffersCards gifts={gifts} />
    </div>
  );
};

export default OffersContent;
