mapboxgl.accessToken = "pk.eyJ1IjoiYWRpdHlhMTktMjEiLCJhIjoiY2x3ejVsdnByMDNuODJzc2ZvaHFhangydyJ9._dD8AcvKmw6Ykwyi7W4E_w";
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
const marker = new mapboxgl.Marker().setLngLat(listing.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.title}</h4>
                            <p>exact locatin</p>`)).addTo(map);
console.log(listing);
