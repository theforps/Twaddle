import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "./style.css";
const ModalWindow = ({ modalContent, title, btnName }) => {
  const [snowModal, setSnowModal] = useState(false);

  const handleCloseModal = () => {
    setSnowModal(false);
  };

  const handleOpenModal = () => {
    setSnowModal(true);
  };

  return (
    <div>
      <Button className="button" onClick={handleOpenModal}>
        {btnName}
      </Button>

      <Modal show={snowModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalWindow;
