// ModalComponent.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const ModalComponent = ({modalIsOpen, closeModal, children}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}

      
      style={{
        overlay: {
          backgroundColor: 'grey'
        },
        content: {
          
          width: '45%', // Adjust the width as needed
      height: '30%', // Adjust the height as needed
      margin: 'auto',
        }
      }}
    >
      {children}
      <button onClick={closeModal} style={{ position: 'absolute', top: 0, right: 0, margin:5,marginRight:10 }}>X</button>
    </Modal>
  );
}

export default ModalComponent;
