import React, { useState, useEffect } from "react";
import "./App.css";
import MapContainer from "./components/map";
const axios = require("axios");

const url = "https://vancation.herokuapp.com/";

function App() {
  //preset map markers - fetch and pass to map
  //fetch location details, address on marker click - fetch in map
  //post new location details on 'save' click - fetch in map?

  axios
    .get("https://vancation.herokuapp.com/", {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  // axios.get('/user?ID=12345')
  // .then(function (response) {
  //   // handle success
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // useEffect(() => {
  //   async function fetchPresets() {
  //     const data = await fetch(url, {
  //       headers: { "Access-Control-Allow-Origin": "*" },
  //     });
  //     const result = await data.json();
  //     console.log(result);
  //     // result.success === false
  //     //   ? setRole("bootcamper")
  //     //   : setRole(result.data.role);
  //     console.log("app");
  //   }
  //   fetchPresets();
  // }, []);

  // async function fetchPresets() {
  //   const response = await fetch(url, {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "include", // include, *same-origin, omit
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: "follow", // manual, *follow, error
  //     // body: JSON.stringify(data), // body data type must match "Content-Type" header
  //   });
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }
  // fetchPresets();
  // postData("https://example.com/answer", { answer: 42 }).then((data) => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // });

  // useEffect(() => {
  //   fetch(`${url}/users`)
  //     .then((response) => response.json())
  //     .then((payload) => setUserTableData(payload.data))
  //     .catch((error) => burntToast(error));
  // }, [updatePage]);

  // useEffect(() => {
  //   const data = fetchPresets(url);
  //   console.log(data);
  // });

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
      <MapContainer />
    </div>
  );
}

export default App;
