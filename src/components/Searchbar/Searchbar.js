import React, { useState } from "react";
import s from "./Searchbar.module.css";
import propTypes from "prop-types";

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState("");

  const handleNameChange = (evt) => {
    setImageName(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (imageName.trim() === "") {
      alert("Enter search query in the search field"); //toastify here later
      return;
    }

    onSubmit(imageName);
    setImageName("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={imageName}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default Searchbar;
