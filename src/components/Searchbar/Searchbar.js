import React, { Component } from "react";
import s from "./Searchbar.module.css";
import propTypes from "prop-types";

class Searchbar extends Component {
  state = {
    imageName: "",
  };

  static propTypes = { onSubmit: propTypes.func };

  handleNameChange = (evt) => {
    this.setState({ imageName: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (this.state.imageName.trim() === "") {
      alert("Enter search query in the search field"); //toastify here
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.imageName}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
