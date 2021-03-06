import React, { useState, useCallback, useRef, useEffect } from "react";
import customMapStyle from "../../mapstyles";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./index.module.css";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
// import Search from "../search/index";
import Locate from "../locate";
import Panel from "../panel";
import Details from "../details";
import Display from "../display";

//libraries prop kept separate, move to .env later
const libraries = ["places"];
const MAPKEY = process.env.REACT_APP_MAPKEY;

//set the map window size
const mapStyles = {
  width: "65vw", //100vw, 100vh
  minWidth: "280px",
  maxWidth: "400px",
  height: "55vh",
  borderRadius: "10px",
};

//hard code to set the map initial location
// const mapCentre = {
//   lat: -3.745,
//   lng: -38.523,
// };

//custom map styles from JSON
const options = {
  styles: customMapStyle,
  //remove UI controls:
  disableDefaultUI: true,
  //enable specific UI tools:
  zoomControl: true,
};

function MapContainer({ presetData, postNewMarker, removeMarker }) {
  //state for the map functionality:
  const [map, setMap] = useState(null);
  const [point, setPoint] = useState([]);
  const [view, setView] = useState([]);
  const [display, setDisplay] = useState(false);
  //state for managing markers and component display:
  const [detailDisplay, setDetailDisplay] = useState(false);
  const [currentPanel, setCurrentPanel] = useState(0);
  //state for storing data of user's session:
  const [checkedItems, setCheckedItems] = useState({});
  const [address, setAddress] = useState("");
  const [selectedId, setSelectedId] = useState(0);


  //load script and error script from google maps npm
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPKEY,
    libraries,
  });

  //setting up functionality for searching:
  //retain state of the map WITHOUT causing rerenders
  //useCallback to avoid repeating similar code
  //it's for defining a function that won't change unless properties within in 'depth array's change, dependency array?; thus won't trigger rerenders unnecessarily!
  const mapRef = useRef(() => {});
  //functions to load the map from the docs
  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
    panTo({ lat: 52.0507548306133, lng: -1.7856869475872172 });
    // panTo({ lat: 50.881146683957205, lng: 10.5104400792643 });
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  //useEffect to set the view state asynchronously (as it was one step behind)
  useEffect(() => {
    setCurrentPanel(0);
    if (point.lat) {
      let viewArr = [];
      viewArr.push(point);
      setView(viewArr);
      setDisplay(false);
    } else {
      return;
    }
  }, [point]);

  if (loadError) {
    console.log(loadError);
    return "Error loading map";
  }
  function handleFeatures(event) {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
    //set to false if checked again
  }

  function clearFeatures() {
    setCheckedItems({});
  }

  function createAddress(string) {
    setAddress(string);
  }

  const componentPages = [0, 1, 2];
  function incComponent() {
    //array with order of pages, move to NEXT index on button click
    if (currentPanel < componentPages.length) {
      setCurrentPanel(currentPanel + 1);
    } else {
        return currentPanel;
    }
  }
  function decComponent() {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    } else {
      return currentPanel;
    }
  }

  return isLoaded ? (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.label}>
          <span role="img" aria-label="van">
            🚐
          </span>
          Vancation
        </h1>
        <Locate map={map} panTo={panTo} />
        {/* <Search /> */}
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
          onClick={(e) => {
            setPoint({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
              time: new Date(),
              placeId: e.placeId,
            });
            clearFeatures();
          }}
        >
          {/* Child components, e.g. markers, info windows: */}

          {presetData[1]
            ? presetData.map((p, i) => {
                //display preset markers at preset points
                return (
                  <Marker
                    key={p.id}
                    position={{
                      lat: parseFloat(p.lat),
                      lng: parseFloat(p.lng),
                    }}
                    icon={{
                      url: "./van4.svg",
                      scaledSize: new window.google.maps.Size(28, 28),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(12, 12),
                    }}
                    onClick={() => {
                      setDetailDisplay({
                        id: p.id,
                        lat: parseFloat(p.lat),
                        lng: parseFloat(p.lng),
                        index: i,
                        time: p.date,
                        details: p.details,
                      });
                      setSelectedId(p.id);
                      setDisplay(false);
                      setCurrentPanel(0);
                    }}
                  />
                );
              })
            : null}

          {detailDisplay.lat
            ? presetData.map((p, i) => {
                //display popup for preset markers
                return (
                  <InfoWindow
                    key={p.id}
                    className={styles.infoPop}
                    position={detailDisplay}
                    onCloseClick={() => setDetailDisplay({})}
                  >
                    <div>
                      <h2>Vancation Spot!</h2>

                      <button
                        onClick={() => setCurrentPanel(2)}
                        className={styles.detailButton}
                      >
                        Details
                      </button>
                      <button
                        className={styles.detailButton}
                        onClick={() => {
                          if (window.confirm("Delete this Vancation spot?")) {
                            removeMarker(selectedId);
                          } else {
                            console.log("no deletion");
                          }
                        }}
                      >
                        x
                      </button>
                    </div>
                  </InfoWindow>
                );
              })
            : null}

          {point.time ? (
            //NEW marker to show on mouse click
            <Marker
              key={point.time.toISOString()}
              position={{ lat: point.lat, lng: point.lng }}
              icon={{
                url: "./van2.svg",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(12, 12),
              }}
              onClick={() => {
                setDisplay(true);
                setDetailDisplay({});
              }}
            />
          ) : (
            ""
          )}

          {display ? (
            //info popup for NEW marker click
            <InfoWindow
              className={styles.infoPop}
              position={{ lat: view[0].lat, lng: view[0].lng }}
              onCloseClick={() => setDisplay(false)}
            >
              <>
                <div>
                  <h2>New Vancation Spot!</h2>
                  <p>
                    {view[0].time
                      ? String(formatRelative(view[0].time, new Date()))
                      : ""}
                  </p>
                </div>
                <p>click 'get address'➡</p>
              </>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
      {currentPanel === 0 && (
        <section className={styles.panelSection}>
          <Panel
            incComponent={incComponent}
            decComponent={decComponent}
            createAddress={createAddress}
            // updateData={updateData}
            address={address}
            time={point ? point.time : ""}
            lat={point ? point.lat : ""}
            lng={point ? point.lng : ""}
          />
        </section>
      )}
      {currentPanel === 1 && (
        <section className={styles.detailsSection}>
          <Details
            incComponent={incComponent}
            decComponent={decComponent}
            handleFeatures={handleFeatures}
            checkedItems={checkedItems}
            clearFeatures={clearFeatures}
            postNewMarker={postNewMarker}
            address={address}
            lat={point ? point.lat : ""}
            lng={point ? point.lng : ""}
            time={point ? point.time : ""}
            place={point ? point.placeId : ""}
          />
        </section>
      )}
      {currentPanel === 2 && (
        <section className={styles.displaySection}>
          <Display
            incComponent={incComponent}
            decComponent={decComponent}
            handleFeatures={handleFeatures}
            checkedItems={checkedItems}
            clearFeatures={clearFeatures}
            address={address}
            presetData={presetData}
            selectedId={selectedId}
          />
        </section>
      )}
      <div className={styles.credsBox}>
        <div className={styles.creds}>
          Icons from
          <a href="https://www.flaticon.com/" title="xnimrodx">
            xnimrodx and linector
          </a>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default MapContainer;
