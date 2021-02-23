import React, { useState } from "react";
import styles from "./index.module.css";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

function Search() {
  const [text, setText] = useState("");

  function handleInput(e) {
    setText(String(e.target.value));
    console.log(text);
  }
  return (
    <div className={styles.search}>
      <input
        className={styles.searchBar}
        placeholder="Search a spot!"
        type="text"
        onInput={(e) => handleInput(e)}
      ></input>
    </div>
  );
}

//search places or input lat & long

export default Search;

// onSelect={async (address) => {
//     try {
//       const results = await getGeocode({ address: address });
//       const {lat,lng}= await getLatLng(results)
//       console.log(results);
//     } catch (error) {
//       console.log("error");
//     }
//     //   console.log(address);
//   }}

//make map move to searched location:
//could use this function and pass in lat and lng to search?
//panTo{lat,lng}
