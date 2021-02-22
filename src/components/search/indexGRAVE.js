// import React, { useEffect, useState } from "react";
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
// import styles from "./index.module.css";

// function Search() {
//   //   const {
//   //     ready,
//   //     value,
//   //     setValue,
//   //     suggestions: { status, data },
//   //     clearSuggestions,
//   //   } = usePlacesAutocomplete({
//   //     requestOptions: {
//   //       //mapCenter (in variable in map) //radius in metres (km*1000)
//   //       location: {
//   //         radius: parseFloat(200 * 1000),
//   //         lat: () => -1.2884,
//   //         lng: () => 36.8233,
//   //       },
//   //     },
//   //   });
//   const [inputTxt, setInputTxt] = useState("");

//   return (
//     <div className={styles.search}>
//       <input
//         className={styles.searchBar}
//         placeholder="Search a spot!"
//         onInput={(e) => setInputTxt(e.target.value)}
//       >
//         {inputTxt}
//       </input>
//     </div>
//   );
// }

// export default Search;

// //combobox code to allow search suggestions that unfortunately doesnt work with newer react versions:
// /*
// <Combobox
// onSelect={(add) => {
//   console.log(add);
// }}
// >
// <ComboboxInput
//   className={styles.searchBar}
//   value={value}
//   onChange={(e) => {
//     console.log(e.target.value);
//     setValue(e.target.value);
//   }}
//   disabled={!ready} //won't be enabled unless ready
//   placeholder="Search for a spot"
// />
// <ComboboxPopover>
//   // status and data come in from suggestions
//   {status === "OK" &&
//     data.map((id, desc) => {
//       return <ComboboxOption key={id} value={desc} />;
//     })}
// </ComboboxPopover>
// </Combobox> */
