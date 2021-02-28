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
  presetData,
  updateData,
}) {
  //REFACTOR TO USE DB DATA INSTEAD
  console.log(presetData);
  console.log("display");
  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={decComponent}>
        ← back
      </button>
      <h3>Vancation Spot:</h3>

      <button className={styles.saveButton} onClick={clearFeatures}>
        save
      </button>
    </div>
  );
}

export default Display;

{
  /* <div className={styles.addressBox}>
<p className={styles.address}>{address}</p>
</div>

{checkList.map((c, i) => {
return (
  <div className={styles.details}>
    <span key={c.item}>
      {c.item}
    //  { <input
    //  type="checkbox"
    //  name={c.item}
     // checked={checkedItems[c.item]}
    // /> }
      <p>{checkedItems[c.item] ? "✅" : "✖"} </p>
    </span>
  </div>
);
})} */
}
