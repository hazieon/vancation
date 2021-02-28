import React, { useState } from "react";
import styles from "./index.module.css";
import { checkList } from "./checkList";

function Display({
  incComponent,
  decComponent,
  handleFeatures,
  checkedItems,
  clearFeatures,
  address,
}) {
  return (
    <div className={styles.container}>
      <h2>hello</h2>
      <button className={styles.backButton} onClick={decComponent}>
        ← back
      </button>
      <p>{address}</p>
      <p></p>
      {checkList.map((c, i) => {
        return (
          <label key={c.item}>
            {c.item}
            <input
              type="checkbox"
              name={c.item}
              checked={checkedItems[c.item]}
            />
          </label>
        );
      })}
      <button className={styles.saveButton} onClick={clearFeatures}>
        save
      </button>
    </div>
  );
}

export default Display;
