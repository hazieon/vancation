import React, { useState } from "react";
import { formatRelative } from "date-fns";
import styles from "./index.module.css";
const MAPTOKEN = process.env.REACT_APP_MAPTOKEN;
const MAPKEY = process.env.REACT_APP_MAPKEY;
const MAPURL = process.env.REACT_APP_MAP;
require("dotenv").config();

function Panel({ lat, lng, time, placeId }) {
  const [address, setAddress] = useState("");
  console.log(lat, lng, placeId, time, "point in panel");
  async function reverseGeocode() {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=pk.a686db40be877d942a5c10c49ae67edd&format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    console.log(data);
    if (data.display_name) {
      setAddress(data.display_name);
    }
  }
  return (
    <section>
      <h1>Vancation details:</h1>
      <p>{time ? String(formatRelative(time, new Date())) : ""}</p>
      <div className={styles.addressBox}>
        <p className={styles.address}>{address ? address : ""}</p>
      </div>

      <button
        className={styles.addButton}
        onClick={() => {
          console.log(lat, lng, "saved!");
          reverseGeocode(lat, lng);
        }}
      >
        Add Vancation➡
      </button>
    </section>
  );
}

export default Panel;

//google maps API for reverse geocoding costs, so I changed to a free service
//google request link:
//`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPKEY}`
