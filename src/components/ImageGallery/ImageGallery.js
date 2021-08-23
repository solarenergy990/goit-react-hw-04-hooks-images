import React from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import propTypes from "prop-types";
import s from "./ImageGallery.module.css";

const imageGallery = ({ imageArr, onModalOpen }) => {
  return (
    <div>
      <ul className={s.ImageGallery}>
        {imageArr &&
          imageArr.map((image) => {
            return (
              <ImageGalleryItem
                image={image}
                key={image.imageId}
                onModalOpen={onModalOpen}
              />
            );
          })}
      </ul>
    </div>
  );
};

imageGallery.propTypes = {
  imageArr: propTypes.arrayOf(propTypes.object).isRequired,
  onModalOpen: propTypes.func.isRequired,
};

export default imageGallery;
