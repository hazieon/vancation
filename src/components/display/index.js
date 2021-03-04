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
  selectedId,
}) {
  const spot = presetData.find((obj) => {
    return obj.id === selectedId;
  });
  // console.log(spot.details);
  // const keys = checkList.map((obj) => {
  //   return obj.item === spot.details;
  // });
  // console.log(keys);

  // checkList.map((item, i) => {
  //  console.log(spot.details)
  // });

  //  checkList.filter()

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
      {/* <button className={styles.saveButton} onClick={clearFeatures}>
        save
      </button> */}
    </div>
  );
}

export default Display;

// {
//   /* <div className={styles.addressBox}>
// <p className={styles.address}>{address}</p>
// </div>

// {checkList.map((c, i) => {
// return (
//   <div className={styles.details}>
//     <span key={c.item}>
//       {c.item}
//     //  { <input
//     //  type="checkbox"
//     //  name={c.item}
//      // checked={checkedItems[c.item]}
//     // /> }
//       <p>{checkedItems[c.item] ? "✅" : "✖"} </p>
//     </span>
//   </div>
// );
// })} */
// }

// {Object.keys(spot).map((item, i) => (
//   <li key={i}>
//     <p>{spot.details}</p>
//   </li>
// ))}
