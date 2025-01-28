import { Accordion } from "react-bootstrap";
import TouristInformationForm from "./TouristInformationForm/TouristInformationForm";
import InformationPay from "./InformationPay/InformationPay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import InterrogativeIcon from "assets/Icons/InterrogativeIcon";

const AllContentRightInfo = () => {
  return (
    <div className="all-content-right-info" data-aos="fade-left">
      <Accordion defaultActiveKey={"item-1"}>
        <Accordion.Item eventKey="item-1">
          <Accordion.Header>معلومات السائح</Accordion.Header>
          <Accordion.Body>
            <TouristInformationForm />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="item-2">
          <Accordion.Header>معلومات الدفع</Accordion.Header>
          <Accordion.Body>
            <InformationPay />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="bottom-info-pay-content">
        <div className="text-link link-policy d-flex align-items-center gap-2">
          <div className="icon-check-link">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <span className="text-decoration-underline ">
            {" "}
            سياسة الحجز والإلغاء
          </span>
        </div>
        <div className="text-link link-help d-flex align-items-center gap-2">
          <InterrogativeIcon /> تحتاج لمساعدة ؟
        </div>
      </div>
    </div>
  );
};

export default AllContentRightInfo;
