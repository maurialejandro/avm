import React from 'react';
import { GoogleMap, useJsApiLoader , Marker } from "@react-google-maps/api";

const mapContainerStyle = {
    width: '74vh',
    height: '53.1vh',
    borderRadius: '15px',
    border: '1px solid #4F4F4FFF',
}

const center = {
    lat: -33.45694,
    lng: -70.64827,
}

export function Map(props){
    const { coordinates } = props;
    const [ map, setMap ] = React.useState(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY_VAL
    });

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={Object.keys(coordinates).length === 0 ? center : coordinates}
            zoom={14}
        >
            <Marker position={Object.keys(coordinates).length === 0 ? center : coordinates}></Marker>
            <></>
        </GoogleMap>
    ) : <>Cargando Map</>
}