import { useState } from 'react'
import LeafletMap from './leaflet_Map'
import Header from './Header'
import MapBoxMap from './Map'


export default function App() {

  const [MapBox, setMapBox] = useState<boolean>(false)

  return (
    <div className=' h-screen overflow-y-hidden'>
      <Header setMapBox={setMapBox} mapBox={MapBox} />
      {MapBox ? <LeafletMap /> : <MapBoxMap />}

    </div>
  )
}
