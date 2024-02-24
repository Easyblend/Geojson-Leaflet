## Mapping GeoJson Data On Maps
![alt text](/images/image.png)
![alt text](/images/image-7.png)
![alt text](/images/image-1.png)
![alt text](/images/image-2.png)


# How to Run it OPTION 1
To run the Project you first need to install the node modules by running 
##### npm install 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


# OPTION 2 With DOCKER

First navigate into the project directory and run
#### docker build -t kano_map .
this will create a docker container from the docker image we have

Next Run
##### docker run -it -p 3000:3000 kano_map
this will start our React Application from the Docker container we just created on the port 3000


# Understanding the Programming Structure

In the SRC folder, these are the main files we need to understand 

##### App.tsx
![alt text](/images/image-3.png)
This React Functional component renders a Header component, either a LeafletMap or MapBoxMap component based on the value of the MapBox state which is controlled by the button located in the Header Component.
The Header component receives two props: setMapBox and mapBox, which are used for toggling between the map types.
The setMapBox function is used to update the MapBox state when the user interacts with the Header component.

##### Map.tsx
![alt text](/images/image.png)
The useRef hook is used to create a reference to the map container "div" element.
The useEffect hook is used to initialize the map when the component mounts.
Mapbox GL JS is initialized with an access token and configured with default options such as center coordinates and zoom level.
The map is created and added to the map container element.
The map.on('load') event listener is used to add sources and layers to the map once it has finished loading.
The map.on('mouseenter') event listener is used to display a popup when hovering over a marker on the map. The popup contains information about the location, such as description and image.
The map.on('mouseleave') event listener is used to remove the popup when the mouse leaves the marker.

##### GeoData.tsx
![alt text](/images/image-5.png)
Renders a GeoJSON layer on the map with tooltips displaying information about each feature.
Tooltip content is dynamically generated based on the properties of each GeoJSON feature.


##### Leaflet_Map.tsx
![alt text](/images/image-6.png)

renders a map using the react-leaflet library

I Initialize state using the useState hook to store the GeoJSON data (geoJson).
Data Fetching:

Use the useEffect hook to fetch GeoJSON data from a URL when the component mounts. The fetched data is then stored in the state variable geoJson.
Map Rendering:

Render a MapContainer component from react-leaflet with a specified center and zoom level.
Render a TileLayer component to display the basemap using OpenStreetMap tiles.
Rendering GeoJSON Data:

Renders the GeoJSON data stored in the state variable geoJson using the GeoData component.
Maps over the DataInfo.features and zipCodes.features arrays to render multiple GeoJSON layers on the map.
Debugging:

Logs each feature to the console for debugging purposes.
Overall, this component fetches GeoJSON data, renders it on the map using GeoData components, and logs information about each feature for debugging purposes.