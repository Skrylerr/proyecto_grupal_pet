import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript
} from "@react-google-maps/api";

import React, { useMemo, useState } from "react";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";
// import usePlacesAutoComplete, {
//   getGeocode,
//   getLatLng
// } from "use-places-autocomplete";

// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxPopover
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

function PetMap(props) {
  const { setSelectedMarker, setMapInstance } = props;
  const center = useMemo(() => ({ lat: -12.06743, lng: -77.041307 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"]
  });
  const [selected, setSelected] = useState({});
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="places-container">
        <GoogleMapsAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container col rounded-4"
        onLoad={(mapIns) => setMapInstance(mapIns)}
        // onClick={() => setSelectedMarker(false)}
      >
        {selected && <Marker position={selected} />}
        {/* {markers.map((marker, key) => (
    <Marker
      key={key}
      title={marker.name}
      onClick={() => {
        setSelectedMarker(marker);
      }}
      position={{
        lat: marker.coordinates.lat,
        lng: marker.coordinates.lng
      }}
      animation={window.google.maps.Animation.DROP}
    />
  ))} */}
        {/* {selectedMarker && (
    <InfoWindow
      onCloseClick={() => setSelectedMarker(false)}
      position={{
        lat: selectedMarker.coordinates.lat,
        lng: selectedMarker.coordinates.lng
      }}
    >
      <div>
        <h6>{selectedMarker.name}</h6>
        <p>Sport: {selectedMarker.sport}</p>
        <p>Competitiveness: {selectedMarker.category}</p>
        {selectedMarker.open_field ? (
          <p>Outdoors field</p>
        ) : (
          <p>Indoors field</p>
        )}
        {selectedMarker.open_entrance ? (
          <p className="m-0 p-0">Anyone can enter</p>
        ) : (
          <p>Not anyone can enter (Paid entrance, members only, etc)</p>
        )}
      </div>
    </InfoWindow>
  )} */}
      </GoogleMap>
    </>
  );
}

export default PetMap;
