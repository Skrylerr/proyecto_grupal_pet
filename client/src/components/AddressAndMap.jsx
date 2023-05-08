import React, { useState } from "react";
import PetMap from "./PetMap";

function AddressAndMap({ isCropperDisplayed }) {
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(false);
  return (
    <div>
      <PetMap
        isCropperDisplayed={isCropperDisplayed}
        setSelectedMarker={setSelectedMarker}
        setMapInstance={setMapInstance}
        selectedMarker={selectedMarker}
        zoom={14}
        mapContainerSize={"map-container-tiny col rounded-4"}
        showAddress={true}
        initialCenter={{ lat: -12.06743, lng: -77.041307 }}
        mapInstance={mapInstance}
        markers={false}
      />
    </div>
  );
}

export default AddressAndMap;
