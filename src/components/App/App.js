import React, { Component } from "react";
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

class App extends Component {
  state = {
    pictures: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    error: null,
    openModal: false,
  };

  handleFormSubmit = (searchQuery) => {
    const page = 1;

    // console.log(searchQuery);
    this.setState({
      searchQuery,
      currentPage: page,
      pictures: [],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, searchQuery } = this.state;

    if (
      searchQuery !== prevState.searchQuery ||
      currentPage !== prevState.currentPage
    ) {
      this.fetchPictures(searchQuery, currentPage);
    }
    if (currentPage > 1) {
      this.scrollDown();
    }
  }

  fetchPictures = (query, page) => {
    return imageAPI.fetchImage(query, page).then((pictures) => {
      this.setState((prevState) => ({
        pictures: [...prevState.pictures, ...dataExtractor(pictures)],

        isLoading: false,
      }));
      if (this.state.pictures.length === 0) {
        alert("Nothing found!");
      }
    });
  };

  scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
      isLoading: true,
    }));
  };

  setLargeImg = (imgLink) => {
    // console.log(imgLink);
    return this.setState(({ largeImg }) => ({ largeImg: imgLink }));
  };

  onLargeImgOpen = (imgLink) => {
    // console.log(imgLink);
    this.setLargeImg(imgLink);
    this.modalToggler();
  };

  modalToggler = () => {
    this.setState(({ openModal }) => ({ openModal: !openModal }));
  };

  render() {
    const { pictures, openModal, isLoading, largeImg, searchQuery } =
      this.state;

    return (
      <div className={s.App}>
        {openModal && (
          <Modal
            onModalClose={this.modalToggler}
            src={largeImg}
            alt={searchQuery}
          />
        )}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
          {pictures.length > 0 && (
            <ImageGallery
              imageArr={pictures}
              onModalOpen={this.onLargeImgOpen}
            />
          )}
        </Container>

        <Container>
          {isLoading && (
            <Loader type="Grid" color="#00BFFF" height={80} width={80} />
          )}
          {pictures.length > 0 && !isLoading && (
            <Button onClick={this.onLoadMore} />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
