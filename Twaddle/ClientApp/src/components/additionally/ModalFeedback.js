import {Button, Modal} from 'react-bootstrap'
import React, {useState} from "react";

const ModalFeedback = ({modalContent, title, btnName, getFeedback}) =>
{
    const [snowModal, setSnowModal] = useState(false);

    const handleCloseModal = () => {
        setSnowModal(false)
    }

    const handleOpenModal = () => {
        setSnowModal(true)
        getFeedback()
    }

    return (
        <div>
            <Button variant="success" onClick={handleOpenModal}>
                {btnName}
            </Button>

            <Modal show={snowModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalFeedback;