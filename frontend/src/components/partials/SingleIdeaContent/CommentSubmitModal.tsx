import React from 'react'
import { Button, Modal } from 'react-bootstrap';

interface CommentSubmitModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentSubmitModal = ({ show, setShow }: CommentSubmitModalProps) => {


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentSubmitModal