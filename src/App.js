import React, { useEffect, useState } from "react";
import "./App.css";
import MapContainer from "./components/map";

const url = "https://vancation.herokuapp.com/";

function App() {
  const [presetData, setPresetData] = useState([]);
  //preset map markers - fetch and pass to map
  //GET and display details info of db markers - show in a NEW component - display
  //show display panel on click of preset marker
  //POST new location + details on 'save' click - function in map, pass to details to call
  //DELETE functionality - delete button on display window or info popup of preset markers

  async function fetchPresets() {
    let res = await fetch(url);
    const data = await res.json();
    setPresetData(data.data);
  }

  useEffect(() => {
    fetchPresets();
    // if (fetchPresets.length) fetchPresets();
    //to rerun if the data changes
  }, []);

  async function postNewMarker(newPost) {
    console.log("posting new vancation");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
  }

  async function removeMarker(id) {
    const res = await fetch(`${url}${id}`, {
      method: "DELETE",
    });
  }

  return (
    <div className="page">
      <div className="nav">
        <a href="/" className="active">
          🏠
        </a>
        <a href="/">Contact</a>
        <a href="/">About</a>
      </div>
      <div className="App">
        <h1 className="heading">Vancation</h1>
      </div>
      <MapContainer
        presetData={presetData}
        postNewMarker={postNewMarker}
        removeMarker={removeMarker}
      />
    </div>
  );
}

export default App;
