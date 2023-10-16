import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = () => {
    const center = {
        lat: 7.2905715,
        lng: 80.6337262
    };

    const marker = {
        lat: 7.2905715, // Use the same coordinates as the center for demonstration purposes
        lng: 80.6337262
    };

    return (
        <div >
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerStyle={{
                    minHeight:"25rem",
                    minWidth:"23rem",
                    maxWidth:"39rem"
                }}
            >
                <Marker position={marker}
                />

            </GoogleMap>
        </div>
    );
}

export default Map;
