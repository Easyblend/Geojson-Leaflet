
// Import necessary dependencies
import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { datas } from './data/geoData';

// Define map style and Mapbox access token
const mapStyle = 'mapbox://styles/ekumah/clt02krq400fv01pi4iv9elan';
const mapboxToken = 'pk.eyJ1IjoiZWt1bWFoIiwiYSI6ImNsc3gxczhnbjJtZmgya25zeHNhcXo1bzcifQ.B3ISBLaHVL1WSt8w5MXPvw';

// Define interface for a feature on the map
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

// Maps component
function Maps(): JSX.Element {
    // Reference to the map container element
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set Mapbox access token
        mapboxgl.accessToken = mapboxToken;

        // Create a new Mapbox map instance
        const map = new mapboxgl.Map({
            container: mapContainer.current!,
            style: mapStyle,
            center: [-77.04, 38.907],
            zoom: 11
        });

        // Initialize map when it's loaded
        map.on('load', () => {
            // Add GeoJSON source to the map
            map.addSource('places', {
                type: 'geojson',
                data: datas
            });

            // Add a layer to display features from the GeoJSON source
            map.addLayer({
                id: 'places',
                type: 'circle',
                source: 'places',
                paint: {
                    'circle-color': '#4264fb',
                    'circle-opacity': 0.9,
                    'circle-radius': 8
                }
            });

            // Create a popup for displaying feature information
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            // Event listener for mouseenter event on map features
            map.on('mouseenter', 'places', (e) => {
                map.getCanvas().style.cursor = 'pointer';
                const feature = e.features?.[0] as PlaceFeature | undefined;
                if (feature && feature.geometry && feature.properties) {
                    const coordinates = feature.geometry.coordinates;
                    const description = feature.properties.description;
                    const image = feature.properties.image;

                    // Set popup content and display it on the map
                    popup.setLngLat(coordinates).setHTML(
                        `<div>
                            <p>${description}</p>
                            <div height="100px" width="100px">${image}</div>
                        </div>`
                    ).addTo(map);
                }
            });

            // Event listener for mouseleave event on map features
            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        });

        // Cleanup function to remove the map instance when component unmounts
        return () => map.remove();
    }, []);

    // Render the map container element
    return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
}

// Function to convert FeatureCollection to GeoJSON format
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

// Export the Maps component as default
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