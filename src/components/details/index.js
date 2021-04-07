import React from "react";
import styles from "./index.module.css";
import { checkList } from "./checkList";

function Details({
  incComponent,
  decComponent,
  handleFeatures,
  checkedItems,
  postNewMarker,
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
          <label className={styles.label} key={c.item}>
            {c.item}

            <input
              type="checkbox"
              name={c.item}
              checked={checkedItems[c.item]}
              onChange={handleFeatures}
            />
            <span className={styles.inputCustom}> </span>
          </label>
        );
      })}

      <button className={styles.backButton} onClick={decComponent}>
        ← back
      </button>

      <button
        className={styles.saveButton}
        onClick={() => {
          if (
            address !== ("Choose a vancation spot on the map." || "") &&
            Object.keys(checkedItems).length > 0
          ) {
            //REFACTOR to use npm package for confirm - toast?
            if (window.confirm("Save this Vancation spot?")) {
              postNewMarker({
                lat: lat,
                lng: lng,
                address: address,
                date: time,
                details: checkedItems,
              });
              incComponent();
            }
          } else {
            alert("Error: Set an address & details first!");
            console.log("set an address first");
          }
          return;
        }}
      >
        Save ➡
      </button>
    </div>
  );
}

export default Details;
