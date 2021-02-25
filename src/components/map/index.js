import React, { useState, useCallback, useRef, useEffect } from "react";
// import { Map, GoogleApiWrapper } from "google-maps-react";
import customMapStyle from "../../mapstyles";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from "./index.module.css";
import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Search from "../search/index";
import Locate from "../locate";
import Panel from "../panel";
import Details from "../details";

//<div>
//Icons from
//<a href="https://www.flaticon.com/" title="xnimrodx">
//  xnimrodx and linector
//</a>
//</div>

//libraries prop kept separate, move to .env later
const libraries = ["places"];
const MAPKEY = process.env.REACT_APP_MAPKEY;

//set the map window size
const mapStyles = {
  width: "400px ", //100vw, 100vh
  height: "400px",
  borderRadius: "10px",
};

//set the map initial location
const mapCentre = {
  lat: -1.2884,
  lng: 36.8233,
  //   lat: -3.745,
  //   lng: -38.523,
};

//custom map styles from JSON
const options = {
  styles: customMapStyle,
  //remove UI controls:
  disableDefaultUI: true,
  //enable specific UI tools:
  zoomControl: true,
};

const presets = [
  { lat: -1.2884, lng: 36.8233 },
  { lat: -3.745, lng: -38.523 },
  { lat: 52.52011994421292, lng: -1.4640778962357217 },
  { lat: 52.0507548306133, lng: -1.7856869475872172 },
];

function MapContainer() {
  const [map, setMap] = useState(null);
  const [point, setPoint] = useState([]);
  const [view, setView] = useState([]);
  const [display, setDisplay] = useState(false);
  const [detailDisplay, setDetailDisplay] = useState(false);
  const [currentPanel, setCurrentPanel] = useState("panel");
  const [checkedItems, setCheckedItems] = useState({});
  const [address, setAddress] = useState("");

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
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    console.log("panto function map ");
  }, []);

  //useEffect to set the view state asynchronously (as it was one step behind)
  useEffect(() => {
    if (point.lat) {
      let viewArr = [];
      viewArr.push(point);
      setView(viewArr);
      setDisplay(false);
      console.log(viewArr, "viewArray");
      console.log(view, "view state");
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
    console.log(checkedItems);
    //set to false if checked again
  }

  function createAddress(string) {
    setAddress(string);
    console.log(address);
  }

  function changeComponent() {
    //array with order of pages, move to NEXT index on button click
    if (currentPanel === "panel") {
      setCurrentPanel("details");
    } else if (currentPanel === "details") {
      setCurrentPanel("panel");
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
        <Search />
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={mapCentre}
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
            console.log(point, "points ");
          }}
        >
          {/* Child components, e.g. markers, info windows: */}

          {presets.map((p, i) => {
            //saved marker points
            return (
              <Marker
                key={p.lat}
                position={p}
                icon={{
                  url: "./van4.svg",
                  scaledSize: new window.google.maps.Size(28, 28),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(12, 12),
                }}
                onClick={() => {
                  setDetailDisplay({ lat: p.lat, lng: p.lng, index: i });
                  console.log(p);
                }}
              />
            );
          })}

          {point.time ? (
            //marker to show on mouse click
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
                console.log("marker click ");
              }}
            />
          ) : (
            ""
          )}

          {display ? (
            //info popup on NEW marker click
            <InfoWindow
              className={styles.infoPop}
              position={{ lat: view[0].lat, lng: view[0].lng }}
              onCloseClick={() => setDisplay(false)}
            >
              <div>
                <h2>Vancation Spot!</h2>
                <p>
                  {view[0].time
                    ? String(formatRelative(view[0].time, new Date()))
                    : ""}
                </p>
                <button className={styles.detailButton}>Details</button>
              </div>
            </InfoWindow>
          ) : null}

          {detailDisplay.lat
            ? presets.map((p, i) => {
                return (
                  <InfoWindow
                    className={styles.infoPop}
                    position={detailDisplay}
                    onCloseClick={() => setDetailDisplay({})}
                  >
                    <div>
                      <h2>Vancation Spot!</h2>
                      <p>time</p>
                      <button className={styles.detailButton}>Details</button>
                    </div>
                  </InfoWindow>
                );
              })
            : null}

          {/* {presets ? (
            //info popup on PRESET marker click
            <InfoWindow
              className={styles.infoPop}
              position={{ lat: presets[0].lat, lng: presets[0].lng }}
              onCloseClick={() => setDisplay(false)}
            >
              <div>
                <h2>Vancation Spot!</h2>
                <p>time</p>
                <button className={styles.detailButton}>Details</button>
              </div>
            </InfoWindow>
          ) : null} */}
        </GoogleMap>
      </div>

      {currentPanel === "panel" && (
        <section className={styles.panelSection}>
          <Panel
            changePage={changeComponent}
            createAddress={createAddress}
            address={address}
            lat={point ? point.lat : ""}
            lng={point ? point.lng : ""}
            time={point ? point.time : ""}
            place={point ? point.placeId : ""}
          />
        </section>
      )}
      {currentPanel === "details" && (
        <section className={styles.detailsSection}>
          <Details
            changePage={changeComponent}
            handleFeatures={handleFeatures}
            checkedItems={checkedItems}
          />
        </section>
      )}
    </div>
  ) : (
    <></>
  );
}
export default MapContainer;

// if (current panel state === a){render panel} else render details

//optional other code: save clicked points into array
//create multiple click markers by mapping this array

// setPoint((array) => [
//   ...array,
//   {
//     lat: e.latLng.lat(),
//     lng: e.latLng.lng(),
//     time: new Date(),
//     placeId: e.placeId,
//   },
// ]);

// {point
//     ? point.map((p) => {
//         return (
//           <Marker
//             key={p.time.toISOString()}
//             position={{ lat: p.lat, lng: p.lng }}
//           />
//         );
//       })
//     : ""}

//on click functionality moved outside (didn't work):
//   const onMapClick = useCallback((e) => {
//     //   console.log(e);
//     setPoint([
//       {
//         lat: e.latLng.lat(),
//         lng: e.latLng.lng(),
//         time: new Date(),
//         placeId: e.placeId,
//       },
//     ]);
//     console.log(point, "points");
//   }, []);
