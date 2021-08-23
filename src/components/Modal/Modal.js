import React, { useEffect } from "react";
import s from "./Modal.module.css";
import { createPortal } from "react-dom";
import propTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onModalClose, src, alt }) => {
  useEffect(() => {
    window.addEventListener("keydown", onEscDown);
    return () => {
      window.removeEventListener("keydown", onEscDown);
    };
  });

  const onEscDown = (evt) => {
    if (evt.code === "Escape") {
      onModalClose();
    }
  };
  const onBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      onModalClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={onBackdropClick}>
      <div className={s.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onModalClose: propTypes.func.isRequired,
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
};

export default Modal;
