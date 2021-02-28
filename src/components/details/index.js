import React, { useState } from "react";
import styles from "./index.module.css";
import { checkList } from "./checkList";
//CLEAR THE DETAILS LIST AFTER SAVE AND CLICKING A NEW LOCATION!!! AND AFTER REFRESH!
function Details({
  incComponent,
  decComponent,
  handleFeatures,
  checkedItems,
  clearFeatures,
  updateData,
  address,
  lat,
  lng,
  time,
}) {
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

      <button className={styles.backButton} onClick={decComponent}>
        ← back
      </button>

      <button
        className={styles.saveButton}
        onClick={() => {
          updateData({
            lat: lat,
            lng: lng,
            address: address,
            date: time,
            details: checkedItems,
          });

          incComponent();
          // incComponent();
          console.log(checkedItems);
        }}
      >
        Save ➡
      </button>
    </div>
  );
}

export default Details;
