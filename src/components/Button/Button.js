import React from "react";
import s from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
