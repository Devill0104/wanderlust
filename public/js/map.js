mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.goemetry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
    });
    console.log(listing.goemetry.coordinates);

    const marker = new mapboxgl.Marker()
                .setLngLat(listing.goemetry.coordinates)
                .setPopup(new mapboxgl.Popup( {offset: 25})
                .setHTML(`<h4>${listing.location}</h4><p>Exact location</h4>`))
                .addTo(map);
