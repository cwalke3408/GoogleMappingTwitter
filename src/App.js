import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import logo from './logo.svg';
import './App.css';

{/* <InfoWindow /> gives the ability to pop up "more info" on the Map */}

class App extends Component {
  constructor(props){
    super(props);

    console.log(props.myMapArr);
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    };
  }


  onMouseoverMarker(props, marker, e){
    console.log("Mousing OVer");
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMarkerClick(props, marker1, e){
    console.log("showInfo: " + this.state.showingInfoWindow);
    console.log( props);
    console.log("marker: " + marker1);
    
    
    this.setState({
      selectedPlace: props,
      activeMarker: marker1,
      showingInfoWindow: true
    });
  }


  render() {
    let markerList = [];
    let infoList = [];
    
    const style={
      Marker:{
        height:'10px', 
        width:'10px'
      }
    }

    this.props.myMapArr.forEach(element => {
      markerList.push(
          <Marker
            onClick={(e)=>{this.onMarkerClick(e)}}
            title={'The marker`s title will appear as a tooltip.'}
            name={"TwitterHandle "}
            position={{lat: element.lat, lng: element.lng}} 
            style={style.Marker}
          />)
    

      infoList.push(

           <InfoWindow 
            position={{lat: element.lat, lng: element.lng}}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow} 
          >
            <div>
              <h1>{this.state.selectedPlace.name} </h1>
            </div>
          </InfoWindow> 
        );
    });

  return (
      <div className="App">
        <Map className="map"
          style={{
            height: "400px",  
            width: "100%"
            }}
            google={this.props.google}
            initialCenter={{
              lat: 40.854885,
              lng: -88.081807 
            }}
            zoom={4}
        >  

        {markerList}
        {infoList}

        {/* <Marker
          onClick={(e)=>{this.onMarkerClick(e)}}
          onMouseover = {(e)=>{this.onMouseoverMarker(e)}}
          name={
            <div>
              <h1>Dolores park</h1>
              <h2> Park</h2>
            </div>}
          position={{lat: 37.759703, lng: -122.428093}} />
        <Marker /> */}

        {/* // <Marker
        //   onClick={(e)=>{this.onMarkerClick(e)}}
        //   onMouseover = {(e)=>{this.onMouseoverMarker(e)}}        
        //   title={"This Marker"}
        //   position={{lat: 37.762391, lng: -122.439192}}
        //   icon={{
        //     url: "/img/icon.svg",
        //     anchor: this.props.google.maps.Point(32, 32),
        //     scaledSize: this.props.google.maps.Size(64, 64)
        //   }}
        // /> */}




        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: '',
})(App);

