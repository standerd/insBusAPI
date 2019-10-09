import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker
} from "react-google-maps";
import KEY from "../../config/keys";

const map = props => {
  function Map() {
    console.log("From Maps" + props.lat);
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: -29.27076, lng: 25.112268 }}
      >
        <Marker
          position={{
            lat: props.lat,
            lng: props.lng
          }}
        />
      </GoogleMap>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={KEY.googleMaps}
        loadingElement={<div style={{ height: `30vh` }} />}
        containerElement={<div style={{ height: `35vh`, width: `50vw` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default map;
