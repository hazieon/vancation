import React from "react";
import styles from "./index.module.css";

function Locate(map) {
  return (
    <>
      <button
        className={styles.locate}
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
        🧭
      </button>
    </>
  );
}

export default Locate;

//panto function issue
//maybe need to import into this file
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
//   console.log(panTo);
