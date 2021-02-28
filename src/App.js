import React, {useEffect, useState} from "react";
import "./App.css";
import MapContainer from "./components/map";
// const axios = require("axios");

const url = "https://vancation.herokuapp.com/";

function App() {
  const [presetData, setPresetData]=useState([])
  //preset map markers - fetch and pass to map
  //GET and display details info of db markers - show in a NEW component - display
    //show display panel on click of preset marker
  //POST new location + details on 'save' click - function in map, pass to details to call
  //DELETE functionality - delete button on display window or info popup of preset markers

  async function fetchPresets(){
    let res = await fetch(url);
    const data = await res.json();
    setPresetData(data.data)
    // console.log(presetData)
  }

useEffect(()=>{
fetchPresets();
},[])

  

//   async function fetchPresets() {
//     const response = await fetch(url, {
//       method: "GET",
//       mode: "no-cors", 
//       cache: "no-cache",
//       credentials: "include",
//       headers: {
//         // "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json"
//       },
//       redirect: "follow" 
//     });
//   const data = await response.json();
//   console.log(data)
// }

//   // useEffect(() => {}, []);
//     fetchPresets();
  

  // useEffect(() => {
  //   fetch(`${url}/users`)
  //     .then((response) => response.json())
  //     .then((payload) => setUserTableData(payload.data))
  //     .catch((error) => burntToast(error));
  // }, [updatePage]);

  return (
    <div className="page">
      <div className="nav">
        <a href="#home" className="active">
          🏠
        </a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
      <div className="App">
        <h1 className="heading">Vancation</h1>
      </div>
      <MapContainer presetData={presetData} />
    </div>
  );
}

export default App;


// async function fetchPresets() {
//   const response = await fetch(url, {
//     method: "GET", // *GET, POST, PUT, DELETE, etc.
//     mode: "no-cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "include", // include, *same-origin, omit
//     headers: {
//       // "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json"
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow" // manual, *follow, error
//     // body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   // console.log(response);
//   const data = await response.json(); // parses JSON response into native JavaScript objects
// console.log(data.data)
// }
