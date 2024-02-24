import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { datas } from './data/geoData';
import { zipCodes } from './data/datag';
const mapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = 'pk.eyJ1IjoiZWt1bWFoIiwiYSI6ImNsc3gxczhnbjJtZmgya25zeHNhcXo1bzcifQ.B3ISBLaHVL1WSt8w5MXPvw';

interface PlaceFeature {
    type: 'Feature';
    properties: {
        description: string;
        icon: string;
        image: string;
    };
    geometry: {
        type: 'Polygon' | 'Point' | 'LineString' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection';
        coordinates: LngLatLike;
    };
}

function Maps(): JSX.Element {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mapboxgl.accessToken = mapboxToken;

        const map = new mapboxgl.Map({
            container: mapContainer.current!,
            style: mapStyle,
            center: [-77.04, 38.907],
            zoom: 11
        });

        map.on('load', () => {
            // Convert zipCodes to GeoJSON

            map.addSource('places', {
                type: 'geojson',
                data: datas
            });

            map.addLayer({
                id: 'places',
                type: 'circle', // Change the layer type to 'circle'
                source: 'places',
                paint: {
                    'circle-color': '#4264fb', // Fix: Change 'Point-color' to 'circle-color'
                    'circle-opacity': 0.9,
                    'circle-radius': 8
                    // Optional: Add other properties as needed
                }
            });

            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('mouseenter', 'places', (e) => {
                map.getCanvas().style.cursor = 'pointer';
                const feature = e.features?.[0] as PlaceFeature | undefined;
                if (feature && feature.geometry && feature.properties) {
                    const coordinates = feature.geometry.coordinates;
                    const description = feature.properties.description;
                    const image = feature.properties.image;
                    console.log(feature.properties.image);

                    popup.setLngLat(coordinates).setHTML(
                        `<div>
                <p>${description}</p>
                <div height="100px" width="100px" >${image}</div>
            </div>`
                    ).addTo(map);
                }
            });


            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        });

        return () => map.remove();
    }, []);

    return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
}

function convertToGeoJSON(featureCollection: FeatureCollection<Geometry, GeoJsonProperties>) {
    const geoJsonData: FeatureCollection = {
        type: 'FeatureCollection',
        features: featureCollection.features.map(feature => ({
            type: 'Feature',
            properties: feature.properties,
            geometry: feature.geometry
        }))
    };
    return geoJsonData;
}

export default Maps;


// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';


// function MapBoxMap() {

//     const Map = ReactMapboxGl({
//         accessToken:
//             'pk.eyJ1IjoiZWt1bWFoIiwiYSI6ImNsc3gxczhnbjJtZmgya25zeHNhcXo1bzcifQ.B3ISBLaHVL1WSt8w5MXPvw'
//     });

//     return (
//         <Map
//             zoom={[3]}
//             style="mapbox://styles/ekumah/clt02krq400fv01pi4iv9elan"
//             containerStyle={{
//                 height: '100vh',
//                 width: '100vw'
//             }}
//         >
//             <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
//                 <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
//             </Layer>
//         </Map>
//     )
// }

// export default MapBoxMap;