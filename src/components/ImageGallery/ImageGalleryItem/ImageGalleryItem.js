import React from "react";
import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ image, onModalOpen }) => {
  // console.log(image);
  const { smallImg, imgTag, largeImg } = image;

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={smallImg}
        alt={imgTag}
        onClick={(evt) => {
          console.log(evt.target);
          onModalOpen(evt.target.attributes["data-large"].value);
        }}
        className={s.ImageGalleryItemImage}
        data-large={largeImg}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    imageId: PropTypes.number.isRequired,
    imgTag: PropTypes.string.isRequired,
    smallImg: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
  }),

  onModalOpen: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
