import renderMap from './map.stache';
import route from 'can-route';

// leaflet mapping library
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
let map;
export default {
    render: renderMap,
    createMap (element) {
        if (map) {
            return;
        }
        map = L.map(element).setView([
            route.data.x || 51.505, 
            route.data.y || -0.09
        ], 
        route.data.zoom || 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('moveend', (event) => {
            const center = event.target.getCenter();
            route.data.set({
                view: center.lng,
                section: center.lat,
                objectId: event.target.getZoom()
            });
        });
    }
};