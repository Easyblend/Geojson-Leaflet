import { FeatureCollection } from 'geojson';
import { GeoJSON } from "react-leaflet";

export default function GeoData({ dataProp }: { dataProp: FeatureCollection | null }) {


    return (
        <div> {dataProp && ( // Render the GeoJSON layer only when data is available
            <>
                <GeoJSON

                    data={dataProp} // Use the fetched GeoJSON data
                    onEachFeature={(feature, layer) => { layer.bindTooltip(`Area  : ${feature.properties?.population || ""} ${feature?.properties?.city || ""} ${feature?.properties?.postal_sector || ""}` || "No info to be displayed") }}
                />


            </>
        )}</div>
    )
}
