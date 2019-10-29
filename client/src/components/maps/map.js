import React from "react";
import { GoogleMap, Marker, Data } from "@react-google-maps/api";

const map = props => {
  let markers;

  // the markers array is received from the searchresults which returns all the properties
  // in the location the user searched for. The lat/lng of each property is then taken and
  // markers are created for each property.
  !props.selected
    ? (markers = null)
    : props.markerArray === undefined || props.markerArray.length === 0
    ? (markers = (
        <Marker
          position={{
            lat: props.initialLat,
            lng: props.initialLng
          }}
        />
      ))
    : (markers = props.markerArray.map(key => {
        return (
          <Marker
            key={key._id}
            position={{
              lat: parseFloat(key.lat),
              lng: parseFloat(key.long)
            }}
          />
        );
      }));

  return (
    // the intial lat long is hardcoded into the landing page state for testing purpose
    <div style={{ position: "relative" }}>
      <GoogleMap
        id="circle-example"
        mapContainerStyle={{
          height: "400px",
          width: "100%"
        }}
        zoom={props.zoom}
        center={{
          lat: props.initialLat,
          lng: props.initialLng
        }}
      >
        {markers}

        <Data
          options={{
            controlPosition: window.google
              ? window.google.maps.ControlPosition.TOP_RIGHT
              : undefined,
            controls: ["Point"],
            drawingMode: "Point", //  "LineString" or "Polygon".
            featureFactory: geometry => {
              // logs the lat, long of the point on which the user clicks, this is for future use.
              console.log("geometry: ", geometry);
            },
            // Type:  boolean
            // If true, the marker receives mouse and touch events. Default value is true.
            clickable: true,

            // Type:  string
            // Mouse cursor to show on hover. Only applies to point geometries.
            cursor: "cursor",

            // Type:  boolean
            // If true, the object can be dragged across the map and the underlying feature will have its geometry updated. Default value is false.
            draggable: true,

            // Type:  boolean
            // If true, the object can be edited by dragging control points and the underlying feature will have its geometry updated. Only applies to LineString and Polygon geometries. Default value is false.
            editable: false,

            // Type:  string
            // The fill color. All CSS3 colors are supported except for extended named colors. Only applies to polygon geometries.
            fillColor: "#FF0055",

            // Type:  number
            // The fill opacity between 0.0 and 1.0. Only applies to polygon geometries.
            fillOpacity: 1,

            // Type:  string|Icon|Symbol
            // Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url. Only applies to point geometries.
            icon: "icon",

            // Type:  MarkerShape
            // Defines the image map used for hit detection. Only applies to point geometries.
            // shape: 'shape',

            // Type:  string
            // The stroke color. All CSS3 colors are supported except for extended named colors. Only applies to line and polygon geometries.
            strokeColor: "#00FF55",

            // Type:  number
            // The stroke opacity between 0.0 and 1.0. Only applies to line and polygon geometries.
            strokeOpacity: 1,

            // Type:  number
            // The stroke width in pixels. Only applies to line and polygon geometries.
            strokeWeight: 2,

            // Type:  string
            // Rollover text. Only applies to point geometries.
            title: "Title",

            // Type:  boolean
            // Whether the feature is visible. Defaults to true.
            visible: true,

            // Type:  number
            // All features are displayed on the map in order of their zIndex, with higher values displaying in front of features with lower values. Markers are always displayed in front of line-strings and polygons.
            zIndex: 2
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default map;
