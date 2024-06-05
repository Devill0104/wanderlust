mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.goemetry.coordinates,//[77.2088,28.6139],  // starting position [lng, lat]
    zoom: 9 // starting zoom
    });

    const marker = new mapboxgl.Marker()
                .setLngLat(listing.goemetry.coordinates)
                .setPopup(new mapboxgl.Popup( {offset: 25})
                .setHTML(`<h4>${listing.location}</h4><p>Exact location</h4>`))
                .addTo(map);
