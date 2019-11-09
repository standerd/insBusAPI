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
    <div className="contactModal">
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="contactForm">
          <h1>Contact Property</h1>
          <hr></hr>
          <br></br>
          <form onSubmit={props.sendMessage} className="contact">
            <textarea
              onChange={props.messageHandler}
              className="text"
              placeholder="Please Type Your Message Here"
              rows="20"
              cols="100"
              value={props.message}
            />
            <br></br>
            <button className="exitButton" type="submit">
              Send Message
            </button>
          </form>
          <h3 style={{background: "green"}}>{!props.sent ? null : "Message Sent"}</h3>
          <button className="exitButton" onClick={props.closeModal}>
            Back To Bookings
          </button>
         
        </div>
      </Modal>
    </div>
  );
};

export default contactProp;
