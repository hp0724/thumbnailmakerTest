import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
// bootstrap css 적용 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ModalEx2.css"

const ModalEx2 = () => {
  const [showLeftModal, setShowLeftModal] = useState(false);
  const [showRightModal, setShowRightModal] = useState(false);

  const handleLeftModalOpen = () => setShowLeftModal(true);
  const handleLeftModalClose = () => setShowLeftModal(false);

  const handleRightModalOpen = () => setShowRightModal(true);
  const handleRightModalClose = () => setShowRightModal(false);

  return (
    <div className="container demo">
      <div className="text-center">
        <Button variant="primary" onClick={handleLeftModalOpen} >
          Left  Modal
        </Button>

        <Button variant="primary" onClick={handleRightModalOpen}>
          Right  Modal
        </Button>
      </div>

      <Modal show={showLeftModal} onHide={handleLeftModalClose} className='modal left fade' size='lg'>
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title id="leftModal">Left Sidebar</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <p>
          Woohoo, you are reading this text in a modal!
          </p>
          
        </Modal.Body>
      </Modal>

      <Modal show={showRightModal} onHide={handleRightModalClose}  className='modal right fade' size='lg' >
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title id="rightModal">Right Sidebar</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body' >
          <p>
          Woohoo, you are reading this text in a modal!
          </p>
        </Modal.Body>
      </Modal>

      
    </div>
  );
};

export default ModalEx2;
