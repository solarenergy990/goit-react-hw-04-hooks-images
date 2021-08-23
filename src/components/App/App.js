import React, { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ImageGallery from "../ImageGallery/ImageGallery";
import Searchbar from "../Searchbar/Searchbar";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Container from "../Container/Container";
import s from "./App.module.css";
import imageAPI from "../../services/image-api";

import dataExtractor from "../../utils/dataExtractor";

const App = ({ onSubmit }) => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [largeImg, setLargeImg] = useState("");

  const handleFormSubmit = (onSubmit) => {
    const page = 1;
    setSearchQuery(onSubmit);
    setCurrentPage(page);
    setPictures([]);
  };

  useEffect(() => {
    if (searchQuery === "") return;

    const fetchPictures = (query, page) => {
      return imageAPI
        .fetchImage(query, page)
        .then((pictures) => {
          setPictures((prevPictures) => [
            ...prevPictures,
            ...dataExtractor(pictures),
          ]);
          setIsLoading(false);

          if (pictures.length === 0) {
            alert("Nothing found!");
          }
        })
        .then(() => {
          if (currentPage > 1) {
            scrollDown();
          }
        });
    };

    fetchPictures(searchQuery, currentPage);
  }, [currentPage, searchQuery]);

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const onLoadMore = () => {
    setCurrentPage((prevPage) => {
      return prevPage + 1;
    });

    setIsLoading(true);
  };

  const onLargeImgOpen = (imgLink) => {
    setLargeImg(imgLink);
    modalToggler();
  };

  const modalToggler = () => {
    setOpenModal((prevOpenModal) => {
      if (prevOpenModal === true) {
        return false;
      } else if (prevOpenModal === false) {
        return true;
      }
    });
  };

  return (
    <div className={s.App}>
      {openModal && (
        <Modal onModalClose={modalToggler} src={largeImg} alt={searchQuery} />
      )}
      <Searchbar onSubmit={handleFormSubmit} />
      <Container>
        {pictures.length > 0 && (
          <ImageGallery imageArr={pictures} onModalOpen={onLargeImgOpen} />
        )}
      </Container>

      <Container>
        {isLoading && (
          <Loader type="Grid" color="#00BFFF" height={80} width={80} />
        )}
        {pictures.length > 0 && !isLoading && <Button onClick={onLoadMore} />}
      </Container>
    </div>
  );
};

export default App;
