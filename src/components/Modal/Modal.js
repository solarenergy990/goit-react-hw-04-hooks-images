import React, { Component } from "react";
import s from "./Modal.module.css";
import { createPortal } from "react-dom";
import propTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  static propTypes = { onModalClose: propTypes.func.isRequired };

  componentDidMount() {
    console.log("component did mount");
    window.addEventListener("keydown", this.onEscDown);
  }

  onEscDown = (evt) => {
    if (evt.code === "Escape") {
      this.props.onModalClose();
    }
  };
  onBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.onModalClose();
    }
  };

  componentWillUnmount() {
    console.log(" component will unmount");
    window.removeEventListener("keydown", this.onEscDown);
  }

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.onBackdropClick}>
        <div className={s.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
