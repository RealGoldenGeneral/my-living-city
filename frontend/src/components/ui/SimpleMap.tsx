

// export default function MapIFrame() {
//   return (
//     // <div>
//     //     <iframe title="Location Picker"
//     //         width="600"
//     //         height="450"
//     //         style={{border: 0}}
//     //         loading="lazy"
//     //         allow= "fullscreen"
//     //         src="https://www.google.com/maps/embed/v1/place?key=API_KEY
//     //             &q=Space+Needle,Seattle+WA">
//     //     </iframe>
//     // </div>
//     // <div className="google-map-code">
//     //     <iframe title="Location Picker"src="https://maps.google.com/maps?q=35.856737, 10.606619&z=15&output=embed" width="100%" height="300px" style={{border:0}}></iframe>
//     // </div>
// )
// }

import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({text}: any) => <div>{text}</div>;
const DEFAULTGEO = {lat:48.4284,lng:-123.3656}

const SimpleMap = (props: any) => {
  // function _onClick(obj: any){
  //   console.log(obj.lat,obj.lng);
  //   markCoords = [obj.lat, obj.lng];}
    const [center, setCenter] = useState({lat: DEFAULTGEO.lat, lng: DEFAULTGEO.lng });
    const [zoom, setZoom] = useState(12);
    var [markCoords, _onClick] = useState({lat: DEFAULTGEO.lat, lng: DEFAULTGEO.lng});
    return (
        <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={center}
          defaultZoom={zoom}
          onClick={(obj:any)=>_onClick(markCoords = {lat:obj.lat, lng:obj.lng})}
        >
        <AnyReactComponent lat={markCoords.lat} lng={markCoords.lng} text="X"/>

        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;

