// src/VehicleTracking.js
import React, { useState, useEffect } from 'react';
import GoogelMap from './GoogelMap'
function VehicleTracking() {

    const [vehiclePosition, setVehiclePosition] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        // Simulate vehicle movement
        const interval = setInterval(() => {
            // Update vehicle position (random values for demonstration)
            const newLat = Math.random() * 180 - 90;
            const newLng = Math.random() * 360 - 180;
            setVehiclePosition({ lat: newLat, lng: newLng });
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mt-4">
            <h1>Vehicle Tracking Demo</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            {/* Vehicle information */}
                            <h3>Vehicle Information</h3>
                            <ul>
                                <li>Vehicle ID: ABC123</li>
                                <li>Driver: John Doe</li>
                                <li>Status: Moving</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            {/* Map to display vehicle position
                            <h3>Vehicle Position</h3>
                            <h5>Latitude: {vehiclePosition.lat.toFixed(6)}</h5>
                            <h5>Longitude: {vehiclePosition.lng.toFixed(6)}</h5> */}
                            {/* Add a real map component or placeholder here */}
                            <GoogelMap/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VehicleTracking;