import React from "react";
import { formatRelative } from "date-fns";

function Panel({ lat, lng, time, placeId }) {
  console.log(lat, lng, placeId, time, "point in panel");
  return (
    <section>
      <h1>Vancation details:</h1>
      <p>{lat}</p>
      <p>{lng}</p>
      <p>{String(formatRelative(time, new Date()))}</p>
      <button onClick={() => console.log(lat, lng, "saved!")}>
        Save Vancation➡
      </button>
    </section>
  );
}

export default Panel;
