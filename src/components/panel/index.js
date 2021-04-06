import React, { useState } from "react";
import { formatRelative } from "date-fns";
import styles from "./index.module.css";
const MAPTOKEN = process.env.REACT_APP_MAPTOKEN;

require("dotenv").config();

function Panel({
  incComponent,
  decComponent,
  createAddress,
  updateData,
  address,
  lat,
  lng,
  time,
  placeId,
}) {
  async function reverseGeocode() {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${MAPTOKEN}&format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    if (data.display_name) {
      createAddress(data.display_name);
    } else {
      if (!data.display_name) {
        createAddress("Choose a vancation spot on the map.");
      }
    }
  }
  return (
    <section>
      <h1>Vancation details:</h1>
      <p>{time ? String(formatRelative(time, new Date())) : ""}</p>

      <button
        className={styles.getButton}
        onClick={() => {
          console.log(lat, lng, "saved!");
          reverseGeocode(lat, lng);
        }}
      >
        Get Address ➡
      </button>
      <div className={styles.addressBox}>
        <p className={styles.address}>{address ? address : ""}</p>
      </div>
      <button onClick={incComponent} className={styles.addButton}>
        Next ➡
      </button>
    </section>
  );
}

export default Panel;
