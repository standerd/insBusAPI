import React, { Component } from "react";
import { GoogleMap, StandaloneSearchBox } from "@react-google-maps/api";

// google maps standalone searchbox, sets the city selected by the user state in the landing page component
// autocompletes and gives suggestions for cities based on user initial input. The selected city returns
// lat and lng values that is used to calculate distance on the server and return results within a 30km radius.

class SearchBox extends Component {
  render() {
    return (
      <GoogleMap
        id="circle-example"
        mapContainerStyle={{
          height: "32px",
          width: "100%"
        }}
      >
        <StandaloneSearchBox
          onLoad={ref => (this.searchBox = ref)}
          onPlacesChanged={() => {
            let searchResults = this.searchBox.getPlaces();
            let latLong = searchResults[0].geometry.location;
            let stringName = latLong
              .toString()
              .replace("(", "")
              .replace(")", "")
              .split(",");
            let city = searchResults[0].address_components[0].long_name;
            this.props.handleChange([city, stringName]);
          }}
        >
          <input
            type="text"
            placeholder="Please Enter Destination"
            style={{
              border: `1px solid transparent`,
              width: `100%`,
              height: "32px",
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "relative",
              marginTop: 0,
              marginBottom: 0,
              padding: 0
            }}
          />
        </StandaloneSearchBox>
      </GoogleMap>
    );
  }
}

export default SearchBox;
