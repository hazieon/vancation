import React, { useState } from "react";
import styles from "./index.module.css";
function Search() {
  const [text, setText] = useState("");

  function handleInput(e) {
    setText(e.target.value);
    console.log(text);
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
