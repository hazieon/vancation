import React, { useState } from "react";
import styles from "./index.module.css";

function Search() {
  const [text, setText] = useState("");

  function handleInput(e) {
    setText(String(e.target.value));
  }
  return (
    <div className={styles.search}>
      <input
        className={styles.searchBar}
        placeholder="Search a spot!"
        type="text"
        onInput={(e) => handleInput(e)}
      ></input>
    </div>
  );
}

export default Search;
