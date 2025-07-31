// mapboxgl.accessToken = 'INSERT ACCESS TOKEN HERE'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpc29uYW5kcyIsImEiOiJjbWRuOHR3eWYxdWxnMmpxMXd4YnVrNWdiIn0.rOhxxOGM_zRaQLbzV8DXuA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-8, 34], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 2, // starting zoom
    // style: 'mapbox://styles/alisonands/cmdok8fmv01uy01sa2won8909',
    config: {
        basemap: {
            lightPreset: "dawn" // dusk, dawn, night, day
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

            // const marker = new mapboxgl.Marker({
            //     color: "#de59ceff",
            //     draggable: true
            // }).setLngLat([lon, lat]).addTo(map);

            // const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            //     `<b>${data['data'][i][2]}, ${data['data'][i][1]}, ${data['data'][i][0]}</b> <br>
            //     Dates operational: ${data['data'][i][4]}
            //     <hr> 
            //     ${data['data'][i][8]}`
            // );

            // // el.id = 'marker1';

            // // create the marker
            // new mapboxgl.Marker(marker)
            //     .setLngLat([lon, lat])
            //     .setPopup(popup) // sets a popup on this marker
            //     .addTo(map);

            const geojson = {
                type: 'FeatureCollection',
                features: data['data'].map((d, i) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [d[0], d[1]] // [lon, lat]
                    },
                    properties: {
                        title: `${d[2]}, ${d[1]}, ${d[0]}`,
                        datesOperational: d[4],
                        description: d[8],
                    }
                }))
            };

            // Create a circular marker using a div
            const el = document.createElement('div');
            el.style.width = '10px';
            el.style.height = '10px';
            el.style.borderRadius = '50%';
            el.style.backgroundColor = 'rgba(107, 102, 201, 0.6)';
            // el.style.opacity = 0.5
            el.style.border = '1px solid rgba(1, 1, 1, 0.5)';
            // el.style.boxShadow = '0 0 5px #000';
            el.style.cursor = 'pointer';

            // Create the popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<b>${data['data'][i][2]}, ${data['data'][i][1]}, ${data['data'][i][0]}</b> <br>
    Dates operational: ${data['data'][i][4]}
    <hr> 
    ${data['data'][i][8]}`
            );

            // Add the marker with popup
            new mapboxgl.Marker({ element: el, draggable: false })
                .setLngLat([lon, lat])
                .setPopup(popup)
                .addTo(map);



        }
    })
