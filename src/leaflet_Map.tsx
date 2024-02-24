import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FeatureCollection } from "geojson"; // Import FeatureCollection type
import { zipCodes } from "./data/datag";
import GeoData from "./GeoData";


const Map: React.FC = () => {
    const [geoJson, setGeoJson] = useState<FeatureCollection | null>(null); // Use the FeatureCollection type instead of any  

    // Use the FeatureCollection type instead of any    
    useEffect(() => {
        // Fetch geojson data from the URL
        const fetchGeoJson = async () => {
            try {
                const response = await fetch("https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/oregon.geojson");
                const data = await response.json();
                setGeoJson(data);
            } catch (error) {
                console.error("Error fetching GeoJSON data:", error);
            }
        };


        fetchGeoJson();
    }, []); // Run once on component mount


    return (

        <MapContainer center={{ lat: 51.4884581671783, lng: 0.242357696083641 }} zoom={13} style={{ height: "94vh" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render the GeoJSON layer only when data is available */}
            <GeoData dataProp={geoJson} />

            {/* Reander Geojson Data on the Map with Multiple Feature */}
            {zipCodes.features.map((feature, index) => {
                return (
                    <GeoData key={index} dataProp={feature as any} />
                );
            })}

        </MapContainer>

    );
};

export default Map;