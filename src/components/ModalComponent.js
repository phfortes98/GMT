import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Form from './Form';
export const ModalComponent=({submitHandler})=>{

    const [show, setShow] = useState(true);

     const handleClose = () => setShow(false);
     const submitClicked=(sentence)=>{
      handleClose();
      submitHandler(sentence);

     }

    return<>
    
              
              

              <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form submitHandler={submitClicked}/>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
}