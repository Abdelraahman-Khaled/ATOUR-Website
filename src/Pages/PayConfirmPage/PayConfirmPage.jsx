import BreadcrumbsPage from "Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import AllContentRightInfo from "./Components/AllContentRightInfo/AllContentRightInfo";
import "./PayConfirmPage.css";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import DetailsPaymentInfo from "./Components/DetailsPaymentInfo/DetailsPaymentInfo";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";

const PayConfirmPage = () => {
  return (
    <>
      <HelmetInfo titlePage={"الدفع"} />

      <div className="pay-confirm-page padding-60">
        <header>
          <BreadcrumbsPage
            newClassBreadHeader={"breadcrumb-page-2"}
            routeTitleTwoBread={false}
            titleTwoBread={"السلة"}
            textBreadActive={"دفع وتأكيد"}
          />
        </header>
        <main>
          <div className="content-pay-info-page pt-4">
            <ContainerMedia>
              {/* ============== START ROW ===========  */}
              <div className="row gy-4 g-3">
                {/* ============ START COL ============== */}
                <div className="col-12 col-md-7">
                  <AllContentRightInfo />
                </div>
                {/* ============ END COL ============== */}
                {/* ============ START COL ============== */}
                <div className="col-12 col-md-5">
                  <DetailsPaymentInfo />
                </div>
                {/* ============ END COL ============== */}
              </div>
              {/* ============== END ROW ===========  */}
            </ContainerMedia>
          </div>
        </main>
      </div>
    </>
  );
};

export default PayConfirmPage;
