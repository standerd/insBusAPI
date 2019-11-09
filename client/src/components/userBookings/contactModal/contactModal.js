import React from "react";
import Modal from "react-modal";
import "./contactModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    height: "auto"
  }
};

Modal.setAppElement("#root");

const contactProp = props => {
  return (
    <div className="bookingModal">
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bookingContent">
          <h1>Modal Is Working</h1>
          <button className="editButton" onClick={props.closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default contactProp;
