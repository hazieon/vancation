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
  width: "400px", //100vw, 100vh
  height: "400px",
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

function MapContainer() {
  const [map, setMap] = useState(null);
  const [point, setPoint] = useState([]);
  const [view, setView] = useState([]);
  const [display, setDisplay] = useState(false);

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
    return "Error loading map ";
  }

  return isLoaded ? (
    <>
      <h1 className={styles.label}>
        <span role="img" aria-label="van">
          🚐
        </span>
        Vancation
      </h1>

      <GoogleMap
        mapContainerStyle={mapStyles}
        center={mapCentre}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // options={options}
        onClick={(e) => {
          setPoint({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
            placeId: e.placeId,
          });
          console.log(point, "points");
        }}
      >
        {/* Child components, e.g. markers, info windows: */}

        {point.time ? (
          <Marker
            key={point.time.toISOString()}
            position={{ lat: point.lat, lng: point.lng }}
            icon={{
              url: "./van2.svg",
              scaledSize: new window.google.maps.Size(25, 25),
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
          <InfoWindow
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
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
export default MapContainer;

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
