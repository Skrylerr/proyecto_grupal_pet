import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript
} from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import GoogleMapsAutocomplete from "./GoogleMapsAutocomplete";

const libraries = ["places"];

function PetMap(props) {
  const {
    isCropperDisplayed,
    setSelectedMarker,
    selectedMarker,
    mapInstance,
    setMapInstance,
    zoom,
    showAddress,
    mapContainerSize,
    markers,
    initialCenter,
    initUbicacion
  } = props;
  const center = useMemo(() => initialCenter, [initialCenter]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries
  });

  function createKey(location) {
    return location.lat + location.lng;
  }

  const [selected, setSelected] = useState(false);
  if (!isLoaded) {
  } else {
    return (
      <>
        {showAddress && (
          <Form.Group className="mb-3">
            <Form.Label>Dirección:</Form.Label>
            <GoogleMapsAutocomplete
              initUbicacion={initUbicacion}
              setSelected={setSelected}
              mapInstance={mapInstance}
              isCropperDisplayed={isCropperDisplayed}
            />
          </Form.Group>
        )}

        <GoogleMap
          zoom={zoom}
          center={center}
          mapContainerClassName={!isCropperDisplayed ? mapContainerSize : ""}
          onLoad={(mapIns) => setMapInstance(mapIns)}
          onClick={() => setSelectedMarker(false)}
        >
          {selected && <Marker position={selected} />}
          {markers &&
            markers.map((marker) => {
              if (marker.coordenadas) {
                return (
                  <Marker
                    key={createKey(marker.coordenadas)}
                    title={marker.petName}
                    onClick={() => {
                      setSelectedMarker(marker);
                    }}
                    position={{
                      lat: marker.coordenadas.lat,
                      lng: marker.coordenadas.lng
                    }}
                    animation={window.google.maps.Animation.DROP}
                  />
                );
              }
              return null;
            })}

          {selectedMarker && (
            <InfoWindow
              onCloseClick={() => setSelectedMarker(false)}
              position={{
                lat: selectedMarker.coordenadas.lat,
                lng: selectedMarker.coordenadas.lng
              }}
            >
              <div>
                <h6>{selectedMarker.petName}</h6>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </>
    );
  }
}

export default PetMap;
