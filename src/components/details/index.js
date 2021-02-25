import React, { useState } from "react";
import styles from "./index.module.css";
import { checkList } from "./checkList";

function Details({ changePage, handleFeatures, checkedItems }) {
  return (
    <div className={styles.container}>
      <h3>Features:</h3>
      <p className={styles.sub}>
        Select qualities of this Vancation parking spot.
      </p>
      {checkList.map((c, i) => {
        return (
          <label key={c.item}>
            {c.item}
            <input
              type="checkbox"
              name={c.item}
              checked={checkedItems[c.item]}
              onChange={handleFeatures}
            />
          </label>
        );
      })}

      <button className={styles.backButton} onClick={changePage}>
        ← back
      </button>

      <button
        className={styles.saveButton}
        onClick={() => {
          console.log(checkedItems);
        }}
      >
        Save
      </button>
    </div>
  );
}

export default Details;
