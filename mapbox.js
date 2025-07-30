// mapboxgl.accessToken = 'INSERT ACCESS TOKEN HERE'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpc29uYW5kcyIsImEiOiJjbWRuOHR3eWYxdWxnMmpxMXd4YnVrNWdiIn0.rOhxxOGM_zRaQLbzV8DXuA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-8, 34], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 2, // starting zoom
    style: 'mapbox://styles/alisonands/cmdok8fmv01uy01sa2won8909',
    config: {
        basemap: {
            lightPreset: "night" // dusk, dawn, night, day
        }
    }
});

fetch('/country_data.json')
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data['data'].length; i++) {
            coords = data['data'][i][3];

            const [latStr, lonStr] = coords.split(";").map(s => s.trim());

            const lat = parseFloat(latStr);
            const lon = parseFloat(lonStr);

            // const el = document.createElement('div');
            // el.className = 'marker';
            // new mapboxgl.Marker(el).setLngLat([lon, lat]).addTo(map);

            const marker = new mapboxgl.Marker({
                color: "#de59ceff",
                draggable: true
            }).setLngLat([lon, lat]).addTo(map);

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<b>${data['data'][i][2]}, ${data['data'][i][1]}, ${data['data'][i][0]}</b> <br>
                Dates operational: ${data['data'][i][4]}
                <hr> 
                ${data['data'][i][8]}`
            );

            // create the marker
            new mapboxgl.Marker(marker)
                .setLngLat([lon, lat])
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);

        }
    })
