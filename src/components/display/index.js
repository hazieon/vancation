import React from "react";
import styles from "./index.module.css";
import { checkList } from "./checkList";

function Display({
  incComponent,
  decComponent,
  handleFeatures,
  checkedItems,
  clearFeatures,
  address,
  presetData,
  updateData,
  selectedId,
}) {
  const spot = presetData.find((obj) => {
    return obj.id === selectedId;
  });

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={decComponent}>
        ← back
      </button>
      <h3>Vancation Spot:</h3>
      <div className={styles.addressBox}>
        <label>Address:</label>
        <span className={styles.address}>
          {spot && spot.address ? spot.address : ""}
        </span>
      </div>
      <div>
        <ul className={styles.detailsList}>
          <label> Details:</label>
          {checkList.map((c, i) => {
            return (
              <label className={styles.detailsListItem} key={c.item}>
                {c.item}
                <> {spot && spot.details.includes(c.item) ? "☑" : "✖"}</>
              </label>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Display;
