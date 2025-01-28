import CardCustomerReview from "./CardCustomerReview";
import TitleSection from "Components/TitleSection/TitleSection";
import { dataCustomerReview } from "./DataCustomer.js";
import "./CustomersReviews.css";
import { useState } from "react";
import PaginationPage from "Components/Pagination/Pagination";
const CustomersReviews = () => {
  // PAGINATION ITEMS
  const [currentPageCustomer, setCurrentPageCustomer] = useState(0);
  const perPage = 3; // NUMBER OF PAGE ITEMS
  const pageCount = Math.ceil(dataCustomerReview.length / perPage); // NUMBER ITEMS COUNT
  const handlePageChange = ({ selected }) => {
    // ONCLIK PAGINATION NUMBER
    setCurrentPageCustomer(selected);
  };

  const offsetItems = currentPageCustomer * perPage; // NUMBER OF ITEMS * NUMBER OF PAGES COUNT
  const currentPageDataCustomer = dataCustomerReview.slice(
    offsetItems,
    offsetItems + perPage
  );

  return (
    <div className="customers-reviews padding-top">
      {/* =========== START SECTION TITLE ========== */}
      <TitleSection
        title={"تقييمات عملاؤنا وثقتهم بنا"}
        text={
          "ذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق."
        }
      />
      {/* =========== END SECTION TITLE ============ */}
      {/* ============ START ALL CUSTOMRS REVIEWS ============ */}
      <div className="all-customers-reviews" data-aos="fade-up">
        {/* ============ START ROW ============ */}
        <div className="row g-3">
          {currentPageDataCustomer.length > 0 ? (
            currentPageDataCustomer.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-6 col-lg-4">
                <CardCustomerReview
                  imageCustomer={item.image}
                  nameCustomer={item.nameCustomer}
                  timeAdd={item.timeAdd}
                  textContent={item.textContent}
                />
              </div>
            ))
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
        {/* ============ END ROW ============ */}
        {/* ============ START PAGINATION ============= */}
        <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
        {/* ============ END PAGINATION ============= */}
      </div>
      {/* ============ END ALL CUSTOMRS REVIEWS ============ */}
    </div>
  );
};

export default CustomersReviews;
