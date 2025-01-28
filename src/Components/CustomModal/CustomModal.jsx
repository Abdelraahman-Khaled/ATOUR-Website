import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import "./CustomModal.css";
const CustomModal = ({ show, onHide, title, children, newClass  }) => {
  return (
    <Modal show={show} onHide={onHide} centered   className={newClass}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Button variant="link" className="btn-close-icon" onClick={onHide}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
