import React from "react";
import styles from "./index.module.css";

function Locate(map) {
  return (
    <div
      className={styles.container}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            map.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            console.log("locate");
          },
          () => null
        );
      }}
    >
      <button className={styles.locate}>🧭</button>
    </div>
  );
}

export default Locate;
