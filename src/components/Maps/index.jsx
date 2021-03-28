import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import axios from "axios";

const mapStyles = {
  width: "100%",
  height: "100%",
};

class Mapz extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      locations: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.openchargemap.io/v3/poi/?output=json&countrycode=DE&maxresults=10&compact=true&verbose=false&latitude=52.520008&longitude=13.404954&distance=10&distanceunit=KM&key=14c14de6-4c0a-4d11-9498-93259fca2dd9`
      )
      .then((res) => {
        const locations = res.data;
        this.setState({ locations: locations, loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <p>Be Hold, fetching data may take some time :)</p>
        ) : (
          <Map
            google={this.props.google}
            zoom={13}
            style={mapStyles}
            initialCenter={{
              lat: 52.5188455657791,
              lng: 13.4039381981476,
            }}
          >
            {this.state.locations.map((location, index) => (
              <Marker
                animation={this.props.google.maps.Animation.DROP}
                key={index}
                position={{
                  lat: location.AddressInfo.Latitude,
                  lng: location.AddressInfo.Longitude,
                }}
                // onClick={alert(location.AddressInfo.Title)}
              />
            ))}
          </Map>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD6T8zNeCCXnR0NhbSplOFvaHG6Jfa6X70",
})(Mapz);
