
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../map/Marker';

const DEFAULTGEO = {lat:48.4284,lng:-123.3656}

const SimpleMap = (props: any) => {
    var [center, setCenter]: any = useState(DEFAULTGEO);
    const [zoom, setZoom] = useState(12);
    var [markCoords, _onClick] = useState({lat: null, lng: null});
    return (
        <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          center={center}
          defaultZoom={zoom}
          onClick={(obj:any)=>{
            _onClick(markCoords = {lat:obj.lat, lng:obj.lng});
            setCenter(center = {lat:obj.lat, lng:obj.lng});
          }}>
        <Marker lat={markCoords.lat} lng={markCoords.lng} icon="home"/>
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;

