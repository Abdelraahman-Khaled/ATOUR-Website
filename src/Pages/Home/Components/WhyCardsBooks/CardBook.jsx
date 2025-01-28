
const CardBook = ({iconCard,titleCard,textCard}) => {
 
  return (
    <>
      {/* ========== START CARD BOOK ONE ========== */}
      <div className="card-book-one h-100">
        {/* ============ START ICON CARD BOOK ============== */}
        <div className="icon-card-book">
          {iconCard}
        </div>
        {/* ============ END ICON CARD BOOK ============== */}
        {/* ============ START CONTENT INFO ============ */}
        <div className="content-info">
          <h2 className="title">{titleCard}</h2>
          <p className="text">
           {textCard}
          </p>
        </div>
        {/* ============ END CONTENT INFO ============ */}
      </div>
      {/* ========== END CARD BOOK ONE ========== */}
    </>
  );
};

export default CardBook;
