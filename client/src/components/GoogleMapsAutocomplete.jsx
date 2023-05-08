import React, { useEffect } from "react";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function GoogleMapsAutocomplete(props) {
  const { setSelected, mapInstance, initUbicacion, isCropperDisplayed } = props;
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutoComplete();
  useEffect(() => {
    if (mapInstance) {
      if (initUbicacion) {
        handleSelect(initUbicacion);
      }
    }
  }, [initUbicacion, mapInstance]);
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    console.log({ address });
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    mapInstance.panTo({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="form-control"
        placeholder="Busca una dirección"
        id="ubicacion"
        autoComplete="off"
      />
      {!isCropperDisplayed && (
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
  );
}

export default GoogleMapsAutocomplete;
